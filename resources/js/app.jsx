import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { ToastProvider } from "@/Components/ui/useToast.jsx";

const appName =
  import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <ToastProvider>
          <App {...props} />
        </ToastProvider>
      </React.StrictMode>
    );
  },
  progress: {
    color: "#D71920",
  },
});
