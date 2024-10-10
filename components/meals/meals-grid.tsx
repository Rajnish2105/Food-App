import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

type MealType = {
  title: string;
  slug?: string;
  image: any;
  summary: string;
  creator: string;
  creator_email?: string;
  instructions?: string;
};

type MealsGridProps = {
  meals: MealType[]; // meals should be an array of MealType
};

export default function MealsGrid({ meals }: MealsGridProps): JSX.Element {
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
