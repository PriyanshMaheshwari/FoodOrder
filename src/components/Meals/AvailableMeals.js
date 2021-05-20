import React, { useEffect, useState} from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async() => {
      const response = await fetch('https://react-prac-34cc1-default-rtdb.firebaseio.com/meals.json'); 

      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      console.log(responseData);

      const loadedMeals = [];
      
      for(const key in responseData){
        loadedMeals.push({
          id : key,
          name : responseData[key].name,
          price : responseData[key].price,
          description : responseData[key].description
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  },[]);

  if(isLoading){
    return(
      <section className={classes.MealsLoading}>
        <h1>Loading..</h1>
      </section>
    )
  }

  if(httpError){
    return(
      <section className={classes.MealsLoading}>
        <h1>Error</h1>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            ></MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
