import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import './style.css';

function GetItems(setItems) {
    fetch('http://edu-testback-end.com/labs/AdminGetAllLabs.php', {
        method: "GET",
    })
        .then(response => response.json())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            setItems(response);
        })
}

function AddItem() {
    fetch('http://edu-testback-end.com/labs/AdminAddLab.php', {
        method: "GET",
    })
        .then(response => response.text())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            document.location.href = '/admin/lab/' + response;
        })
}

function DeleteItems(idItem, setItems) {
    let isConfirm = window.confirm("Вы уверены, что хотите удалить данную лабораторную работу (id = " + idItem + ")");
    if (!isConfirm){
        return;
    }
    let dataRequest = new FormData();
    dataRequest.append('idLab', +idItem);
    fetch('http://edu-testback-end.com/labs/AdminDeleteLab.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            alert(response);
            GetItems(setItems);
        })
}

function PageAdminLabs() {
    const [labs, setLabs] = useState(null);
    useEffect(() => {
        document.title = "Управление лабораторными работами";
        GetItems(setLabs);
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
                accessor: 'idLab',
            },
            {
                Header: 'Номер работы',
                accessor: 'numberLab',
            },
            {
                Header: 'Тема',
                accessor: 'theme',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ row }) => {
                    switch (row.original.status) {
                        case 'Черновик':
                            return <div className='status'>
                                <div className="circle red" />
                                Черновик
                            </div>;
                        case 'Опубликована':
                            return <div className='status'>
                                <div className="circle green" />
                                Опубликована
                            </div>;
                        default:
                            return "Ошибка";

                    }
                },
            },
            {
                Header: 'Действия',
                Cell: ({ row }) => {
                    return (<>
                        <a href={"/admin/lab/" + row.original.idLab} className="go"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg></a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => {DeleteItems(row.original.idLab, setLabs) }} viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </>

                    )
                },
                disableSortBy: true
            },
        ],
        []
    )
    if (!labs) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />);
    }
    return (
        <div className="page__admin__labs" >
            <div className="site__content">
                <Table columns={columns} data={labs} />
                <button onClick={AddItem} className='add'>+ Добавить лабораторную работу</button>
            </div>
        </div>
    )
}


export default PageAdminLabs