import React, { useState, useEffect, useMemo } from 'react';
import Table from './Table';
import config from '../../Config.json';
import './style.css';


function GetItems(setItems) {
    let dataRequest = new FormData();
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'users/GetUserResults.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error']) {
                localStorage.clear();
                document.location.href = config.frontHost;
            }
            setItems(response);
        })
        .catch(error => console.log(error))
}

function PageProfileResults() {
    const [results, setResults] = useState(null);
    useEffect(() => {
        document.title = "Все результаты";
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
                Header: 'Наименование',
                accessor: 'testName',
            },
            {
                Header: 'Дата',
                accessor: 'date',
            },
            {
                Header: 'Время',
                accessor: 'time',
                disableSortBy: true
            },
            {
                Header: 'Результат',
                accessor: 'resultScore',
                disableSortBy: true

            },
            {
                Header: 'Действия',
                Cell: ({ row }) => {
                    return (<>

                        <a href={config.frontHost + "result/" + row.original.idResult} title="Перейти">
                            <svg className="arrow__next" viewBox="0 0 100 85">
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
        <div className='page__profile__results'>
            <div className="site__content">
                <div className="container-for-table">
                <Table columns={columns} data={results} />
                </div>
            </div>
        </div>
    )
}


export default PageProfileResults