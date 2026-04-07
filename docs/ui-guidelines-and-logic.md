# UI Guidelines & Application Logic

Dokumen ini berisi panduan desain antarmuka (UI) dan alur logika aplikasi untuk **Recipe Explorer App** sesuai dengan PRD.

---

## 1. UI Guidelines (Panduan Desain)

Agar aplikasi terlihat modern, premium, dan konsisten, berikut adalah panduan elemen-elemen desain yang akan digunakan:

### A. Color Palette (Palet Warna)
- **Primary Color:** `#FF6B6B` (Coral Red) - Digunakan untuk tombol utama, aksen, dan interaksi yang menonjol. Sangat cocok dengan tema makanan yang menggugah selera.
- **Secondary / Accent:** `#FF9E7D` (Soft Coral) - Untuk *hover state* atau elemen sekunder.
- **Background (Light Mode):** `#F9FAFB` (Gray-50) - Memberikan kesan bersih, lebih baik dari sekadar putih murni.
- **Card / Surface Background:** `#FFFFFF` (White) - Latar belakang komponen kartu untuk memberikan kontras terhadap *background* abu-abu.
- **Text Primary:** `#1F2937` (Gray-800) - Digunakan untuk judul utama dan teks penting (mudah dibaca).
- **Text Secondary:** `#6B7280` (Gray-500) - Untuk deskripsi, metadata, dan teks tidak terlalu penting.
- **Error/Feedback:** `#EF4444` (Red-500) - Warna teks atau kotak pesan peringatan/error.

### B. Typography (Tipografi)
Menggunakan **Google Fonts**. Disarankan menggunakan kombinasi:
- **Headings (H1, H2, H3):** `Poppins` atau `Outfit` (Modern, bulat, dan ramah).
  - H1: 32px (Desktop), 24px (Mobile) - Bold
  - H2: 24px (Desktop), 20px (Mobile) - Semi-Bold
- **Body / Paragraph:** `Inter` (Sangat baik untuk keterbacaan).
  - Body: 16px - Regular
  - Small Text: 14px - Regular

### C. Bentuk & Bayangan (Shapes & Shadows)
- **Border Radius:**
  - Card & Image: `16px` (`rounded-2xl` di Tailwind)
  - Button & Input: `8px` - `12px` (`rounded-lg` atau `rounded-xl`)
- **Shadows:**
  - Kartu: *Soft shadow* (contoh di Tailwind: `shadow-sm` secara default, `shadow-md` saat di-hover).
  - Elevasi Modal/Overlay: `shadow-xl`.

### D. Animasi & Interaksi
- **Hover Transitions:** Durasi `200ms` atau `300ms` (`transition-all duration-300 ease-in-out`).
- **Cards Hover:** Naik/bergeser ke atas sekitar 4px (`hover:-translate-y-1`) disertai dengan penambahan shadow.
- **Image Reveal:** Menampilkan gambar ketika sedang loading bisa dengan efek *fade-in*.

---

## 2. Application Logic (Logika Aplikasi)

Bagian ini menjelaskan bagaimana komponen saling berkomunikasi dan bagaimana data diproses di belakang layar.

### A. State Management
Kita dapat menggunakan gabungan **Local State (`useState`)** dan **Custom Hooks** (atau Redux/Zustand jika dibutuhkan aplikasi akan berkembang lebih jauh).
- **Global State / Context:** Bisa digunakan untuk menyimpan data bahan (ingredients) jika tidak ingin di-fetch berulang kali saat berpindah halaman.
- **Local State:** Digunakan untuk nilai Input Pencarian (*Search Value*), Status Loading individual, dan Tampilan Menu *Mobile*.

### B. Alur Fetching Data (Data Flow)

#### 1. Halaman Ingredients (`/`)
- **Data Initialization:** 
  Pada saat komponen *mount*, panggil API `list.php?i=list`.
- **Search Logic (Client-Side Filtering):**
  - Simpan seluruh ingredients ke `const [allIngredients, setAllIngredients] = useState([])`.
  - Simpan bahan yang dirender ke `const [displayedIngredients, setDisplayedIngredients] = useState([])`.
  - Saat input *search* berubah:
    `displayedIngredients = allIngredients.filter(item => item.strIngredient.toLowerCase().includes(searchQuery.toLowerCase()))`

#### 2. Halaman Ingredient Detail (`/ingredient/:name`)
- **Dynamic Routing:** 
  Ambil `name` dari router Next.js (`useParams` pada App Router).
- **Data Initialization:**
  Panggil API `filter.php?i={name}`.
- **Handling Data:**
  - Jika hasil kembalian API bernilai `null` atau kosong, tampilkan komponen `NotFound` atau "Gagal Menemukan Produk".
  - Jika ada, map array result ke dalam grid `<MealCard />`.

#### 3. Halaman Meal Detail (`/meal/:id`)
- **Dynamic Routing:** Ambil id (*meal id*) dari URL.
- **Data Initialization:** Panggil `lookup.php?i={id}`.
- **Parsing Data Recipe:**
  API *MealDB* mengembalikan ingredient dan takarannya dalam *flat object* (`strIngredient1`, `strMeasure1`, dst. sampai 20).
  - **Logic Extract:** Gunakan loop 1 s/d 20 untuk melihat apakah properti ingredients ada dan bukan *string* kosong, lalu gabungkan ke dalam *array of objects*: 
    `[{ ingredient: strIngredient1, measure: strMeasure1 }, ...]`

### C. Loading & Error Handling
1. **Loading State:** 
   - Gunakan `[isLoading, setIsLoading] = useState(true)` sebelum *fetch*.
   - Saat `isLoading` true, render komponen `<SkeletonCard />` untuk menghindari *layout shift* (layar berkedip).
2. **Error State:**
   - Bungkus *fetch* dengan `try/catch`.
   - Di blok *catch*, isi sebuah *state error* `[error, setError] = useState(null)`.
   - Jika *error* berisikan text, tampilkan pesan: *"Gagal memuat data. Periksa koneksi internet Anda atau coba kembali."*

### D. Optimasi Performa (Opsional & Nilai Plus)
- **Debounce Search:** Saat user mengetik untuk live-filtering, gunakan teknik *debounce* (misal: jeda 300ms) untuk mencegah filter terlalu sering berjalan tiap ketikan. (Bukan isu besar karena *client side*, tetap disarankan demi *smoothness*).
- **Image Optimization:** Gunakan `next/image` bawaan dari Next.js untuk mempercepat pemuatan *thumbnail* karena ukurannya dikompresi otomatis.
- **Caching:** Karena API data list tidak sering berubah, kita bisa memanfaatkan fitur *Fetch Cache* di Next.js (`{ cache: 'force-cache' }`).
