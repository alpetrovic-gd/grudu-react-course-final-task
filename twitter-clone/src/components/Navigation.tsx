import { useEffect, useRef, useState } from "react";
import classes from "./Navigation.module.css";
import { useNavigate } from "react-router";
import { UserModel } from "../models/UserModel";

const Navigation: React.FC = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loggedInUserInfoRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  let userInitials = user?.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  let navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const user: UserModel = JSON.parse(loggedInUser);
    const fetchAndUpdateUserInfo = async (user: UserModel) => {
      const response = await fetch(`http://localhost:3001/users/${user.id}`);

      const userData = await response.json();

      setUser(userData);
    };
    fetchAndUpdateUserInfo(user);
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isDropdownOpen) {
        return;
      }

      if (
        loggedInUserInfoRef.current &&
        !loggedInUserInfoRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className={classes.navigation}>
      <img src="/logo.svg" alt="Another Twitter Clone logo" />
      <h1 className={classes.title}>Another Twitter Clone</h1>
      <div className={classes.loggedInUser}>
        <div
          className={classes.loggedInUserInfo}
          onClick={toggleDropdown}
          ref={loggedInUserInfoRef}
        >
          <span className={classes.loggedInUserName}>{user?.name}</span>
          <span className={classes.loggedInUserInitials}>{userInitials}</span>
        </div>

        <div
          className={`${classes.dropdown} ${
            isDropdownOpen ? classes.dropdownOpen : ""
          }`}
          ref={dropdownRef}
        >
          <ul className={classes.dropdownOptions}>
            <li className={classes.dropdownOption} onClick={handleLogout}>
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
