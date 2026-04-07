# Recipe Explorer App 🍳

A premium and fully responsive web application built with **Next.js** and **Tailwind CSS**, integrated with **TheMealDB Public API**. Explore thousands of ingredients, find recipes based on what you have, and follow step-by-step instructions with video tutorials.

![Hero Banner](https://via.placeholder.com/1200x600?text=Recipe+Explorer+Preview) *(Note: Tambahkan screenshot rilis nanti di sini)*

---

## ✨ Features

- **Ingredient Browser**: Search and explore a wide variety of food ingredients with a clean, grid-based UI.
- **Adaptive UI**: Fully optimized layout for both Desktop ("Desktop banget") and Mobile ("Mobile banget").
- **Smart Search**: Real-time filtering for ingredients and meal recipes.
- **Meal Details**: Comprehensive recipe details including step-by-step instructions, ingredients table, and embedded YouTube videos.
- **Internal API Proxy**: Specifically configured via Next.js Rewrites to avoid CORS issues and API rate limits.
- **Premium Loading States**: Advanced gradient shimmer animation for skeleton screens to ensure smooth UX.

---

## ⚡ Performance Matrix (Target)
Aplikasi ini dibangun dengan memprioritaskan Core Web Vitals.
- **Performance**: 90+ (Lighthouse)
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useFetch` custom hook)
- **API**: TheMealDB API
- **Fonts**: Poppins (Headings) & Inter (Body)

---

## 📂 Project Structure Details

```text
src/
├── app/                  # Route Next.js & konfigurasi global (layout, globals.css)
├── component/            
│   ├── common/           # Komponen generic (Input, Skeleton, ErrorState)
│   ├── features/         # Komponen khusus domain (IngredientCard, MealCard)
│   └── ui/               # Aset UI kecil seperti custom SVG Icons
├── constants/            # Token statis (Endpoints API, URL gambar)
├── types/                # Definisi type/interface TypeScript
└── utils/                # Custom helper & hooks (cn, useFetch, interceptors)
docs/                     # Dokumentasi arsitektur dan persyaratan sistem
```

---

## 🛠️ Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/Vputri/TheMealDB.git
cd TheMealDB
npm install
```

### 2. Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```

### 3. Run Locally
```bash
npm run dev
```

---

## 🐳 Docker Support

Run the application using Docker:

#### Development
```bash
docker-compose -f docker-compose.dev.yaml up --build
```

#### Production
```bash
docker-compose up --build
```

---

## 🤝 Contributing Guidelines

1. Fork repositori ini.
2. Buat *branch* fitur Anda: `git checkout -b feature/AmazingFeature`
3. Commit perubahan Anda: `git commit -m 'feat: Add some AmazingFeature'`
4. Push ke branch: `git push origin feature/AmazingFeature`
5. Buka **Pull Request**.

Gunakan *Conventional Commits* untuk pesan commit Anda.

---

## 📄 License
This project is for educational purposes. API data provided by TheMealDB.
