import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function GetResult(setItems, idTest) {
    let dataRequest = new FormData();
    dataRequest.append('idResult', +idTest);
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
    if(!result){
        return(<div>Загрузка</div>);
    }
        return (
            <div className='page__test__result'>
                <div className="site__content">
                <div className="user">Пользователь: {result.userName}</div>
                <div className="score">Количество правильных ответов: {result.scoreResult} из {result.scoreMax}</div>
                <div className="recommended__lecture">Список рекомендованных лекций: </div>
                <ul>
                    {result.recommendedLectures.map(item => <li key={item.idLecture}><a href={'/lecture/' + item.idLecture}>{item.nameChapter}: {item.nameLecture}</a></li>)}
                </ul>
                </div>
            </div>
        )
}

export default PageTestResult