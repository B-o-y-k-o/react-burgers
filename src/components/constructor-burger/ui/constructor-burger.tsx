import {FC, useMemo, SyntheticEvent} from 'react';

import constructorStyle from './constructor-burger.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientTypes } from '../../../helpers';

interface IConstructorBurgerProps {
    ingredients: IIngredientTypes[]
    onClick: (() => void) | ((e: SyntheticEvent<Element, Event>) => void)
}

export const ConstructorBurger: FC<IConstructorBurgerProps> = ({ ingredients, onClick }) => {

    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);

    const lonelyBun = buns[0];

    const otherIngredients = [mains[1], mains[0], mains[3], mains[5], mains[6], sauces[0]];

    return (
        <section className={constructorStyle.wrapper + " pr-5 pl-5"}>
            <div className={"pl-4 pr-8 pt-25"}>
                <div className={"pl-8 pt-4 pb-4"}>
                    {lonelyBun && (<ConstructorElement type="top"
                                                       isLocked={true}
                                                       text={lonelyBun.name + " (верх)"}
                                                       price={lonelyBun.price}
                                                       thumbnail={lonelyBun.image} />
                    )}
                </div>
                <div className={constructorStyle.items__wrapper}>
                    <ul className={constructorStyle.list + " pr-4 "}>
                        {otherIngredients.length > 0 && otherIngredients.map((item) => (
                            <li className={constructorStyle.item} key={item._id}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={item.name}
                                                    price={item.price}
                                                    thumbnail={item.image} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={"pl-8 pt-4 pb-4"}>
                    {lonelyBun && (<ConstructorElement type="bottom"
                                                       isLocked={true}
                                                       text={lonelyBun.name + " (низ)"}
                                                       price={lonelyBun.price}
                                                       thumbnail={lonelyBun.image} />
                    )}
                </div>
                <div className={constructorStyle.order + " pt-10 pb-10"}>
                    <p className="text text_type_digits-medium pr-1">800</p>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4" onClick={onClick}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}