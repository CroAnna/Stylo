import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/atoms/Button";
import Input from "../Components/atoms/Input";
import { useState } from "react";
import sneakersImg1 from "../assets/images/sneakers1.png";
import sneakersImg2 from "../assets/images/sneakers2.png";
import * as Yup from "yup";
import { registerUser } from "../api/users";
import { notifyFailure, notifyLong } from "../Components/atoms/Toast";

const Register = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({});

  interface Errors {
    [key: string]: string;
  }

  const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validateForm = () => {
    const validationSchema = Yup.object().shape({
      first_name: Yup.string().required("Unesi ime!"),
      last_name: Yup.string().required("Unesi prezime!"),
      email: Yup.string()
        .email("Unesi ispravni email")
        .required("Unesi email adresu!"),
      password: Yup.string().required("Unesi lozinku!"),
      phone_number: Yup.string()
        .test("is-phone_number", "Unesi ispravan broj telefona", (value) => {
          if (value) {
            return phoneRegex.test(value);
          }
          return true;
        })
        .typeError("Unesi ispravan broj telefona")
        .required("Unesi broj telefona!"),
    });

    try {
      validationSchema.validateSync(userData, { abortEarly: false });
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

  const handleUserDataChange = (name: string, value: string) => {
    setUserData((prevData) => ({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await registerUser(userData);

        if (response) {
          notifyLong(
            "Uspješno ste se registrirali. Idite na email i potvrdite svoj račun. Biti ćete preusmjereni na prijavu."
          );
          setTimeout(() => {
            navigate("/login");
          }, 7000);
        } else {
          notifyFailure("Već postoji taj korisnik");
        }
      } catch {
        console.log("Nešto je pošlo po krivu");
      }
    }
  };
  return (
    <div className="flex justify-center flex-col items-center w-screen h-screen px-4 bg-gradient-to-br from-white to-blue-700 relative">
      <img
        src={sneakersImg1}
        alt="sneakers-image"
        className="absolute left-8 bottom-16 rotate-12 opacity-20 hidden lg:block"
      />
      <img
        src={sneakersImg2}
        alt="sneakers-image"
        className="absolute right-8 top-8 -rotate-12 opacity-20 hidden lg:block"
      />

      <div
        className="register-form-wrapper bg-white-light w-full px-6 py-9 rounded-lg mb-2 max-w-lg z-10  flex flex-col lg:py-16 lg:gap-8"
        style={{ boxShadow: "0 0 12px #1443BB" }}
      >
        <h2 className="text-2xl text-center">Izradi račun</h2>

        <form
          className="flex flex-col gap-3.5 my-5 "
          onSubmit={handleSubmit}
          id="registerForm"
        >
          <Input
            value={userData.first_name}
            error={errors.first_name}
            name="first_name"
            onChange={(e) => handleInputChange(e, "first_name")}
            placeholder="Ime*"
          />
          <Input
            value={userData.last_name}
            error={errors.last_name}
            name="last_name"
            onChange={(e) => handleInputChange(e, "last_name")}
            placeholder="Prezime*"
          />{" "}
          <Input
            value={userData.email}
            error={errors.email}
            name="email"
            onChange={(e) => handleInputChange(e, "email")}
            placeholder="Email*"
          />{" "}
          <Input
            value={userData.phone_number}
            error={errors.phone_number}
            name="phone_number"
            onChange={(e) => handleInputChange(e, "phone_number")}
            placeholder="Broj telefona*"
          />{" "}
          <Input
            value={userData.password}
            error={errors.password}
            name="password"
            onChange={(e) => handleInputChange(e, "password")}
            placeholder="Lozinka*"
            type="password"
          />
        </form>
        <Button onClick={() => {}} type="submit" form="registerForm">
          Registriraj se
        </Button>
      </div>
      <p className="text-white-light block gap-1 tracking-wider px-4 text-center lg:flex">
        Već imaš račun?
        <span>
          <Link
            to={"/login"}
            className="text-underline"
            style={{ textDecoration: "underline" }}
          >
            Prijavi se
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
