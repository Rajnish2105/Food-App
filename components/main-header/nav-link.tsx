"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import classes from "./nav-link.module.css";

type PropType = {
  href: string;
  children: ReactNode;
};

export default function Navlink({ href, children }: PropType): JSX.Element {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}
