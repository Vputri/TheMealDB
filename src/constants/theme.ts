// Design tokens from UI Guidelines
export const COLORS = {
  primary: "#FF6B6B",
  primaryHover: "#FF5252",
  secondary: "#FF9E7D",
  background: "#F9FAFB",
  surface: "#FFFFFF",
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  error: "#EF4444",
  success: "#10B981",
  skeleton: "#E5E7EB",
  skeletonShine: "#F3F4F6",
  overlay: "rgba(0, 0, 0, 0.5)",
} as const;

export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
} as const;

export const RADIUS = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "9999px",
} as const;

export const APP_NAME = "Recipe Explorer";
export const APP_DESCRIPTION =
  "Jelajahi bahan makanan dan temukan resep masakan terbaik dari seluruh dunia.";
