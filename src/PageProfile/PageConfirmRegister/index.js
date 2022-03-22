import React from 'react';
import config from '../../Config.json';
import './style.css';


function ChangePassword(event, oldPassword, newPassword, confirmNewPassword) {
    event.preventDefault();

    if (newPassword != confirmNewPassword) {
        alert('Пароли не совпадают');
        return;
    }
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('oldPassword', oldPassword);
    dataRequest.append('newPassword', newPassword);

    fetch(config.backHost + 'users/ChangePassword.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error']) {
                document.querySelector('.password__edit>.error').style.display = 'flex';
                document.querySelector('.password__edit>.error>p').innerText = response['error'];
                return;
            }
            localStorage.clear();
            document.location.href = config.frontHost;
        })
        .catch(error => console.log(error))
}
function PageConfirmRegister() {
    document.title = 'Профиль';
    return (
        <div className='page__profile'>
            <div className="site__content">
            <p className="title">Регистрация завершена</p>
            {(new URLSearchParams(window.location.search)).get('id')}
            {(new URLSearchParams(window.location.search)).get('key')}
            </div>
        </div >
    )
}

export default PageConfirmRegister