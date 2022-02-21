import React from 'react';
import './style.css';

class PageMain extends React.Component {

    LogOutFromAccount() {
        localStorage.clear();
        document.location.href = '/';
    }

    render() {
        document.title = 'Профиль';
        let userData = {
            'userName': 'Admin',
            'mail': 'admin@mail.ru',
            'levelAccess': 999,
            'passTests': [
                { 'idResult': 15, 'name': 'C# переменные, типы данных, структуры, операторы, перечисления, массивы', 'date': new Date('12.12.12'), 'resultScore': 7, 'maxScore': 10 },
                { 'idResult': 20, 'name': 'Типы данных, классы, структуры, коллекции', 'date': new Date('12.15.12'), 'resultScore': 11, 'maxScore': 16 },
                { 'idResult': 26, 'name': 'C# переменные, типы данных, операторы, коллекции, исключенияC# переменные, типы данных, операторы, коллекции, исключения', 'date': new Date('01.15.12'), 'resultScore': 3, 'maxScore': 20 }
            ]

        }
        return (
            <div className='page__profile'>
                <div className="site__content">
                    <div className="account__info">
                        <p className="title">Профиль</p>
                        <table>
                            <tr>
                                <th>Номер аккаунта</th>
                                <td>152</td>
                            </tr>
                            <tr>
                                <th>Имя пользователя</th>
                                <td>{userData.userName}</td>
                            </tr>
                            <tr>
                                <th>Почтовый адрес</th>
                                <td>{userData.mail}</td>
                            </tr>
                            <tr>
                                <th>Роль/Права доступа  </th>
                                <td>{userData.mail}</td>
                            </tr>
                            <div className="data__title"></div>
                        </table>
                        <button onClick={this.LogOutFromAccount}>Выйти</button>
                    </div>
                    <div className="account__control">
                        <form className="password__edit">
                            <p className="title">Поменять пароль</p>
                            <input type="password" placeholder='Старый пароль' />
                            <input type="password" placeholder='Новый пароль' />
                            <input type="password" placeholder='Подтвердите пароль' />
                            <input type="submit" value="Подтвердить" />
                        </form>
                        {userData.levelAccess > 10 ? <a href='/admin' className='control__button'>Перейти в админ-панель<div className='arrow' /></a> : <></>}
                    </div>
                    <div className="user__results">
                        <p className="title">Последние результаты</p> <button>Показать все</button>
                        <table>
                            <tr>
                                <th>Наименование</th>
                                <th>Дата</th>
                                <th>Время</th>
                                <th>Результат</th>
                                <th>Действия</th>
                            </tr>
                            {userData.passTests.map((item, index) =>
                                <tr className='result' key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.date.toLocaleDateString()}</td>
                                    <td>{item.date.toLocaleTimeString()}</td>
                                    <td>{item.resultScore} из {item.maxScore}</td>
                                    <td>
                                        <a href={"/result/" + item.idResult} title="Перейти">
                                            <svg class="arrow__next" viewBox="0 0 100 85">
                                                <polygon points="58.263,0.056 100,41.85 58.263,83.641 30.662,83.641 62.438,51.866 0,51.866 0,31.611 62.213,31.611 30.605,0 58.263,0.056" />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>)}
                        </table>
                    </div>
                </div>
            </div >
        )
    }
}

export default PageMain