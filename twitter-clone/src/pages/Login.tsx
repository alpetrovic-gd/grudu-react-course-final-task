import { Link } from "react-router";
import classes from "./Login.module.css";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import { passwordValidation } from "../utils/validation";

type LoginInfoType = {
  email: string;
  password: string;
};
type PossibleErrorsType = keyof LoginInfoType;

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<PossibleErrorsType[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: PossibleErrorsType[] = [];

    if (!EmailValidator.validate(loginInfo.email)) {
      newErrors.push("email");
    }

    if (!passwordValidation(loginInfo.password)) {
      newErrors.push("password");
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    console.log(loginInfo);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));

    if (errors.length > 0) {
      setErrors((prevErrors) => prevErrors.filter((error) => error !== name));
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Log In</h2>
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
            value={loginInfo.email}
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
            value={loginInfo.password}
          />
          <p
            className={`${classes.error}${
              !errors.includes("password") ? ` ${classes.hidden}` : ""
            }`}
          >
            Invalid password
          </p>
        </div>

        <button className={classes.button}>Log In</button>
      </form>

      <p className={classes.signupMessage}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
