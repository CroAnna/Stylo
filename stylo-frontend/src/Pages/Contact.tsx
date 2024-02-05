import { useRef, useState } from "react";
import Button from "../Components/atoms/Button";
import Input from "../Components/atoms/Input";
import Textarea from "../Components/atoms/Textarea";
import { notifyFailure, notifySuccess } from "../Components/atoms/Toast";
import emailjs from "@emailjs/browser";
import * as Yup from "yup";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    description: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  interface Errors {
    [key: string]: string;
  }

  const handleUserDataChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    handleUserDataChange(name, e.target.value);
  };

  const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validateForm = () => {
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required("Unesi ime!"),
      lastName: Yup.string().required("Unesi prezime!"),
      email: Yup.string()
        .email("Unesi ispravni email")
        .required("Unesi email adresu!"),
      phone: Yup.string()
        .test("is-phone_number", "Unesi ispravan broj telefona", (value) => {
          if (value) {
            return phoneRegex.test(value);
          }
          return true;
        })
        .typeError("Unesi ispravan broj telefona")
        .required("Unesi broj telefona!"),
      description: Yup.string().required("Unesi poruku!"),
    });

    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      setErrors({} as typeof errors);
      return true;
    } catch (error) {
      //catch variables have to be type of unknown
      const validationErrors: { [key: string]: string } = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const form = useRef();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async function sendEmail(e) {
    //console.log("Pozivam se");
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const templateParams = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          description: formData.description,
          phone: formData.phone,
        };

        await emailjs.send(
          "service_rididoi",
          "template_a52kz4o",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          templateParams,
          "uEv5XssPSUZAjRkfW"
        );
        notifySuccess("Podrška uspješno kontaktirana!");
      } catch (err) {
        // console.log("Doslo je do pogreske");
        notifyFailure("Došlo je do pogreške");
      }
    }
  }
  return (
    <div className="flex justify-center flex-col items-center px-4 relative py-4">
      <p className="text-xl text-center">Imate pitanja?</p>
      <h3 className="text-2xl text-center">Kontaktirajte nas</h3>
      <div className=" bg-white-light w-full px-6 py-9 rounded-lg mb-2  z-10  flex flex-col lg:py-16 lg:gap-8 max-w-[1200px]">
        <form
          id="loginForm"
          className="flex flex-col gap-3.5  lg:flex-row items-center"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={form}
          onSubmit={sendEmail}
        >
          <div className="flex flex-col gap-5 w-full ">
            <Input
              value={formData.firstName}
              name="firstName"
              onChange={(e) => handleInputChange(e, "firstName")}
              type="text"
              placeholder="Ime *"
              error={errors.firstName}
            />
            <Input
              value={formData.lastName}
              name="lastName"
              type="text"
              onChange={(e) => handleInputChange(e, "lastName")}
              placeholder="Prezime *"
              error={errors.lastName}
            />

            <Input
              value={formData.email}
              name="email"
              onChange={(e) => handleInputChange(e, "email")}
              type="text"
              placeholder="Email *"
              error={errors.email}
            />

            <Input
              value={formData.phone}
              type="text"
              name="phone"
              onChange={(e) => handleInputChange(e, "phone")}
              placeholder="Telefon *"
              error={errors.phone}
            />
          </div>

          <div className="w-full h-full  ">
            <Textarea
              value={formData.description}
              name="description"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={(e) => handleInputChange(e, "description")}
              placeholder="Poruka *"
              rows={"10"}
              cols="5"
              error={errors.description}
            />
          </div>
        </form>
      </div>
      <div className="w-full max-w-[400px]">
        <Button form="loginForm" onClick={() => {}} type="submit">
          Pošalji poruku
        </Button>
      </div>
    </div>
  );
};

export default Contact;
