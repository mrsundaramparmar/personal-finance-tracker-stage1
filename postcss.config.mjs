const config = {
  plugins: ["@tailwindcss/postcss"],
};
// ✅ ESM (for .mjs)
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
