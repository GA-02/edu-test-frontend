import React from 'react';
import siteLogo from './image/logo.png';

import './style.css';

class Header extends React.Component {

    render() {

        return (
            <header>
                <div className="site__content">
                    <div className='site__logo'><img src={siteLogo} /></div>
                    <ul className='menu' type="none">
                        <li className="menu__item"><a href='/'>Главная</a></li>
                        <li className="menu__item"><a href='/lectures'>Лекции</a></li>
                        <li className="menu__item"><a href='/tests'>Тесты</a></li>
                        <li className="menu__item">Войти</li>
                        <li className="menu__item">Зарегистрироваться</li>
                    </ul>
                </div>
            </header >
        )
    }
}

export default Header