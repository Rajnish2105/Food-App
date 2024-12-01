import classes from "./meal-item.module.css";
import Image from "next/image";
import Link from "next/link";

type PropType = {
  instructions?: string;
  creator_email?: string;
  title: string;
  id: number;
  image: string;
  summary: string;
  creator?: string;
};

export default function MealItem({
  id,
  title,
  image,
  summary,
  creator,
}: PropType): JSX.Element {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
