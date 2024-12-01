import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface FaqsTextAreaProps {
    name: string;
}

const FaqsTextArea: FC<FaqsTextAreaProps> = ({ name }) => {
    const { register, control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    });

    const handleAddField = () => {
        append({ question: '', answer: '' });
    };

    const handleRemoveField = (index: any) => {
        remove(index);
    };

    const handleKeyDown = (event: any, index: number) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddField();
        } else if (event.key === 'Backspace' && event.target.value === '' && fields.length > 1) {
            event.preventDefault();
            handleRemoveField(index);
        }
    };

    return (
        <div className='border-[1px] border-gray-200 rounded-sm p-2 mt-3'>
            {fields.map((field, index) => (
                <div key={field.id} className='mb-3'>
                    <div className='flex items-center gap-2'>
                        <p className=''>Q.</p>
                        <input
                            {...register(`qaPairs.${index}.question`)}
                            placeholder='Question'
                            className='w-full border-none focus:outline-none mb-[2px]'
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <p>A.</p>
                        <input
                            {...register(`qaPairs.${index}.answer`)}
                            placeholder='Answer'
                            className='w-full border-none focus:outline-none text-black/50'
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FaqsTextArea;
