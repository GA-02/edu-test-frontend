import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../Config.json';
import './style.css';

function GetItems(setItems, idUser) {
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    dataRequest.append('idUser', +idUser);
    fetch(config.backHost + 'users/AdminDataUser.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            setItems(response);
        })
}

function SaveLecture(idUser, userName, email, idRole) {
    let dataRequest = new FormData();
    dataRequest.append('idUser', +idUser);
    dataRequest.append('name', userName);
    dataRequest.append('email', email);
    dataRequest.append('idRole', idRole);
    dataRequest.append('emailAdmin', localStorage.getItem('email'));
    dataRequest.append('passwordAdmin', localStorage.getItem('password'));
    fetch(config.backHost + 'users/AdminSaveUser.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => { alert(response) })
}

function PageEditLab() {
    const idUser = useParams()['id'];
    const [user, setUser] = useState();
    useEffect(() => {
        document.title = "Редактирование лабораторной работы";
        GetItems(setUser, idUser);
    }, [])
    if (!user) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />)
    }
    return (
        <div className='page__user__edit'>
            <div className="site__content">
                <p>Имя пользователя: &#160;
                    <input type="text" id='user__name' defaultValue={user.name} />
                </p>
                <p>Почтовый адрес: &#160;
                    <input type="text" id='user__email' defaultValue={user.email} />
                </p>
                <p>Права доступа: &#160;
                    <select id='user__role' defaultValue={user.idRole} >
                        <option value="1">Администратор</option>
                        <option value="2">Пользователь</option>
                        <option value="3">Заблокирован</option>
                        <option value="4">Неподтверждённый</option>
                    </select>
                </p>
                <button className='save' onClick={() => {
                    SaveLecture(idUser, document.querySelector("#user__name").value, document.querySelector("#user__email").value, document.querySelector("#user__role").value)
                }}>Сохранить пользователя</button>

            </div>
        </div >
    )
}

export default PageEditLab