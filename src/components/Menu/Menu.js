import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import PopperWrapper from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from '~/components/MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Menu({ children, MENU, hideOnClick = false, onChange }) {
    const [history, setHistory] = useState([{ data: MENU }]);

    const getMenuAndTitle = () => {
        const currentHistory = history[history.length - 1];
        return {
            menu: currentHistory.data,
            title: currentHistory.title,
        };
    };

    const { menu, title } = getMenuAndTitle();

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

    const renderResult = (attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                {title && title.length > 0 && <Header title={title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderMenuItems()}</div>
            </PopperWrapper>
        </div>
    );

    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            delay={[0, 400]}
            // visible
            offset={[12, 10]}
            interactive
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    MENU: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
