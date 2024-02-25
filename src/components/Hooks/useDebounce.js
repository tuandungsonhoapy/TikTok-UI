import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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

useDebounce.propTypes = {
    delay: PropTypes.number,
};

export default useDebounce;
