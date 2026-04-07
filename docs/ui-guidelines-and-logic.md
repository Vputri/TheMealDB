# UI Guidelines & Application Logic

Dokumen ini berisi panduan desain antarmuka (UI) dan alur logika aplikasi untuk **Recipe Explorer App** sesuai dengan PRD.

---

## 1. UI Guidelines (Panduan Desain)

Agar aplikasi terlihat modern, premium, dan konsisten, berikut adalah panduan elemen-elemen desain yang akan digunakan:

### A. Color Palette (Palet Warna Utama)
- **Primary Color:** `#FF6B6B` (Coral Red) - Digunakan untuk aksen dan interaksi yang menonjol.
- **Background (Light):** `#F9FAFB` (Gray-50) - Latar belakang utama.
- **Card Background:** `#FFFFFF` (White) - Kontras kartu.
- **Text Primary:** `#1F2937` (Gray-800) - Judul utama.
- **Text Secondary:** `#6B7280` (Gray-500) - Deskripsi ringan.

### B. Typography & Accessibility (a11y)
- **Headings (H1, H2, H3):** `Poppins` (Bold/Semi-Bold).
- **Body:** `Inter` (Regular).
- **A11y Constraint**: Pastikan rasio kontras warna setidaknya 4.5:1 untuk teks normal berdasarkan standar WCAG 2.1 AA. Semua SVG Icons wajib menerima property `aria-label` tersembunyi jika berfungsi sebagai tombol interaktif tanpa teks (khusus untuk input search).

### C. Bentuk & Bayangan (Adaptive Design)
- **Radius**: `16px` (`rounded-2xl`) untuk kotak kecil, dan hingga `40px` (`rounded-[2.5rem]`) untuk wadah gambar hero pada mobile.
- **Shadow**: `shadow-xl` untuk kedalaman.

---

## 2. Component Design Specifications

### A. Komponen Input (`SearchInput`)
- **Mandatory Props**: `value` (string), `onChange` (function), `placeholder` (string).
- **Behavior**: Wajib mendukung *debouncing* dan bisa dijernihkan (*cleared*) dengan cepat. Wajib bisa menerima *focus state* keyboard.

### B. Komponen Kartu (`IngredientCard` & `MealCard`)
- **Interactions**: Kartu harus mendukung kelas Tailwind `.group` agar bisa memanfaatkan `group-hover:scale` pada gambar utamanya.

---

## 3. Application Logic & Edge Cases

### A. Alur Fetching Data & Proxy (CORS Bypass)
Aplikasi memanfaatkan fitur `Next.js Rewrites` di `next.config.mjs` untuk mem-*proxy* API.
- Base URL Proxy lokal adalah `/api/mealdb`. Permintaan secara otomatis (*server-side*) dialihkan ke TheMealDB. Hal ini **wajib** digunakan agar browser tidak memblokir CORS.

### B. State Management
- **Local State & UseRef:** Fungsi *fetcher* wajib disimpan di dalam `useRef()` melalui *custom hook* `useFetch` untuk mencegah infinite fetching loop yang memicu Error 429 (Too Many Requests) dari API. 

### C. Error Boundaries & Fallback Scenarios
Akiapukasi dirancang agar secara halus menangani kegagalan:
1. **Network Failure / Offline**: Tangkap error di `useFetch` dan kirimkan UI fallback "Oops! Terjadi Kesalahan".
2. **API Rate Limiting (429)**: Jika di-block sementara, pastikan aplikasi tetap mengembalikan pesan "*Silakan coba beberapa saat lagi*" alih-alih melempar blank screen putih.
3. **Empty Filter Search**: Jika tidak ada masakan/bahan yang sesuai dalam mode filter lokal (*Client-Side Search*), UI tidak boleh rusak, tetapi merender daftar kosong tanpa status loading yang berkelanjutan.

### D. Optimasi Performa
- **Debounce Search:** Jedah 300ms.
- **Shimmer Loading Animation:** Menggati *Pulse* CSS standar dengan animasi kilau *background-gradient* berjalan yang mensimulasikan pemuatan aplikasi premium asli.
