import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const ingredients = useSelector(
    (state) => state.constructorSlice.ingredients
  );
  const ingredientData = ingredients.find(
    (element) => element._id == ingredientId
  );
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
