import React from 'react';
import ReactDOM from 'react-dom';
import siteLogo from './image/logo.png';
import config from '../Config.json';
import './style.css';

class Header extends React.Component {
    state = {
        userName: localStorage.getItem('userName'),
    };
    OpenSignInPopUp() {
        document.querySelector('#header__sign-in__pop-up').style.display = 'flex';
        document.querySelector('body').style.overflow = 'hidden';
        setTimeout(() => {
            document.querySelector('#header__sign-in__pop-up').classList.add('header__pop-up_active');
        }, 0);
    }
    CloseSignInPopUp() {
        document.querySelector('#header__sign-in__pop-up').classList.remove('header__pop-up_active');
        setTimeout(() => {
            document.querySelector('#header__sign-in__pop-up').style.display = 'none';
            document.querySelector('body').style.overflow = 'auto';
        }, 400);

    }
    OpenRegisterPopUp() {
        document.querySelector('#header__register__pop-up').style.display = 'flex';
        document.querySelector('body').style.overflow = 'hidden';
        setTimeout(() => {
            document.querySelector('#header__register__pop-up').classList.add('header__pop-up_active');
        }, 0);

    }
    CloseRegisterPopUp() {
        document.querySelector('#header__register__pop-up').classList.remove('header__pop-up_active');
        setTimeout(() => {
            document.querySelector('#header__register__pop-up').style.display = 'none';
            document.querySelector('body').style.overflow = 'auto';
        }, 400);

    }
    SubmitSignIn = (event) => {
        event.preventDefault();
        let dataMethod = new FormData();
        dataMethod.append('email', document.querySelector("#header__sign-in__pop-up__email").value);
        dataMethod.append('password', document.querySelector("#header__sign-in__pop-up__password").value);
        fetch(config.backHost + 'users/SignInUser.php', {
            method: "POST",
            body: dataMethod
        })
            .then(response => response.json())
            .then(response => {
                if (response['error']) {
                    document.querySelector('#header__sign-in__pop-up .error').style.display = 'flex';
                    document.querySelector('#header__sign-in__pop-up .error>p').innerText = response['error'];
                    return;
                }
                localStorage.clear();
                document.location.reload();

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

    SubmitRegister(event) {
        event.preventDefault();

        if (document.querySelector("#header__register__pop-up__password").value != document.querySelector("#header__register__pop-up__password-confirm").value) {
            document.querySelector('#header__register__pop-up .error').style.display = 'flex';
            document.querySelector('#header__register__pop-up .error>p').innerText = '???????????? ???? ??????????????????';
            return;
        }
        let dataMethod = new FormData();
        dataMethod.append('name', document.querySelector("#header__register__pop-up__name").value);
        dataMethod.append('email', document.querySelector("#header__register__pop-up__email").value);
        dataMethod.append('password', document.querySelector("#header__register__pop-up__password").value);
        dataMethod.append('frontHost', config.frontHost);
        fetch(config.backHost + 'users/RegisterUser.php', {
            method: "POST",
            body: dataMethod
        })
            .then(response => response.json())
            .then(response => {
                if (response['error']) {
                    document.querySelector('#header__register__pop-up .error').style.display = 'flex';
                    document.querySelector('#header__register__pop-up .error>p').innerText = response['error'];
                    return;
                }
                ReactDOM.render(
                    <>
                        <svg className='close' onClick={() => {
                            document.querySelector('#header__register__pop-up').classList.remove('header__pop-up_active');
                            setTimeout(() => {
                                document.querySelector('#header__register__pop-up').style.display = 'none';
                            }, 400);
                        }}>
                            <line x1="0" y1="10" x2="10" y2="0" />
                            <line x1="0" y1="0" x2="10" y2="10" />
                        </svg>
                        <div className="success"><mark>?????????????? ?????????????? ????????????</mark><br /> ?????? ???????????????????? ?????????????????????? ???? ?????????????????? ???????????????? ?????????? ???????? ???????????????????? ???????????? ?? ????????????????????????????</div>
                    </>, document.querySelector('#header__register__pop-up>form'));
            })
            .catch(error => console.log(error))
    }


    ClickBurgerMenu() {
        document.querySelector('header .menu__burger').classList.toggle('active');
        document.querySelector('header .menu').classList.toggle('active');
    }

    render() {
        return (
            <>
                <header>
                    <div className="site__content">
                        <a href={config.frontHost + ''}><div className='site__logo'><img src={siteLogo} /></div></a>
                        <div className="menu__burger" onClick={this.ClickBurgerMenu}><span></span></div>
                        <ul className='menu' type="none">
                            <li className="menu__item"><a href={config.frontHost + 'lectures'}>????????????</a></li>
                            <li className="menu__item"><a href={config.frontHost + 'tests'}>??????????</a></li>
                            <li className="menu__item"><a href={config.frontHost + 'labs'}>???????????????????????? <br /> ????????????</a></li>
                            {
                                this.state.userName ? <>
                                    <li className="menu__item"><a href={config.frontHost + 'profile'}><mark>{this.state.userName}</mark></a></li>
                                </> : <>
                                    <li className="menu__item" onClick={this.OpenSignInPopUp}>??????????</li>
                                    <li className="menu__item menu__item__profile__register" onClick={this.OpenRegisterPopUp}>????????????????????????????????????</li>
                                </>
                            }

                        </ul>
                    </div>
                </header >
                <div className="header__pop-up" id='header__sign-in__pop-up' style={{ display: 'none' }}>
                    <form className="window" onSubmit={this.SubmitSignIn}>
                        <svg className='close' onClick={this.CloseSignInPopUp}>
                            <line x1="0" y1="10" x2="10" y2="0" />
                            <line x1="0" y1="0" x2="10" y2="10" />
                        </svg>
                        <div className="title">???????? ?? ??????????????</div>
                        <input type='email' id='header__sign-in__pop-up__email' required className="data__input" placeholder='???????????????? ??????????' />
                        <input type='password' id='header__sign-in__pop-up__password' required minLength='5' maxLength='25' className="data__input" placeholder='????????????' />
                        <div className="error" style={{ display: 'none' }}>
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            <p>????????????</p>
                        </div>
                        <input type='submit' value='??????????' />
                        <a href={config.frontHost + "profile/recover"} className="recover">???????????? ?????????????</a>
                    </form>
                </div>
                <div className="header__pop-up" id='header__register__pop-up' style={{ display: 'none' }}>
                    <form className="window" onSubmit={this.SubmitRegister}>
                        <svg className='close' onClick={this.CloseRegisterPopUp}>
                            <line x1="0" y1="10" x2="10" y2="0" />
                            <line x1="0" y1="0" x2="10" y2="10" />
                        </svg>
                        <div className="title">?????????????????????? ????????????????</div>
                        <input type='text' required className="data__input" id='header__register__pop-up__name' placeholder='?????? ????????????????????????' />
                        <input type='email' required className="data__input" id='header__register__pop-up__email' placeholder='???????????????? ??????????' />
                        <input type='password' required minLength='5' maxLength='25' id='header__register__pop-up__password' className="data__input" placeholder='????????????' />
                        <input type='password' required minLength='5' maxLength='25' id='header__register__pop-up__password-confirm' className="data__input" placeholder='?????????????????????? ????????????' />
                        <div className="error" style={{ display: 'none' }}>
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            <p>???????????? ????????????????????????</p>
                        </div>
                        <input type='submit' value='????????????????????????????????' />
                    </form>
                </div>
            </>
        )
    }
}

export default Header