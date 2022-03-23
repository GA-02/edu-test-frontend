import React from 'react';
import config from '../../Config.json';
import './style.css';


function ConfirmEmail(idUser, key) {
    let dataRequest = new FormData();
    dataRequest.append('idUser', idUser);
    dataRequest.append('key', key);

    fetch(config.backHost + 'users/ConfirmRegister.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error']) {
                if (document.querySelector('.page__profile .result').innerText == '')
                    document.querySelector('.page__profile .result').innerText = 'При подтверждении почты возникла ошибка. Попробуйте выполнить подтверждение еще раз или обратитесь к администрации сайта.';
                return;
            }
            document.querySelector('.page__profile .result').innerText = response['result'];
            setTimeout(() => {
                document.location.href = config.frontHost;
            }, 5000);
        })
        .catch(error => console.log(error))
}
function PageConfirmRegister() {
    document.title = 'Профиль';
    ConfirmEmail((new URLSearchParams(window.location.search)).get('id'), (new URLSearchParams(window.location.search)).get('key'));
    return (
        <div className='page__confirm-email'>
            <div className="site__content">
                <p className="result"></p>

            </div>
        </div >
    )
}

export default PageConfirmRegister