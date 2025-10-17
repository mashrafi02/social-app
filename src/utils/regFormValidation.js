import * as Yup from 'yup';

export const regValidation = Yup.object({
  fName: Yup.string()
    .min(4, 'First name must be at least 4 characters')
    .max(20, 'First name cannot exceed 20 characters')
    .required('Please enter your first name'),

  lName: Yup.string()
    .min(4, 'Last name must be at least 4 characters')
    .max(20, 'Last name cannot exceed 20 characters')
    .required('Please enter your last name'),

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter a password'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Please confirm your password'),

  gender: Yup.string()
    .required('Please select a gender'),
});
