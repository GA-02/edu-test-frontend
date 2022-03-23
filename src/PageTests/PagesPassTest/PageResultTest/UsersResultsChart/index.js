import React, { useState, useEffect } from 'react';
import { Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { useParams } from 'react-router-dom';
import config from '../../../../Config.json';

function GetUsersResults(setItems, idResult) {
    let dataRequest = new FormData();
    dataRequest.append('idResult', idResult);
    fetch(config.backHost + 'tests/GetUsersResults.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error'])
                throw (response['error']);

            let dataFromServer = [];
            Object.entries(response).map(item => {
                dataFromServer[+item[0]] = +item[1];
            })
            dataFromServer = Array.from(dataFromServer, item => typeof item === 'undefined' ? 0 : item)
            let dataForChart = [];
            Object.entries(dataFromServer).map(item => {
                dataForChart.push({
                    name: +item[0],
                    'Количество пользователей': +item[1]
                })
            })
            setItems(dataForChart);
        })
}

function UsersResultsChart() {
    const idResult = useParams()['id'];
    const [data, setData] = useState([]);
    const [windowWidth, setWindowWidth] = useState((window.innerWidth > 600) ? 600 : window.innerWidth);
    useEffect(() => {
        GetUsersResults(setData, idResult);
        window.addEventListener('resize', ()=>{setWindowWidth((window.innerWidth > 600) ? 600 : window.innerWidth)})
    }, [])
    return (
        <div className="users__result">
            <p>Результаты других пользователей:</p>
            <AreaChart
                width={windowWidth-20}
                height={500}
                data={data}
                margin={{
                    top: 0,
                    right: 30,
                    left: 0,
                    bottom: 15
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: 'Результат', position: 'bottom', offset: 0 }} />
                <YAxis label={{ value: `Количество пользователей`, angle: -90, position: 'center' }} />
                <Tooltip />
                <Area type="monotone" dataKey="Количество пользователей" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    )
}

export default UsersResultsChart