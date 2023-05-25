import { useState, useCallback, useEffect } from 'react';
import Card from '../UI/Card';
import style from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const AvailableMeals = props => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);


    useEffect(() => {
        const fetchMeals = async function () {
            const response = await fetch('https://react-http-de5da-default-rtdb.firebaseio.com/meals.json');

            if(!response.ok)
                throw new Error('Something went wrong :(');
            const data = await response.json();
            const newMeals = [];
            for (const meal in data) {
                const newMeal = { id: meal, ...data[meal] };
                // console.log(newMeal);
                newMeals.push(newMeal);
            }

            setMeals(newMeals);
            console.log(newMeals);
        };
        // try and catch block will not work b/c fetchMeals return promise
        fetchMeals().catch(error => {
            setHttpError(true);
            console.error(error.message);
        }).finally(()=>{
            setIsLoading(false);
        })
        
    }, []);

    if(isLoading){
        return <section className={style.mealLoading}>
            <p>Loading...</p>
        </section>
    }

    if(httpError){
        return <p className={style.httpError}>Unable to fetch :(</p>
    }

    return (
        <section className={style.meals}>
            <Card>
                <ul>{meals.map((meal) => {
                    return <MealItem key={meal.id} meal={meal} />
                })}</ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;