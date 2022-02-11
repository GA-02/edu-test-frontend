import React from 'react';
import siteLogo from './image/logo.png';

import './style.css';

class Header extends React.Component {
    state = {
        userName: localStorage.getItem('userName'),
    };
    OpenSignInPopUp() {
        document.querySelector('#header__sign-in__pop-up').classList.add('header__pop-up_active');
    }
    CloseSignInPopUp() {
        document.querySelector('#header__sign-in__pop-up').classList.remove('header__pop-up_active');
    }
    OpenRegisterPopUp() {
        document.querySelector('#header__register__pop-up').classList.add('header__pop-up_active');
    }
    CloseRegisterPopUp() {
        document.querySelector('#header__register__pop-up').classList.remove('header__pop-up_active');
    }
    SubmitSignIn = (event) => {
        event.preventDefault();
        let dataMethod = new FormData();
        dataMethod.append('email', document.querySelector("#header__sign-in__pop-up__email").value);
        dataMethod.append('password', document.querySelector("#header__sign-in__pop-up__password").value);
        fetch('http://edu-testback-end.com/users/SignInUser.php', {
            method: "POST",
            body: dataMethod
        })
            .then(response => response.json())
            .then(response => {
                if (response['error']) {
                    console.log(response['error']);
                    return;
                }
                localStorage.setItem('userName', response['name']);
                localStorage.setItem('email', response['email']);
                localStorage.setItem('password', document.querySelector("#header__sign-in__pop-up__password").value);
                document.querySelector('#header__sign-in__pop-up').classList.remove('header__pop-up_active');
                this.setState({
                    userName: response['name']
                });
            })
            .catch(error => console.log(error))



    }
    SubmitRegister() {

    }

    render() {
        return (
            <>
                <header>
                    <div className="site__content">
                        <a href="/"><div className='site__logo'><img src={siteLogo} /></div></a>
                        <ul className='menu' type="none">
                            <li className="menu__item"><a href='/'>Главная</a></li>
                            <li className="menu__item"><a href='/lectures'>Лекции</a></li>
                            <li className="menu__item"><a href='/tests'>Тесты</a></li>
                            {
                                this.state.userName ? <>
                                    <li className="menu__item"><a href='/profile'><mark>{this.state.userName}</mark></a></li>
                                </> : <>
                                    <li className="menu__item" onClick={this.OpenSignInPopUp}>Войти</li>
                                    <li className="menu__item menu__item__profile__register" onClick={this.OpenRegisterPopUp}>Зарегистрироваться</li>
                                </>
                            }

                        </ul>
                    </div>
                </header >
                <div className="header__pop-up" id='header__sign-in__pop-up'>
                    <form className="window" onSubmit={this.SubmitSignIn}>
                        <svg onClick={this.CloseSignInPopUp}>
                            <line x1="0" y1="10" x2="10" y2="0" />
                            <line x1="0" y1="0" x2="10" y2="10" />
                        </svg>
                        <div className="title">Вход в аккаунт</div>
                        <input type='email' id='header__sign-in__pop-up__email' required className="data__input" placeholder='Почтовый адрес' />
                        <input type='password' id='header__sign-in__pop-up__password' required minLength='5' maxLength='25' className="data__input" placeholder='Пароль' />
                        <input type='submit' value='Войти' />
                    </form>
                </div>
                <div className="header__pop-up" id='header__register__pop-up'>
                    <form className="window">
                        <svg onClick={this.CloseRegisterPopUp}>
                            <line x1="0" y1="10" x2="10" y2="0" />
                            <line x1="0" y1="0" x2="10" y2="10" />
                        </svg>
                        <div className="title">Регистрация аккаунта</div>
                        <input type='text' required className="data__input" placeholder='Имя пользователя' />
                        <input type='email' required className="data__input" placeholder='Почтовый адрес' />
                        <input type='password' required minLength='5' maxLength='25' className="data__input" placeholder='Пароль' />
                        <input type='password' required minLength='5' maxLength='25' className="data__input" placeholder='Подтвердите пароль' />
                        <input type='submit' value='Зарегистрировать' />
                    </form>
                </div>
            </>
        )
    }
}

export default Header