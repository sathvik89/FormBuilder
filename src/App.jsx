"use client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import BuilderPage from "./pages/BuilderPage";
import FormPreviewPage from "./pages/FormPreviewPage";
import FormFillerPage from "./pages/FormFillerPage";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/builder/:formId" element={<BuilderPage />} />
            <Route path="/preview/:formId" element={<FormPreviewPage />} />
            <Route path="/form/:formId" element={<FormFillerPage />} />
            <Route path="/demo" element={<FormPreviewPage />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
