import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.navigation}>
      <img src="/logo.svg" alt="Another Twitter Clone logo" />
      <h1 className={classes.title}>Another Twitter Clone</h1>
      <div className={classes.loggedInUser}>
        <span className={classes.loggedInUserName}>John Smith</span>
        <span className={classes.loggedInUserInitials}>JS</span>
      </div>
    </nav>
  );
};

export default Navigation;
