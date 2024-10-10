import type { Metadata } from "next";
import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

type PropType = {
  params: Record<string, any>;
};

export async function generateMetadata({
  params,
}: PropType): Promise<Metadata> {
  const mealMeta = await getMeal(params.mealslug);
  if (!mealMeta) {
    notFound();
  }
  return {
    title: mealMeta.title,
    description: mealMeta.summary,
  };
}

export default async function FoodPage({
  params,
}: PropType): Promise<JSX.Element> {
  const meal = await getMeal(params.mealslug);

  if (!meal) {
    notFound();
  }

  if (typeof meal.instructions === "string") {
    meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions as string | TrustedHTML,
          }}
        ></p>
      </main>
    </>
  );
}
