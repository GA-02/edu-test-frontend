import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Highlight from 'react-highlight';
import './style.css';
import './vsStyleForCode.css';

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

function ToggleItem(item, id, items) {
    let mas = [...items];
    if (!mas[id]) {
        mas[id] = [];
    }
    if (!mas[id].includes(item)) {
        mas[id].push(item);
    }
    else {
        mas[id] = mas[id].filter(itemMas => item != itemMas)
    }
    return mas;
}

function SetItem(item, id, items) {
    let newMas = [...items];
    newMas[id] = item;
    return newMas;
}


function CheckAnswers(answers, idTest) {
    fetch('http://edu-testback-end.com/tests/CheckAnswers.php', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'idTest': idTest,
            'userAnswers': answers,
            'email': localStorage.getItem('email'),
            'password': localStorage.getItem('password')
            
        })
    })
        .then(response => response.json())
        .then(response => {
            document.location.href = '/result/' + response;
        })
}

function PageTestPass() {
    const idTest = useParams()['id'];
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    useEffect(() => {
        document.title = "Прохождение теста";
        GetItems(setQuestions, idTest);
    }, [])
    let question = questions[currentQuestion];
    if (!question) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />);
    }
    return (
        <div className='page__test__pass'>
            <div className="site__content">
                <div className='question'>
                    <div className="question__name">Вопрос {currentQuestion + 1}: {question.nameQuestion}
                    {question.codeQuestion ? <Highlight className='CSharp'>{question.codeQuestion}</Highlight> : <></>}</div>
                    {(() => {
                        switch (+question.idTypeAnswers) {
                            case 1:
                                return (
                                    <ul className="answers" type='none' key={question.idQuestion}>
                                        {
                                            question.answers.map((answer, index) => {
                                                return (
                                                    <li className={"answer " + ((answers[question.idQuestion] ?? -1) == answer.idAnswer ? "active" : "")}
                                                        key={answer.idAnswer}
                                                        onClick={() => {
                                                            setAnswers(SetItem(answer.idAnswer, question.idQuestion, answers));
                                                        }} >
                                                        <div className="indexAnswer">{index + 1}</div>
                                                        {answer.nameAnswer ? answer.nameAnswer : <></>}
                                                        {answer.codeAnswer ? <Highlight className='CSharp'>{answer.codeAnswer}</Highlight>: <></>}
                                                    </li>

                                                )
                                            })
                                        }
                                    </ul>
                                )
                            case 2:
                                return (
                                    <ul className="answers" type='none' key={question.idQuestion}>
                                        {question.answers.map((answer, index) => {
                                            return (
                                                <li className={"answer answer_checkbox " + ((answers[question.idQuestion] ?? []).includes(answer.idAnswer) ? "active" : "")}
                                                    key={answer.idAnswer}
                                                    onClick={() => {
                                                        setAnswers(ToggleItem(answer.idAnswer, question.idQuestion, answers));
                                                    }}>
                                                    <div className="indexAnswer">{index + 1}</div>
                                                    {answer.nameAnswer}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )
                            case 3:
                                return (<input type="text"
                                    className="answer"
                                    placeholder='Введите ответ'
                                    defaultValue={answers[question.idQuestion] ?? ""}
                                    key={question.idQuestion}
                                    onChange={(event) => { setAnswers(SetItem(event.target.value, question.idQuestion, answers)) }}
                                />);
                            case 4:
                                return (<input type="number"
                                    className="answer"
                                    placeholder='Введите ответ'
                                    defaultValue={answers[question.idQuestion] ?? ""}
                                    key={question.idQuestion}
                                    onChange={(event) => { setAnswers(SetItem(event.target.value, question.idQuestion, answers)) }}
                                />);
                            default:
                                return (<>Ошибка</>)
                        }
                    })()}

                </div>
                <div className="navigation">

                    {currentQuestion === 0 ?
                        <button className="prev__question navigation__button" disabled>
                            <div className="arrow arrow_prev" />
                            Предыдущий
                        </button>
                        :
                        <button className="prev__question navigation__button" onClick={() => { setCurrentQuestion(currentQuestion - 1) }}>
                            <div className="arrow arrow_prev" />
                            Предыдущий
                        </button>
                    }

                    {currentQuestion === questions.length - 1 ?
                        <button className="finish__test navigation__button" onClick={() => { CheckAnswers(answers, idTest) }}>Завершить</button>
                        :
                        <button className="next_question navigation__button" onClick={() => { setCurrentQuestion(currentQuestion + 1) }}>
                            Следующий
                            <div className="arrow arrow_next" />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}


export default PageTestPass