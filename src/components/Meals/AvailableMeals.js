import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-app-a241a-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch meals. Received ${response.status}`);
      }
      const responseData = await response.json();

      const transformedMeals = [];
      for (const key in responseData) {
        transformedMeals.push({
          ...responseData[key],
          id: key,
        });
      }
      setMeals(transformedMeals);
    };

    try {
      fetchMeals();
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, []);

  if (isLoading || error) {
    return (
      <section className={error ? classes.MealsError : classes.MealsLoading}>
        <p>{error ? error : 'Loading...'}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
