import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

export type MealType = {
  title: string;
  slug?: string;
  id: number;
  image: any;
  summary: string;
  creator: string;
  creator_email?: string;
  instructions?: string;
};

export default function MealsGrid({
  meals,
}: {
  meals: MealType[];
}): JSX.Element {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: MealType) => (
        <li key={meal.slug}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
