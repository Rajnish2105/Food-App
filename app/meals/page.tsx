import type { Metadata } from "next";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browse the delecious meals shared by our community",
};

async function MealsWrapper(): Promise<JSX.Element> {
  const meals = await db.recipe.findMany();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage(): JSX.Element {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, create{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose Your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          <MealsWrapper />
        </Suspense>
      </main>
    </>
  );
}
