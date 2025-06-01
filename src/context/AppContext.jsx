"use client";

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
  const [theme, setTheme] = useState("light");

  // Loading data from localStorage on mount
  useEffect(() => {
    const savedForms = localStorage.getItem("formcraft_forms");
    const savedTheme = localStorage.getItem("formcraft_theme");

    if (savedForms) {
      try {
        const parsedForms = JSON.parse(savedForms);
        setForms(parsedForms);
        console.log("Loaded forms from localStorage:", parsedForms);
      } catch (error) {
        console.error("Error loading forms:", error);
        setForms([]);
      }
    }

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Save forms to localStorage whenever forms change
  useEffect(() => {
    if (forms.length >= 0) {
      localStorage.setItem("formcraft_forms", JSON.stringify(forms));
      console.log("Saved forms to localStorage:", forms);
    }
  }, [forms]);

  const saveForm = (formData) => {
    console.log("💾 Saving form:", formData.id);
    setForms((prevForms) => {
      const existingIndex = prevForms.findIndex((f) => f.id === formData.id);
      if (existingIndex >= 0) {
        // Update existing form
        const updatedForms = [...prevForms];
        updatedForms[existingIndex] = formData;
        console.log("Updated existing form at index:", existingIndex);
        return updatedForms;
      } else {
        // Add new form
        console.log("Adding new form");
        return [...prevForms, formData];
      }
    });
  };

  const deleteForm = (formId) => {
    console.log("🗑️ Deleting form:", formId);
    setForms((prevForms) => prevForms.filter((f) => f.id !== formId));
  };

  const getFormById = (formId) => {
    const form = forms.find((f) => f.id === formId);
    console.log("🔍 Getting form by ID:", formId, "Found:", !!form);
    return form;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    forms,
    theme,
    toggleTheme,
    saveForm,
    deleteForm,
    getFormById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
