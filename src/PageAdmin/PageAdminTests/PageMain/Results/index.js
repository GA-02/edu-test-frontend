import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import config from '../../../../Config.json';
import './style.css';

function GetItems(setItems) {
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'tests/AdminGetAllResults.php', {
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

function PageAdminResults() {
    const [results, setResults] = useState(null);
    useEffect(() => {
        document.title = "Управление результатами";
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
                accessor: 'idResult',
            },
            {
                Header: 'Наименование',
                accessor: 'nameTest',
            },
            {
                Header: 'Пользователь',
                accessor: 'user',
            },
            {
                Header: 'Результат',
                accessor: 'score',
            },
            {
                Header: 'Дата',
                accessor: 'date',
            },
            {
                Header: 'Время',
                accessor: 'time',
            },
            {
                Header: 'Действия',
                Cell: ({ row }) => {
                    return (<>
                        <a href={config.frontHost + "result/" + row.original.idResult}  title="Перейти">
                            <svg class="arrow__next" width="16" height="16" fill="green" viewBox="0 0 100 85">
                                <polygon points="58.263,0.056 100,41.85 58.263,83.641 30.662,83.641 62.438,51.866 0,51.866 0,31.611 62.213,31.611 30.605,0 58.263,0.056" />
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
        <>
            <Table columns={columns} data={results} />
        </>
    )
}


export default PageAdminResults