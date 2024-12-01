"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import Navlink from "./nav-link";

export default function MainHeader(): JSX.Element {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavHandler = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <Link className={classes.logo} href="/">
            <Image src={logoImg} alt="Plate full of Food" priority />
            NextLevel Food
          </Link>
          <button
            className={classes.menuToggle}
            onClick={toggleNavHandler}
            aria-label="Toggle Navigation"
            aria-expanded={isNavOpen}
          >
            ☰
          </button>
        </div>

        <nav className={`${classes.nav} ${isNavOpen ? classes.navOpen : ""}`}>
          <ul>
            <li>
              <Navlink href="/meals">Browse Meals</Navlink>
            </li>
            <li>
              <Navlink href="/community">Foodies Community</Navlink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
