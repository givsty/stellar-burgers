import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { useSelector } from '../../services/store';


export const IngredientDetails: FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();

  const ingredientData = useSelector(state => state.constructor.ingredients).filter(
    (elemet) => elemet._id == ingredientId
  )[0];
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
