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

function AddUniqueItem(item, items) {
    let mas = [...items];
    if (!mas.includes(item)) {
        mas.push(item);
    }
    return mas;
}

function RemoveItems(itemsForDelete, items) {
    let mas = [...items];
    mas = mas.filter(itemMas => !itemsForDelete.includes(itemMas))
    return mas;
}

function ToggleItem(item, items) {
    let mas = [...items];
    if (!mas.includes(item)) {
        mas.push(item);
    }
    else {
        mas = mas.filter(itemMas => item != itemMas)
    }
    return mas;
}
function PageTestPass() {
    const idTest = useParams()['id'];
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
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
                    <div className="question__name">Вопрос {currentQuestion + 1}: {question.nameQuestion}</div>
                    <ul className="answers" type='none'>
                        {question.answers.map((answer, index) => <>
                            {question.idTypeAnswers == 1 ?
                                <li className={"answer " + (answers.indexOf(+answer.idAnswer) != -1 ? "active" : "")} onClick={() => {
                                    let otherAnswers = [];
                                    question.answers.map(answer => otherAnswers.push(+answer.idAnswer));
                                    setAnswers(AddUniqueItem(+answer.idAnswer, RemoveItems(otherAnswers, answers)));
                                }} >
                                    <div className="indexAnswer">{index + 1}</div>
                                    {answer.nameAnswer}
                                </li>
                                :
                                <li className={"answer answer_checkbox " + (answers.indexOf(+answer.idAnswer) != -1 ? "active" : "")} key={answer.idAnswer} onClick={() => {
                                    setAnswers(ToggleItem(+answer.idAnswer, answers));
                                }}>
                                    <div className="indexAnswer">{index + 1}</div>
                                    {answer.nameAnswer}
                                </li>
                            }
                        </>
                        )
                        }

                    </ul>
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
                        <button className="finish__test navigation__button">Завершить</button>
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