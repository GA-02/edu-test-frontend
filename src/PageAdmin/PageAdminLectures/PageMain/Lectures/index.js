import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import config from '../../../../Config.json';
import './style.css';

function GetItems(setItems) {
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'lectures/AdminGetAllLectures.php', {
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

function AddItem() {
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'lectures/AdminAddLecture.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            document.location.href = config.frontHost + 'admin/lecture/' + response;
        })
}

function DeleteItem(idItem, setItems) {
    let isConfirm = window.confirm("Вы уверены, что хотите удалить данную лекцию (id = " + idItem + ")");
    if (!isConfirm){
        return;
    }
    let dataRequest = new FormData();
    dataRequest.append('idLecture', +idItem);
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'lectures/AdminDeleteLecture.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => {
            alert(response);
            GetItems(setItems);
        })
}

function MoveUpItem(idItem, setItems) {
    let dataRequest = new FormData();
    dataRequest.append('idLecture', +idItem);
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'lectures/AdminMoveUpLecture.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => {
            alert(response);
            GetItems(setItems);
        })
}

function MoveDownItem(idItem, setItems) {
    let dataRequest = new FormData();
    dataRequest.append('idLecture', +idItem);
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'lectures/AdminMoveDownLecture.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => {
            alert(response);
            GetItems(setItems);
        })
}

function PageAdminLectures() {
    const [lectures, setLectures] = useState(null);
    useEffect(() => {
        document.title = "Управление лекциями";
        GetItems(setLectures);
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
                accessor: 'idLecture',
            },
            {
                Header: 'Наименование',
                accessor: 'nameLecture',
            },
            {
                Header: 'Глава',
                accessor: 'nameChapter',
            },
            {
                Header: 'Порядковый номер',
                accessor: 'serialNumber',
                disableSortBy: true

            },
            {
                Header: 'Статус',
                accessor: 'idStatus',
                Cell: ({ row }) => {
                    switch (+row.original.idStatus) {
                        case 1:
                            return <div className='status'>
                                <div className="circle red" />
                                Черновик
                            </div>;
                        case 2:
                            return <div className='status'>
                                <div className="circle green" />
                                Опубликован
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
                        <a href={config.frontHost + "admin/lecture/" + row.original.idLecture} className="go"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg></a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => { DeleteItem(+row.original.idLecture, setLectures) }} viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onClick={() => { MoveUpItem(+row.original.idLecture, setLectures) }} viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onClick={() => { MoveDownItem(+row.original.idLecture, setLectures) }} viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                        </svg>
                    </>

                    )
                },
                disableSortBy: true
            },
        ],
        []
    )
    if(!lectures){
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />);
    }
    return (
        <>
            <button className='add' onClick={() => { AddItem()}}>+ Добавить лекцию</button>
            <Table columns={columns} data={lectures} />
        </>
    )
}


export default PageAdminLectures