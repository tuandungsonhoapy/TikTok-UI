import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import PopperWrapper from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from '~/components/MenuItem';
import Header from './Header';
import { useMemo, useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, MENU, hideOnClick = false, onChange }) {
    const [history, setHistory] = useState([{ data: MENU }]);

    const { menu, title } = useMemo(() => {
        const currentHistory = history[history.length - 1];
        return {
            menu: currentHistory.data,
            title: currentHistory.title,
        };
    }, [history]);

    const handleClickMenuItem = (item) => {
        if (item.children) {
            setHistory([...history, item.children]);
            console.log('>>> change menu:', [...history, item.children]);
        } else {
            onChange(item);
        }
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderMenuItems = () => {
        return (
            <ul className={cx('box_menu')}>
                {menu.map((item, index) => {
                    return <MenuItem item={item} key={index} onClick={handleClickMenuItem} />;
                })}
            </ul>
        );
    };
    return (
        <Tippy
            delay={[0, 400]}
            // visible
            offset={[12, 10]}
            interactive
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={cx('content')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {title && title.length > 0 && <Header title={title} onBack={handleBack} />}
                        <div className={cx('menu-body')}>{renderMenuItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
