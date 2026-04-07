/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["www.themealdb.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/mealdb/:path*",
        destination: "https://www.themealdb.com/api/json/v1/1/:path*",
      },
      {
        source: "/images/mealdb/:path*",
        destination: "https://www.themealdb.com/images/ingredients/:path*",
      },
    ];
  },
};

export default nextConfig;
