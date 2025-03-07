import ingredientStyle from './ingredient.module.css'
import {Counter, CurrencyIcon, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredientTypes} from '../../../helpers';
import {FC} from 'react'

interface IIngredientProps {
    item: IIngredientTypes
    onClick: (item: IIngredientTypes) => void
    onInfoClick: (item: IIngredientTypes) => void
    count: number
}

export const Ingredient: FC<IIngredientProps> = ({ item, onClick, count, onInfoClick }) => {

    const onIngredientClick = () => {
        onClick(item)
    }
//@ts-ignore
    const onHandleClickInfo = (e) => {
        e.stopPropagation()
        onInfoClick(item)
    }

    return (
        <div className={ingredientStyle.wrapper} key={item._id} onClick={onIngredientClick}>
            {count > 0 &&
                <Counter count={count} size="default" />}
            <div
                className={ingredientStyle.info__wrapper}
                onClick={(e) => onHandleClickInfo(e)}
            >
                <InfoIcon type={'primary'} />
            </div>
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
