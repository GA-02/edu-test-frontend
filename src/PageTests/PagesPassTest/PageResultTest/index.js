import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import UsersResultsChart from './UsersResultsChart';

import './style.css';

function GetResult(setItems, idResult) {
    let dataRequest = new FormData();
    dataRequest.append('idResult', +idResult);
    fetch('http://edu-testback-end.com/tests/GetResult.php', {
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
    useEffect(() => {
        document.title = "Результат";
        GetResult(setResult, idResult);
    }, [])
    if (!result) {
        return (<div>Загрузка</div>);
    }
    return (
        <div className='page__test__result'>
            <div className="site__content">
                <section className="main__info">
                    <div className="result__info">
                        <div className="title">Результат</div>
                        <div className="test">Тест: <mark>{result.testName}</mark></div>
                        <div className="user">Пользователь: <mark>{result.userName}</mark></div>
                        <div className="score__title">Количество правильных ответов: </div>
                        <div className="score__value"><mark>{result.scoreResult}</mark> из {result.scoreMax} ({(+result.scoreResult / +result.scoreMax) * 100}%)</div>
                        <PieChart width={600} height={400}>
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
                <div className="recommended__lecture"><p className="title">Список рекомендованных лекций:</p>
                    <ol>
                        {result.recommendedLectures.map(item => <li key={item.idLecture}><a href={'/lecture/' + item.idLecture}>{item.nameChapter}: {item.nameLecture}</a></li>)}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default PageTestResult