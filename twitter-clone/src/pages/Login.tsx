import { Link, useNavigate } from "react-router";
import classes from "./Login.module.css";
import { useState } from "react";
import { passwordValidation } from "../utils/validation";

type LoginInfoType = {
  username: string;
  password: string;
};
type PossibleErrorsType = "password";

const Login = () => {
  let navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<PossibleErrorsType[]>([]);
  const [mainErrorMessage, setMainErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: PossibleErrorsType[] = [];

    if (!passwordValidation(loginInfo.password)) {
      newErrors.push("password");
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    const response = await fetch(
      `http://localhost:3001/users/${loginInfo.username}`
    );

    if (!response.ok) {
      setMainErrorMessage(
        response.status === 404
          ? "User with the given username was not found"
          : "Something went wrong"
      );
      return;
    }

    const user = await response.json();
    if (user.password !== loginInfo.password) {
      setMainErrorMessage("Password was incorrect");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    navigate("/");
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
      <p className={classes.errorMessage}>{mainErrorMessage}</p>

      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formRow}>
          <input
            id="username"
            name="username"
            className={classes.input}
            type="text"
            placeholder="Username"
            autoComplete="off"
            onChange={handleInputChange}
            value={loginInfo.username}
          />
          <p className={`${classes.error} ${classes.hidden}`}>Invalid email</p>
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
