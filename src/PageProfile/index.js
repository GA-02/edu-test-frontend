import React from 'react';
import './style.css';

class PageMain extends React.Component {


    render() {
        document.title='Профиль';
        let userData = {
            'userName': 'Admin',
            'mail' : 'admin@mail.ru',
            'levelAccess': 999,
            'passTests':[
                {'idResult' : 15, 'name': 'Основы', 'date': new Date('12.12.12'), 'resultScore': 7, 'maxScore' : 10},
                {'idResult' : 20, 'name': 'Классы', 'date': new Date('15.12.12'), 'resultScore': 11, 'maxScore' : 16},
                {'idResult' : 26, 'name': 'Структуры', 'date': new Date('18.12.12'), 'resultScore': 3, 'maxScore' : 20}
            ]

        }
        return (
            <div className='page__profile'>
                <div className="site__content">
                <div className="account__info">
                    <div className="data__title">Имя пользователя</div>
                    <div className="data__text">{userData.userName}</div>
                    <div className="data__title">Почтовый адрес</div>
                    <div className="data__text">{userData.mail}</div>
                    <div className="data__title"></div>
                    <div className="data__text"></div>
                </div>
                <div className="account__control">
                    <button>Поменять пароль</button>
                    <button>Поменять почту</button>

                    {userData.levelAccess > 10 ? <a href='/admin'><button>Перейти в админ-панель</button></a> : <></>}

                </div>
                <div className="password__edit"></div>
                </div>
            </div>
        )
    }
}

export default PageMain