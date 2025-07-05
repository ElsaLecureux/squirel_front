import * as z from 'zod/v4';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const SignUpSchema = z
  .object({
    username: z.string().min(1, 'Le nom d’utilisateur est requis'),
    email: z.email('Adresse email invalide'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(passwordRegex, {
        message:
          'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
      }),
    confirmPassword: z.string(),
    consent: z.literal(true, {
      message:
        'Conformément au RGPD, vous devez accepter la collecte des données pour créer le compte.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });
