interface ModalProps {
    isOpenModal?: boolean;
    setIsOpenModal?: (isOpen: boolean) => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

interface SheetDrawerProps {
    children: React.ReactNode;
    isOpen?: boolean;
    size?: number;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    lockBackgroundScroll?: boolean;
}
