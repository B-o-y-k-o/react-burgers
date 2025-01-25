import { useState, useEffect } from 'react';
import appStyle from './app.module.css';
import {AppHeader} from '../../app-header';
import {BurgerConstructor} from '../../constructor-burger/ui/constructor-burger.tsx'
import {Modal} from '../../modal'

import { getIngredientsData, IIngredientTypes } from "../../../helpers";
import {useModal} from '../../../hooks'
import {BurgerIngredients} from '../../ingredients-burger/ui/ingredients-burger.tsx'
import {IngredientsDetails} from '../../details-ingredient/ui/details-ingredient.tsx'
import {OrderDetails} from '../../order/ui/order.tsx'

export function App() {
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState<IIngredientTypes | undefined>();
    const [selectIngredients, setSelectIngredients] = useState<IIngredientTypes[]>([]);

    const {
        isModalOpen: isIngredientDetailsModalOpen,
        openModal: openIngredientModal,
        closeModal: closeIngredientModal
    } = useModal(false);

    const {
        isModalOpen: isOrderDetailsModalOpen,
        openModal: openOrderModal,
        closeModal: closeOrderModel
    } = useModal(false);

    useEffect(() => {
        getIngredientsData()
            .then(res => {
                setIngredients(res.data)
            })
            .catch(console.error);
    }, []);

    const handlerOpenIngredientModal = (item: IIngredientTypes) => {
        setCurrentIngredient(item)
        if(item.type === 'bun') {
            setSelectIngredients(prev => prev.filter((item) => item.type !== "bun"))
        }
        setSelectIngredients(prev => [...prev, item])
        openIngredientModal();
    }

    return (
        <div>
            <AppHeader />
            {ingredients.length > 0 &&
                <main className={appStyle.main}>
                    <div className={appStyle.wrapper}>
                        <BurgerIngredients
                            ingredients={ingredients}
                            onIngredientClick={handlerOpenIngredientModal}
                            selectIngredients={selectIngredients}
                        />
                        <BurgerConstructor
                            selectIngredients={selectIngredients}
                            onClick={openOrderModal}
                            setSelectedIngredients={setSelectIngredients}
                        />
                        {isIngredientDetailsModalOpen &&
                            <Modal onClose={closeIngredientModal} header={"Детали ингредиента"}>
                                <IngredientsDetails item={currentIngredient}/>
                            </Modal>}
                        {isOrderDetailsModalOpen &&
                            <Modal onClose={closeOrderModel} >
                                <OrderDetails />
                            </Modal>
                        }
                    </div>
                </main>
            }
        </div>
    );
}