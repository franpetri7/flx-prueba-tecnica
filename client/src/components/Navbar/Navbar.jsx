import React from "react";
import styles from "./Navbar.module.css";
import logoFlexxus from "../../assets/Flexxus-Logo-Black-sidebar 1.png";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.containerImg} src={logoFlexxus} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
