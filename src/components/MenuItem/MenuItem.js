import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ item, onClick }) {
    const classes = cx('menu-item', 'menu-item-link');
    let Component = Link;
    if (!item.to) {
        Component = 'button';
    }
    return (
        <li className={cx('itemWrapper')} onClick={() => onClick(item)}>
            <Component className={classes} to={item.to}>
                {item.icon && <img className={cx('menu-item-img')} src={item.icon} alt="icon" />}
                <span className={cx('menu-item-title')}>{item.title}</span>
            </Component>
        </li>
    );
}

export default MenuItem;
