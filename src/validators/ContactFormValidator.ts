import * as yup from "yup";

export const contactFormValidator = yup.object().shape({
  companyName: yup.string(),
  email: yup
    .string()
    .email("Adres e-mail jest nieprawidłowy.")
    .required("Adres e-mail jest wymagany."),
  personalData: yup.string().required("Dane personalne są wymagane."),
  phoneNumber: yup
    .string()
    .matches(
      /^[1-9]\d{2}([-\s]?\d{3}){2}$/,
      "Numer telefonu jest nieprawidłowy.",
    )
    .required("Numer telefonu jest wymagany."),
  message: yup.string().required("Wiadomość jest wymagana."),
});
