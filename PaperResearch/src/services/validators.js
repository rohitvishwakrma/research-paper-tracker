export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

export const validateRequired = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!validateRequired(email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!validateRequired(password)) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
