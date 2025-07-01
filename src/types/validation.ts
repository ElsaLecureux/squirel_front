export type ValidationResultSignIn =
  | {
      success: true;
      data: { username: string; password: string };
    }
  | {
      success: false;
      data: null;
    };

export interface ValidationResultSignUp {
  success: boolean;
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  } | null;
}
