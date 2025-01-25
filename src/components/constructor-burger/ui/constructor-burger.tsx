import {FC, useMemo, SyntheticEvent, Dispatch, SetStateAction, useRef, useState, useEffect} from 'react';

import constructorStyle from './constructor-burger.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientTypes } from '../../../helpers';

interface IBurgerConstructorProps {
    selectIngredients: IIngredientTypes[]
    setSelectedIngredients: Dispatch<SetStateAction<IIngredientTypes[]>>
    onClick: (() => void) | ((e: SyntheticEvent<Element, Event>) => void)
}

export const BurgerConstructor: FC<IBurgerConstructorProps> = (props) => {
    const { selectIngredients, onClick, setSelectedIngredients } = props
    const [price, setPrice] = useState<number>(0)

    const refIngredient = useRef(null)

    useEffect(() => {
        const price = selectIngredients.reduce((result, item) => {
            return(
                item.type === 'bun'
                ? result + item?.price * 2
                : result + item?.price
            )
        }, 0)

        setPrice(price)
    }, [selectIngredients])

    const buns = useMemo(() => selectIngredients.filter(item => item.type === "bun"), [selectIngredients]);
    const mains = useMemo(() => selectIngredients.filter(item => item.type === "main"), [selectIngredients]);
    const sauces = useMemo(() => selectIngredients.filter(item => item.type === "sauce"), [selectIngredients]);

    const lonelyBun: IIngredientTypes | undefined = buns[0];

    const otherIngredients: IIngredientTypes[] | undefined = mains.concat(sauces);

    const removeIngredients = () => {
        const id: string | undefined = refIngredient?.current?.attributes?.dataid?.value
        setSelectedIngredients(selectIngredients.filter((item) => item._id !== id))
    }

    useEffect(() => {
        const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('constructor-element__row')
        if(!buns.length) {
            elements[0].style.display = 'none'
            elements[1].style.display = 'none'

        }else{
            elements[0].style.display = ''
            elements[1].style.display = ''
        }
    }, [buns.length]);

    return (
        <section className={constructorStyle.wrapper + " pr-5 pl-5"}  style={{width: '488px'}}>
            <div className={"pl-4 pr-8 pt-25"}>
                <div className={constructorStyle.container}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={lonelyBun?.name || " (верх)"}
                        price={lonelyBun?.price || 0}
                        thumbnail={lonelyBun?.image || ''}
                    />
                </div>
                {Boolean(otherIngredients.length) &&
                    <div className={constructorStyle.items__wrapper}>
                        <ul className={constructorStyle.list}>
                            {otherIngredients.map((item) => (
                                <li className={constructorStyle.item } key={item._id} ref={refIngredient} dataid={item._id}>
                                    <DragIcon type="primary"/>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        handleClose={removeIngredients}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <div className={constructorStyle.container}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={lonelyBun?.name || " (низ)"}
                        price={lonelyBun?.price || 0}
                        thumbnail={lonelyBun?.image || ''}
                    />
                </div>
                <div className={constructorStyle.order + " pt-10 pb-10"}>
                    <p className="text text_type_digits-medium pr-1">{price}</p>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4" onClick={onClick}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}