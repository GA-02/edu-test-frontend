import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import config from '../../../Config.json';
import './style.css';

function GetItems(setItems) {
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'users/AdminGetAllUsers.php', {
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

function PageAdminUsers() {
    const [results, setResults] = useState(null);
    useEffect(() => {
        document.title = "Управление пользователями";
        GetItems(setResults);
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Номер',
                accessor: 'stringNumber',
                disableSortBy: true
            },
            {
                Header: 'ID',
                accessor: 'idUser',
            },
            {
                Header: 'Имя пользователя',
                accessor: 'nameUser',
            },
            {
                Header: 'Почтовый адрес',
                accessor: 'email',
            },
            {
                Header: 'Права доступа',
                accessor: 'nameRole',
            },
            {
                Header: 'Действия',
                Cell: ({ row }) => {
                    return (<>
                        <a href={config.frontHost + "admin/user/" + row.original.idUser} className="go">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                        </a>
                    </>

                    )
                },
                disableSortBy: true
            },
        ],
        []
    )
    if (!results) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />);
    }
    return (
        <div className="page__admin__users" >
            <div className="site__content">
                <Table columns={columns} data={results} />
            </div>
        </div>
    )
}


export default PageAdminUsers