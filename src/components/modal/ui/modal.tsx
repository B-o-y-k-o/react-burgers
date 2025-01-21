import {FC, ReactNode, useEffect} from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Overlay} from "../../overlay";
import modalStyle from './modal.module.css';

const rootModal = document.getElementById("modal-root");

interface IModalProps {
    children: ReactNode
    onClose: () => void
    header?: string
}

export const Modal: FC<IModalProps> = ({ children, onClose, header }) => {
    useEffect(() => {
        const close = (e: any) => {
            e.key === "Escape" && onClose()
        }
        window.addEventListener('keydown', close)
        return () => {
            window.removeEventListener('keydown', close)
        }
    },[]);

    // if(!rootModal) return;

    return createPortal(
        (<>
            <div className={modalStyle.wrapper} >
                {header &&
                    <div className={modalStyle.header__wrapper + " mt-10 ml-10 mr-10"} >
                        <h3 className='text text_type_main-large'>{header}</h3>
                    </div>}
                <button className={modalStyle.close__button + " mt-15 mr-10"} onClick={onClose}>
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
            <Overlay onClose={onClose} />
        </>),
        rootModal!
    );
}