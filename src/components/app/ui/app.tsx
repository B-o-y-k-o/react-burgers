import { useState, useEffect } from 'react';
import appStyle from './app.module.css';
import {AppHeader} from '../../app-header';
import {IngredientsBurger} from '../../ingredients-burger'
import {ConstructorBurger} from '../../constructor-burger/ui/constructor-burger.tsx'
import {Modal} from '../../modal'
import {DetailsIngredient} from '../../details-ingredient'
import {Order} from '../../order'

import { getIngredientsData, IIngredientTypes } from "../../../helpers";
import {useModal} from '../../../hooks'


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
            .catch(err => {
                console.error(err);
            });
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
                        <IngredientsBurger
                            ingredients={ingredients}
                            onIngredientClick={handlerOpenIngredientModal}
                            selectIngredients={selectIngredients}
                        />
                        <ConstructorBurger
                            selectIngredients={selectIngredients}
                            onClick={openOrderModal}
                            setSelectedIngredients={setSelectIngredients}
                        />
                        {isIngredientDetailsModalOpen &&
                            <Modal onClose={closeIngredientModal} header={"Детали ингредиента"}>
                                <DetailsIngredient item={currentIngredient}/>
                            </Modal>}
                        {isOrderDetailsModalOpen &&
                            <Modal onClose={closeOrderModel} >
                                <Order />
                            </Modal>
                        }
                    </div>
                </main>
            }
        </div>
    );
}