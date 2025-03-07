import overlayStyle from './overlay.module.css';
import {FC} from 'react'

interface IOverlayProps {
    onClose: () => void;
}

export const Overlay: FC<IOverlayProps> = ({ onClose }) => {

    return (
        <div className={overlayStyle.background} onClick={onClose}></div>
    )
}

