import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import config from '../../../../Config.json';
import './style.css';

function GetItems(setItems) {
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'tests/AdminGetAllTests.php', {
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
    fetch(config.backHost + 'tests/AdminAddTest.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            document.location.href = config.frontHost + 'admin/test/' + response;
        })
}

function DeleteItems(idItem, setItems) {
    let isConfirm = window.confirm("Вы уверены, что хотите удалить данный тест (id = " + idItem + ")");
    if (!isConfirm){
        return;
    }
    let dataRequest = new FormData();
    dataRequest.append('idTest', +idItem);
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'tests/AdminDeleteTest.php', {
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

function PageAdminTests() {
    const [tests, setTests] = useState([]);
    useEffect(() => {
        document.title = "Управление тестами";
        GetItems(setTests);
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
                accessor: 'idTest',
            },
            {
                Header: 'Наименование',
                accessor: 'nameTest',
            },
            {
                Header: 'Уровень сложности',
                accessor: 'idComplexity',
                Cell: ({ row }) => {
                    switch (+row.original.idComplexity) {
                        case 1:
                            return "Простой";
                        case 2:
                            return "Средний";
                        case 3:
                            return "Сложный";
                        default:
                            return "Ошибка";

                    }
                },
            },
            {
                Header: 'Количество вопросов',
                accessor: 'countQuestion',
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
                        case 'Опубликован':
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
                        <a href={config.frontHost + "admin/test/" + row.original.idTest} className="go"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green"  viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg></a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => { DeleteItems(row.original.idTest, setTests)}} viewBox="0 0 16 16">
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
    return (

        <div className="page__admin__tests" >
            <div className="site__content">
                <Table columns={columns} data={tests} />
                <button onClick={AddItem} className='add'>+ Добавить тест</button>
            </div>
        </div>
    )
}


export default PageAdminTests