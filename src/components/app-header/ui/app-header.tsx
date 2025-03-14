import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css'

export function AppHeader() {
    return (
        <header className={headerStyle.header + " pb-4 pt-4"}>
            <div className={headerStyle.wrapper}>
                <div className={headerStyle.nav__wrapper}>
                    <nav className={headerStyle.nav}>
                        <a className={headerStyle.item + " pl-5 pr-5 pb-4 pt-4"}>
                            <BurgerIcon type={"primary"} />
                            <p className="text text_type_main-default ml-2">Конструктор</p>
                        </a>
                        <a className={headerStyle.item + " pl-5 pr-5 pb-4 pt-4"}>
                            <ListIcon type={"secondary"} />
                            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                        </a>
                    </nav>
                </div>
                <Logo />
                <div className={headerStyle.profile__wrapper}>
                    <ProfileIcon type={"secondary"} />
                    <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                </div>
            </div>
        </header>
    );
}