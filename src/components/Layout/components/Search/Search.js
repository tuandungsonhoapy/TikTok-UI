import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import * as request from '~/services/apiServices/searchService';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';
import PopperWrapper from '~/components/Popper';
import useDebounce from '~/components/Hooks/useDebounce';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    let refInput = useRef();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await request.search(debounced, 'less');
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleClickClear = () => {
        setSearchValue('');
        setSearchResult([]);
        refInput.current.focus();
    };

    const handleClickOutside = () => {
        setShowResult(false);
    };

    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div>
            <Tippy
                interactive
                visible={showResult && searchResult.length > 0}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((item) => {
                                return <AccountItem key={item.id} data={item} />;
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleClickOutside}
            >
                <div className={cx('search')}>
                    <input
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChangeInput}
                        value={searchValue}
                        ref={refInput}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClickClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />}

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
