import React from 'react';
import './style.css';

class PageMain extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: null
        }
        document.title = 'Профиль';
    }

    componentDidMount() {
        let dataRequest = new FormData();
        dataRequest.append('email', localStorage.getItem('email'));
        dataRequest.append('password', localStorage.getItem('password'));
        fetch('http://edu-testback-end.com/users/GetUserData.php', {
            method: "POST",
            body: dataRequest
        })
            .then(response => response.json())
            .then(response => {
                this.setState(() => {
                    return {
                        userData: response
                    }
                });

            })
            .catch(error => console.log(error))
    }

    LogOutFromAccount() {
        localStorage.clear();
        document.location.href = '/';
    }

    ChangePassword(event, oldPassword, newPassword, confirmNewPassword) {
        event.preventDefault();

        if(newPassword != confirmNewPassword){
            alert('Пароли не совпадают');
            return;
        }
        let dataRequest = new FormData();
        dataRequest.append('email', localStorage.getItem('email'));
        dataRequest.append('oldPassword', oldPassword);
        dataRequest.append('newPassword', newPassword);

        fetch('http://edu-testback-end.com/users/ChangePassword.php', {
            method: "POST",
            body: dataRequest
        })
            .then(response => response.json())
            .then(response => {
                if (response['error']) {
                    console.log(response['error']);
                    return;
                }
                
            })
            .catch(error => console.log(error))
    }

    render() {
        if (!this.state.userData){
            return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />)
        }
        return (
            <div className='page__profile'>
                <div className="site__content">
                    <div className="account__info">
                        <p className="title">Профиль</p>
                        <table>
                            <tr>
                                <th>Номер аккаунта</th>
                                <td>{this.state.userData.idUser}</td>
                            </tr>
                            <tr>
                                <th>Имя пользователя</th>
                                <td>{this.state.userData.userName}</td>
                            </tr>
                            <tr>
                                <th>Почтовый адрес</th>
                                <td>{this.state.userData.email}</td>
                            </tr>
                            <tr>
                                <th>Права доступа</th>
                                <td>{this.state.userData.nameRole}</td>
                            </tr>
                            <div className="data__title"></div>
                        </table>
                        <button onClick={this.LogOutFromAccount}>Выйти</button>
                    </div>
                    <div className="account__control">
                        <form className="password__edit" onSubmit={event=>{this.ChangePassword(event)}}>
                            <p className="title">Поменять пароль</p>
                            <input type="password" required minLength='5' placeholder='Старый пароль' />
                            <input type="password" required minLength='5' placeholder='Новый пароль' />
                            <input type="password" required minLength='5' placeholder='Подтвердите пароль' />
                            <input type="submit" value="Подтвердить" />
                        </form>
                        {this.state.userData.idRole == 1 ? <a href='/admin' className='control__button'>Перейти в админ-панель<div className='arrow' /></a> : <></>}
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
                            {this.state.userData.results.map((item, index) =>
                                <tr className='result' key={index}>
                                    <td>{item.testName}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
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