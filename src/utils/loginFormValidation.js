import * as Yup from 'yup';

export const loginValidation = Yup.object({

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .required('Please enter your password'),
});


export const forgotPassValidation = Yup.object({

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required')
})


export const forgotPassCode = Yup.object({

  code: Yup.string()
    .min(32, 'Code must be 32 characters long')
    .max(32, 'Code must be 32 characters long')
    .required('Please enter the code')
})


export const resetPassValidation = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter a password'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Please confirm your new password')
})
