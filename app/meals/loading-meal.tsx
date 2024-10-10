import classes from './loading-meals.module.css'

export default function LoadingMeals():JSX.Element {
    return <p className={classes.loading}>Fetching Meals...</p>
}