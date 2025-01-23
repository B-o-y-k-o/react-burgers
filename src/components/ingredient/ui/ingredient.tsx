import ingredientStyle from './ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredientTypes} from '../../../helpers';
import {FC, useEffect, useState} from 'react'

interface IIngredientProps {
    item: IIngredientTypes
    onClick: (item: IIngredientTypes) => void
    selectIngredients?: IIngredientTypes[]
}

export const Ingredient: FC<IIngredientProps> = ({ item, onClick, selectIngredients }) => {
    const [count, setCount] = useState<number>(0)

    const onIngredientClick = () => {
        onClick(item)
    }

    useEffect(() => {
        selectIngredients?.forEach((ingredient) => {
            if(ingredient._id === item._id) setCount((prev) => ++prev)
        })
    }, [selectIngredients])

    return (
        <div className={ingredientStyle.wrapper} key={item._id} onClick={onIngredientClick}>
            {count > 0 &&
                <Counter count={count} size="default" />}
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
