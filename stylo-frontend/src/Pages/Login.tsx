import React, { useState } from "react";
import Input from "../Components/atoms/Input";
import Button from "../Components/atoms/Button";
import { Link } from "react-router-dom";
import sneakersImg1 from "../assets/images/sneakers1.png";
import sneakersImg2 from "../assets/images/sneakers2.png";
import * as Yup from "yup";
import { loginUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { notifyFailure } from "../Components/atoms/Toast";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = () => {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Unesi ispravni email")
        .required("Unesi email adresu!"),
      password: Yup.string().required("Unesi lozinku!"),
    });

    try {
      validationSchema.validateSync(userData, { abortEarly: false });
      setErrors({} as typeof errors);
      return true;
    } catch (error) {
      const validationErrors: { [key: string]: string } = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignoreS
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  interface Errors {
    [key: string]: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await loginUser(userData);

        if (response == "Account with the given credentials not found.") {
          notifyFailure("Netočni podaci ili račun ne postoji.");
        } else if (response == "Email address of account not verified!") {
          notifyFailure("Račun nije verificiran. Molimo verificirajte ga.");
        } else {
          // console.log(response);
          localStorage.setItem("token", response.accessToken);
          navigate("/");
        }
      } catch (err) {
        //console.log(err);
      }
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
        <h2 className="text-2xl text-center">Postojeći korisnik</h2>
        <form
          id="loginForm"
          onSubmit={handleSubmit}
          className="flex flex-col gap-3.5 my-5"
        >
          <Input
            value={userData.email}
            error={errors.email}
            name="email"
            onChange={(e) => handleInputChange(e, "email")}
            type="email"
            placeholder="Email *"
          />
          <Input
            value={userData.password}
            error={errors.password}
            type="password"
            name="password"
            onChange={(e) => handleInputChange(e, "password")}
            placeholder="Lozinka *"
          />
        </form>
        <Button form="loginForm" onClick={() => {}} type="submit">
          Prijavi se
        </Button>
      </div>
      <div className="text-white-light block gap-1 tracking-wider px-4 text-center lg:flex">
        <p>Još nemaš račun?</p>
        <p>
          <Link
            to={"/register"}
            className="text-underline "
            style={{ textDecoration: "underline" }}
          >
            Registriraj se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
