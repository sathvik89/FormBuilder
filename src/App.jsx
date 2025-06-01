import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
