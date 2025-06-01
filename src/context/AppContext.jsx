import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [theme, setTheme] = useState("light");

  // load data from localStorage on mount
  useEffect(() => {
    const savedForms = localStorage.getItem("formcraft_forms");
    const savedTheme = localStorage.getItem("formcraft_theme");

    if (savedForms) {
      try {
        setForms(JSON.parse(savedForms));
      } catch (error) {
        console.error("Error loading forms:", error);
      }
    }

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Save forms to localStorage
  useEffect(() => {
    localStorage.setItem("formcraft_forms", JSON.stringify(forms));
  }, [forms]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("formcraft_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const saveForm = (formData) => {
    const existingIndex = forms.findIndex((f) => f.id === formData.id);
    if (existingIndex >= 0) {
      const updatedForms = [...forms];
      updatedForms[existingIndex] = formData;
      setForms(updatedForms);
    } else {
      setForms([...forms, formData]);
    }
  };

  const deleteForm = (formId) => {
    setForms(forms.filter((f) => f.id !== formId));
  };

  const getFormById = (formId) => {
    return forms.find((f) => f.id === formId);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    forms,
    currentForm,
    setCurrentForm,
    theme,
    toggleTheme,
    saveForm,
    deleteForm,
    getFormById,
  };

  return (
    <AppContext.Provider value={value}>
      <div className={theme === "dark" ? "dark" : ""}>{children}</div>
    </AppContext.Provider>
  );
};
