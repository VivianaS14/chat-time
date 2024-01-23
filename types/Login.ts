export type FormValues = {
  Email: string;
  Password: string;
};

export interface RegisterFormValues extends FormValues {
  ConfirmEmail: string;
  ConfirmPassword: string;
  Name: string;
}
