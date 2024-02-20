import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.18169-1/25446468_736227479899200_3796786047423554044_n.jpg?stp=dst-jpg_p320x320&_nc_cat=105&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeGR5dA3nVLbR1sbsdhjXjtU3r_7pHAn2kfev_ukcCfaR34wBhukm6SnOb7_ozp3H4LYChDHhntauRH9HbXE-6Yc&_nc_ohc=cFW3eX_znZMAX9rNvtR&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCJNcIsdRvlTU36V6D7blOUOppN7laeyfREHWS2V71rdg&oe=65F870E8"
                alt="Hoaa"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
