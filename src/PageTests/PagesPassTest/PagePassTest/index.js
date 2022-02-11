import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function GetItems(setItems, idTest) {
    let dataRequest = new FormData();
    dataRequest.append('idTest', +idTest);
    fetch('http://edu-testback-end.com/tests/GetQuestionsTest.php', {
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

function PageTestPass() {
    const idTest = useParams()['id'];
    console.log('1');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    useEffect(() => {
        GetItems(setQuestions, idTest);
    }, [])
    let question = questions[currentQuestion];
    if (!question) {
        return (<>Загрузка</>);
    }
    return (
        <div className='page__test__pass'>
            <div className="site__content">
                <div className='question'>
                    <div className="question__name">{question.nameQuestion}</div>
                    <div className="answers">
                        {question.answers.map(answer =>
                            <div className="answer" key={answer.idAnswer}>
                                <label><input type={question.idTypeAnswers == 1 ? "radio" : "checkbox"} name="answer" />{answer.nameAnswer}</label>
                            </div>)}

                    </div>
                </div>
                <div className="navigation">

                    {currentQuestion === 0 ?
                        <></>
                        :
                        <button className="prev__question" onClick={() => { setCurrentQuestion(currentQuestion - 1) }}>Предыдущий</button>
                    }

                    {currentQuestion === questions.length - 1 ?
                        <button className="next_question">Завершить</button>
                        :
                        <button className="next_question" onClick={() => { setCurrentQuestion(currentQuestion + 1) }}>Следующий</button>
                    }
                </div>
            </div>
        </div>
    )
}


export default PageTestPass