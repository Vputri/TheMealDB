# PRD: Recipe Explorer App (TheMealDB Integration)

## 1. Project Overview
Membangun aplikasi web yang modern, cepat, dan responsif menggunakan **Next.js**. Aplikasi ini memungkinkan pengguna untuk menjelajahi berbagai bahan makanan (*ingredients*), melakukan pencarian secara *real-time*, dan melihat daftar masakan yang terkait dengan bahan tersebut menggunakan data dari **TheMealDB Public API**.

---

## 2. Technical Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router recommended).
- **Styling**: Vanilla CSS atau Tailwind CSS (Fokus pada desain premium dan animasi halus).
- **State Management**: React Hooks (`useState`, `useEffect`) & Context API.
- **API**: [TheMealDB API](https://www.themealdb.com/api.php).
- **Deployment**: Vercel.

---

## 3. Site Map & Routes
- `/` (**Halaman Ingredients**): Daftar utama bahan makanan dengan fitur pencarian.
- `/ingredient/:name` (**Halaman Ingredient Detail**): Daftar masakan berdasarkan bahan yang dipilih.
- `/meal/:id` (**Halaman Meal Detail - Bonus**): Detail lengkap instruksi, resep, dan video tutorial.

---

## 4. Feature Requirements

### A. Halaman Ingredients (Main Page)
- **Data Fetching**: Mengambil list bahan makanan dari `list.php?i=list`.
- **Search Functionality**: Fitur pencarian *client-side* untuk menyaring nama bahan secara *real-time*.
- **Navigation**: Klik pada kartu bahan mengarahkan user ke halaman detail sesuai nama bahan.
- **UI Components**: `SearchInput`, `IngredientCard`, `IngredientGrid`.

### B. Halaman Ingredient Detail
- **Dynamic Route**: Menerima parameter `name` (contoh: `chicken`).
- **Data Fetching**: Menggunakan endpoint `filter.php?i={ingredient-name}`.
- **Display**: Grid kartu makanan yang berisi gambar (`strMealThumb`) dan nama makanan (`strMeal`).
- **Interaction**: Pencarian lokal di dalam list yang sudah difilter.
- **UI Components**: `MealCard`, `Breadcrumbs`, `LoadingSkeleton`.

### C. Halaman Meal Detail (Bonus Goal)
- **Dynamic Route**: Menerima parameter `id`.
- **Data Fetching**: Menggunakan endpoint `lookup.php?i={id}`.
- **Content**:
  - Gambar Hero & Judul Masakan.
  - Metadata: Kategori dan Area (misal: *Dessert*, *Italian*).
  - List Bahan & Takaran dalam bentuk tabel/list yang rapi.
  - Instruksi langkah-demi-langkah.
  - YouTube Video Embed.

---

## 5. Design & User Experience (UX)
- **Premium Aesthetics**: Penggunaan palet warna yang harmonis, tipografi modern (Inter/Poppins), dan bayangan halus (*soft shadows*).
- **Responsiveness**: Pengalaman mulus di Desktop, Tablet, dan Mobile.
- **Animations**: Transisi antar halaman yang halus dan efek *hover* pada kartu masakan.
- **Error Handling**: Tampilan khusus jika data gagal dimuat atau hasil pencarian kosong.
- **Loading State**: Implementasi Skeleton Screen untuk memberikan kesan aplikasi yang cepat.

---

## 6. Roadmap & Priority

| Task | Priority | Status |
| :--- | :---: | :--- |
| Setup Project (Next.js + Tailwind) | **High** | ⏳ To Do |
| Integrasi API List Ingredients | **High** | ⏳ To Do |
| Fitur Search & Filter Frontend | **High** | ⏳ To Do |
| Struktur Halaman Detail Ingredient | **High** | ⏳ To Do |
| Responsive Layouting & Polish | **Medium** | ⏳ To Do |
| Bonus: Meal Detail Page | **Medium** | ⏳ To Do |
| Deployment to Vercel | **Low** | ⏳ To Do |

---

## 7. SEO Best Practices
- Menggunakan Tag Title & Meta Description yang deskriptif untuk setiap halaman.
- Struktur Heading (H1, H2, H3) yang benar secara semantik.
- Optimasi gambar menggunakan komponen `next/image`.