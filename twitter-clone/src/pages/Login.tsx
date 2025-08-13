import { Link } from "react-router";
import classes from "./Login.module.css";
import { useState } from "react";

type LoginInfoType = {
  username: string;
  password: string;
};

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    username: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h2 className={classes.title}>Log In</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formRow}>
            <input
              id="username"
              name="username"
              className={classes.input}
              type="email"
              placeholder="Username"
              autoComplete="off"
              onChange={handleInputChange}
              value={loginInfo.username}
            />
          </div>

          <div className={classes.formRow}>
            <input
              id="password"
              name="password"
              className={classes.input}
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={handleInputChange}
              value={loginInfo.password}
            />
          </div>

          <button className={classes.button}>Log In</button>
        </form>
      </div>
      <p className={classes.signupMessage}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
