import { createRoot } from "react-dom/client";
import App from "./App.tsx";
createRoot(document.getElementById("root")!).render(<App />);

// Enable HMR
if (import.meta.hot) {
  import.meta.hot.accept();
}
