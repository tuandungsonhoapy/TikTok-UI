import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    console.log('re-render useDebounce');
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const Id = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(Id);
        };
    }, [value]);
    return debounceValue;
}

export default useDebounce;
