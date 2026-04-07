# PRD: Recipe Explorer App (TheMealDB Integration)

## 1. Project Overview
Membangun aplikasi web yang modern, cepat, dan responsif menggunakan **Next.js**. Aplikasi ini memungkinkan pengguna untuk menjelajahi berbagai bahan makanan (*ingredients*), melakukan pencarian secara *real-time*, dan melihat daftar masakan yang terkait dengan bahan tersebut menggunakan data dari **TheMealDB Public API**.

---

## 2. Technical Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router recommended).
- **Styling**: Tailwind CSS (Fokus pada desain premium dan animasi halus).
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`).
- **API**: [TheMealDB API](https://www.themealdb.com/api.php) (via Internal Proxy).
- **Deployment**: Vercel.

---

## 3. Site Map & Routes
- `/` (**Halaman Ingredients**): Daftar utama bahan makanan dengan fitur pencarian.
- `/ingredient/:name` (**Halaman Ingredient Detail**): Daftar masakan berdasarkan bahan yang dipilih.
- `/meal/:id` (**Halaman Meal Detail**): Detail lengkap instruksi, resep, dan video tutorial.

---

## 4. Feature Requirements (Phase 1 - Delivered)

### A. Halaman Ingredients (Main Page)
- **Data Fetching**: Mengambil list bahan makanan proksial.
- **Search Functionality**: Fitur pencarian *client-side* untuk menyaring nama bahan secara *real-time*.
- **UI Components**: `SearchInput`, `IngredientCard`, `IngredientGrid`.

### B. Halaman Ingredient Detail
- **Dynamic Route**: Menerima parameter `name` (contoh: `chicken`).
- **Data Fetching**: Menggunakan proxied endpoint `filter.php?i={ingredient-name}`.
- **Display**: Grid kartu makanan yang *adaptive*.

### C. Halaman Meal Detail
- **Dynamic Route**: Menerima parameter `id`.
- **Content**:
  - Gambar Hero & Judul Masakan (Rasio khusus Desktop vs Mobile).
  - List Bahan & Takaran.
  - Instruksi langkah-demi-langkah.
  - YouTube Video Embed.

---

## 5. Design & User Experience (UX)
- **Premium Aesthetics**: Penggunaan palet warna yang harmonis, tipografi modern (Inter/Poppins).
- **Adaptive UI**: Pengalaman yang disesuaikan secara ekstrem untuk Desktop dan Mobile.
- **Animations**: Transisi *Shimmer Loading* yang elegan.
- **Error Handling**: Tampilan khusus jika API Rate Limit tercapai atau data kosong.

---

## 6. Phase 2 Features (Future Roadmap)

Untuk rilis versi 2.0, fokus pengembangan akan diarahkan ke personalisasi dan optimasi pencarian:
1. **Fitur "My Favorites"**: Kemampuan pengguna untuk menyimpan/bookmark resep favorit mereka menggunakan penyimpanan lokal (`localStorage`).
2. **Kategori Penjelajahan Alternatif**: Menambahkan opsi penjelajahan resep berdasarkan Kategori Makanan (Breakfast, Seafood, Dessert) dan Area Negara (Italian, Japanese).
3. **Dark Mode Integration**: Sistem tema dinamis terang dan gelap penuh.
4. **Implementasi i18n**: Dukungan multi-bahasa (Inggris dan konfigurasi terjemahan Bahasa Indonesia).

---

## 7. Analytics & Tracking (Planned)
Untuk memahami *user behaviour*:
- Track pencarian *ingredient* mana yang paling populer.
- Pantau tingkat konversi tontonan video (YouTube API).
- Analisis *bounce rate* pada halaman error.

---

## 8. SEO Best Practices
- Menggunakan Tag Title & Meta Description yang deskriptif untuk setiap halaman.
- Struktur Heading (H1, H2, H3) yang benar secara semantik.
- Optimasi gambar otomatis melalui `next/image` proxy.