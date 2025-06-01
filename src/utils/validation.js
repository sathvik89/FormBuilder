export const validateField = (field, value) => {
  const errors = [];

  // Required field validation
  if (field.required && (!value || value.toString().trim() === "")) {
    errors.push(`${field.label} is required`);
    return errors;
  }

  // Skip other validations if field is empty and not required
  if (!value || value.toString().trim() === "") {
    return errors;
  }

  // Email validation
  if (field.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.push("Please enter a valid email address");
    }
  }

  // Phone validation
  if (field.type === "phone") {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-()]/g, ""))) {
      errors.push("Please enter a valid phone number");
    }
  }

  // Text length validation
  if (field.type === "text" || field.type === "textarea") {
    if (field.minLength && value.length < parseInt(field.minLength)) {
      errors.push(`Minimum length is ${field.minLength} characters`);
    }
    if (field.maxLength && value.length > parseInt(field.maxLength)) {
      errors.push(`Maximum length is ${field.maxLength} characters`);
    }
  }

  return errors;
};

export const validateStep = (fields, formData) => {
  const errors = {};
  let isValid = true;

  fields.forEach((field) => {
    const fieldErrors = validateField(field, formData[field.id]);
    if (fieldErrors.length > 0) {
      errors[field.id] = fieldErrors;
      isValid = false;
    }
  });

  return { isValid, errors };
};
