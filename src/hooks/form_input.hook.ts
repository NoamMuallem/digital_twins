import { useState } from "react";

const useFormInput = (
    initialValue: string | number | boolean,
    label: string
) => {
    const [value, setValue] = useState<string | number | boolean>(
        initialValue
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return {
        value: value,
        onChange: handleChange,
        label,
        setValue,
    };
};

export default useFormInput;
