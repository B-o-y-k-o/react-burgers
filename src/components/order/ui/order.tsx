import orderStyle from './order.module.css';
import okImage from '../../../images/order-ok.svg';

export const Order = () => {
    return (
        <div className={orderStyle.wrapper + " mt-30"}>
            <h2 className={orderStyle.number__wrapper + ' text text_type_digits-large mb-8'}>034536</h2>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <img src={okImage} alt='Ваш заказ начали готовить' />
            <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}