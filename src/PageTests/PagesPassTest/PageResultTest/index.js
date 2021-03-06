import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import UsersResultsChart from './UsersResultsChart';
import config from '../../../Config.json';
import './style.css';

function GetResult(setItems, idResult) {
    let dataRequest = new FormData();
    dataRequest.append('idResult', +idResult);
    fetch(config.backHost + 'tests/GetResult.php', {
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



function PageTestResult() {
    const idResult = useParams()['id'];
    const [result, setResult] = useState();
    const [windowWidth, setWindowWidth] = useState((window.innerWidth > 600) ? 600 : window.innerWidth);
    useEffect(() => {
        document.title = "Результат";
        GetResult(setResult, idResult);
        window.addEventListener('resize', () => { setWindowWidth((window.innerWidth > 600) ? 600 : window.innerWidth) })
    }, [])
    if (!result) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />);
    }
    return (
        <div className='page__test__result'>
            <div className="site__content">
                <section className="main__info">
                    <div className="result__info">
                        <div className="title">Результат</div>
                        <div className="test">Тест: <mark>{result.testName}</mark></div>
                        <div className="user">Пользователь: <mark>{result.userName}</mark></div>
                        <div className="user">Дата завершения теста: <mark>{result.date}</mark></div>
                        <div className="score__title">Количество правильных ответов: </div>
                        <div className="score__value"><mark>{result.scoreResult}</mark> из {result.scoreMax} ({((+result.scoreResult / +result.scoreMax) * 100).toFixed(2)}%)</div>
                        <PieChart width={windowWidth - 20} height={400}>
                            <Pie
                                dataKey="value"
                                data={[
                                    { name: "Правильные ответы", value: +result.scoreResult },
                                    { name: "Неправильные ответы", value: +result.scoreMax - (+result.scoreResult) }
                                ]}
                                cy={150}
                                innerRadius={40}
                                outerRadius={80}
                                fill="black"
                                label
                            >
                                <Cell fill="#00C49F" />
                                <Cell fill="#FF8042" />
                            </Pie>
                            <Tooltip />
                        </PieChart>

                    </div>
                    <UsersResultsChart />

                </section>
                {
                    result.recommendedLectures ?
                        <div className="recommended__lecture"><p className="title">Список рекомендованных лекций:</p>
                            <ol>
                                {result.recommendedLectures.map(item => <li key={item.idLecture}><a href={config.frontHost + "lecture/" + item.idLecture}>{item.nameChapter}: {item.nameLecture}</a></li>)}
                            </ol>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    )
}

export default PageTestResult