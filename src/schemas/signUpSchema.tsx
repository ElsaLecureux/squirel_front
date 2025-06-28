import * as z from 'zod/v4';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const SignUpSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    email: z.email(),
    password: z.string().min(8, 'Must have at least 8 characters').regex(passwordRegex, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // This specifies which field the error should be attached to
  });
