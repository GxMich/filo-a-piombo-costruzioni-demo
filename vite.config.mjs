import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages pubblica il sito in una sottocartella: tutti i percorsi partono da qui.
export default defineConfig({
  base: "/filo-a-piombo-costruzioni-demo/",
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  plugins: [react()],
});
