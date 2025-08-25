import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { lengthValidation } from "../utils/validation";
import * as EmailValidator from "email-validator";

import classes from "./Signup.module.css";

type SignUpInfoType = {
  fullName: string;
  email: string;
  password: string;
};
type PossibleErrorsType = "fullName" | "email" | "password";

const Signup: React.FC = () => {
  let navigate = useNavigate();

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfoType>({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<PossibleErrorsType[]>([]);
  const [mainErrorMessage, setMainErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSignUpInfo((prevSignUpInfo) => ({
      ...prevSignUpInfo,
      [name]: value,
    }));

    if (errors.length > 0) {
      setErrors((prevErrors) => prevErrors.filter((error) => error !== name));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: PossibleErrorsType[] = [];

    if (!EmailValidator.validate("test@email.com")) {
      newErrors.push("email");
    }
    if (!lengthValidation(signUpInfo.password, 256, 8)) {
      newErrors.push("password");
    }
    if (!lengthValidation(signUpInfo.fullName, 512, 1)) {
      newErrors.push("fullName");
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    const username = signUpInfo.email.split("@")[0];
    const newUser = {
      id: username,
      name: signUpInfo.fullName,
      email: signUpInfo.email,
      password: signUpInfo.password,
    };
    const response = await fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      setMainErrorMessage("Something went wrong");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    navigate("/");
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Sign Up</h2>
      <p className={classes.errorMessage}>{mainErrorMessage}</p>

      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formRow}>
          <input
            id="email"
            name="email"
            className={`${classes.input}${
              errors.includes("email") ? ` ${classes.inputInvalid}` : ""
            }`}
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={handleInputChange}
            value={signUpInfo.email}
          />
          <p
            className={`${classes.error}${
              !errors.includes("email") ? ` ${classes.hidden}` : ""
            }`}
          >
            Invalid email
          </p>
        </div>

        <div className={classes.formRow}>
          <input
            id="password"
            name="password"
            className={`${classes.input}${
              errors.includes("password") ? ` ${classes.inputInvalid}` : ""
            }`}
            type="password"
            placeholder="Password"
            autoComplete="off"
            onChange={handleInputChange}
            value={signUpInfo.password}
          />
          <p
            className={`${classes.error}${
              !errors.includes("password") ? ` ${classes.hidden}` : ""
            }`}
          >
            Invalid password
          </p>
        </div>

        <div className={classes.formRow}>
          <input
            id="fullName"
            name="fullName"
            className={`${classes.input}${
              errors.includes("fullName") ? ` ${classes.inputInvalid}` : ""
            }`}
            type="text"
            placeholder="Full name"
            autoComplete="off"
            onChange={handleInputChange}
            value={signUpInfo.fullName}
          />
          <p
            className={`${classes.error}${
              !errors.includes("fullName") ? ` ${classes.hidden}` : ""
            }`}
          >
            Invalid full name
          </p>
        </div>

        <button className={classes.button}>Sign Up</button>
      </form>

      <p className={classes.loginMessage}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
