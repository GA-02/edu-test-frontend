import React from 'react';
import config from '../../Config.json';
import './style.css';


function SendPassword(email) {
    let dataRequest = new FormData();
    dataRequest.append('email', email);
    fetch(config.backHost + 'users/RecoverPassword.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error']) {
                console.log(response['error']);
                return;
            }
            document.querySelector('.page__recover .site__content').innerHTML = '<p class="title">Письмо успешно отправлено</p>'
        })
        .catch(error => console.log(error))
}

function PageRecoverPassword() {
    document.title = 'Восстановление пароля';

    return (
        <div className='page__recover'>
            <div className="site__content">
                <p className="title">Введите адрес электронной почты</p>
                <p className="text">Пожалуйста, введите адрес электронной почты, на который зарегистрирован аккаунт</p>
                <form action="" onSubmit={event => { event.preventDefault(); SendPassword(document.querySelector('#recover__email').value) }}>
                    <input type="text" id="recover__email" required placeholder='Адрес электронной почты' />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        </div >
    )
}

export default PageRecoverPassword