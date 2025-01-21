import ingredientStyle from './ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredientTypes} from '../../../helpers';
import {FC} from 'react'

interface IIngredientProps {
    item: IIngredientTypes
    onClick: (item: IIngredientTypes) => void
}

export const Ingredient: FC<IIngredientProps> = ({ item, onClick }) => {

    const onIngredientClick = () => {
        onClick(item)
    }

    const oneOrZero = (Math.random() >= 0.5) ? 1 : 0;

    return (
        <div className={ingredientStyle.wrapper} key={item._id} onClick={onIngredientClick}>
            {oneOrZero > 0 &&
                <Counter count={oneOrZero} size="default" />}
            <img className={"mb-2"} src={item.image} alt={item.name}></img>
            <div className={ingredientStyle.price__wrapper + " mb-2"}>
              <span className={ingredientStyle.price + " text text_type_digits-default" } >
                {item.price}
              </span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={ ingredientStyle.title + " text text_type_main-default"}>
                {item.name}
            </p>
        </div>
    )
}
