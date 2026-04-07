# Recipe Explorer App 🍳

A premium and fully responsive web application built with **Next.js** and **Tailwind CSS**, integrated with **TheMealDB Public API**. Explore thousands of ingredients, find recipes based on what you have, and follow step-by-step instructions with video tutorials.

---

## ✨ Features

- **Ingredient Browser**: Search and explore a wide variety of food ingredients with a clean, grid-based UI.
- **Adaptive UI**: Fully optimized layout for both Desktop ("Desktop banget") and Mobile ("Mobile banget").
- **Smart Search**: Real-time filtering for ingredients and meal recipes.
- **Meal Details**: Comprehensive recipe details including:
  - Step-by-step cooking instructions.
  - Ingredients table with measurements.
  - High-quality meal imagery.
  - Embedded YouTube video tutorials.
- **Internal API Proxy**: Specifically configured via Next.js Rewrites to avoid CORS issues.
- **Shimmer Loading**: Premium skeleton loading animation for a smooth user experience.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Hooks](https://react.dev/) & Custom Fetching Logic
- **API**: [TheMealDB API](https://www.themealdb.com/api.php)
- **Icons**: Custom SVG Icons (Lucide-inspired)
- **Design System**: Poppins (Headings) & Inter (Body) Typography

---

## 🛠️ Getting Started

### 1. Requirements
- Node.js 18.x or higher
- npm, yarn, or pnpm

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/Vputri/TheMealDB.git
cd TheMealDB
npm install
```

### 3. Environment Variables
Copy the example environment file and set your variables (optional, as defaults are already proxied):
```bash
cp .env.example .env
```

### 4. Running Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## 📂 Project Structure

```text
src/
├── app/          # Next.js App Router (Pages & Layouts)
├── component/    # Reusable UI & Feature Components
├── constants/    # Design tokens and API endpoints
├── types/        # TypeScript interfaces and types
└── utils/        # Custom hooks and API services
docs/             # Project requirements and UI documentation
```

---

## 📄 License
This project is for educational purposes. API data provided by TheMealDB.
