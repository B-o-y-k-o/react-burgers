import { useState, useCallback } from "react";

type UseModalType = (isOpen: boolean) => {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useModal: UseModalType = ({ isOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal
    };
};