interface InputProps {
    name: string;
    label: string;
    type?: string;
    row?: number;
    placeholder?: string;
    rules?: any;
    textArea?: boolean;
    className?: string;
    formClassName?: string;
    labelClassName?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
}
