export const validateField = (field, value) => {
  const errors = [];

  // required field validation
  if (field.required && (!value || value.toString().trim() === "")) {
    errors.push(`${field.label} is required`);
    return errors;
  }

  // skip other validations if field is empty and not required
  if (!value || value.toString().trim() === "") {
    return errors;
  }

  // email validation
  if (field.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errors.push("Please enter a valid email address");
    }
  }

  // phone validation
  if (field.type === "phone") {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-()]/g, ""))) {
      errors.push("Please enter a valid phone number");
    }
  }

  // text length validation
  if (field.type === "text" || field.type === "textarea") {
    if (field.minLength && value.length < Number.parseInt(field.minLength)) {
      errors.push(`Minimum length is ${field.minLength} characters`);
    }
    if (field.maxLength && value.length > Number.parseInt(field.maxLength)) {
      errors.push(`Maximum length is ${field.maxLength} characters`);
    }
  }

  // number validation
  if (field.type === "number") {
    const numValue = Number.parseFloat(value);
    if (isNaN(numValue)) {
      errors.push("Please enter a valid number");
    } else {
      if (field.min && numValue < Number.parseFloat(field.min)) {
        errors.push(`Minimum value is ${field.min}`);
      }
      if (field.max && numValue > Number.parseFloat(field.max)) {
        errors.push(`Maximum value is ${field.max}`);
      }
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
