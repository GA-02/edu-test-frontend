import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function GetItems(setItems, idTest) {
    let dataRequest = new FormData();
    dataRequest.append('idTest', +idTest);
    fetch('http://edu-testback-end.com/tests/AdminDataTest.php', {
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

function AddQuestion(test, setItem, idTypeQuestion) {
    let newTest = JSON.parse(JSON.stringify(test));
    let answers = [...newTest.questions];
    let maxID = 0;
    answers.forEach(item => {
        if (maxID < +item.idQuestion) {
            maxID = +item.idQuestion;
        }
    })
    switch (+idTypeQuestion) {
        case 1:
            newTest.questions.push({ idQuestion: String(maxID + 1), idType: String(idTypeQuestion), nameQuestion: '', answers: [{ idAnswer: '0', nameAnswer: '', isTrue: '1' }], lectures: [] });
            break;
        case 2:
            newTest.questions.push({ idQuestion: String(maxID + 1), idType: String(idTypeQuestion), nameQuestion: '', answers: [{ idAnswer: '0', nameAnswer: '', isTrue: '1' }], lectures: [] });
            break;
        case 3:
            newTest.questions.push({ idQuestion: String(maxID + 1), idType: String(idTypeQuestion), nameQuestion: '', answers: [{ idAnswer: '0', nameAnswer: '', isTrue: '1' }], lectures: [] });
            break;
        case 4:
            newTest.questions.push({ idQuestion: String(maxID + 1), idType: String(idTypeQuestion), nameQuestion: '', answers: [{ idAnswer: '0', nameAnswer: '', isTrue: '1' }], lectures: [] });
            break;
        default:
            break;
    }
    setItem(newTest);
}

function DeleteQuestion(test, setItem, idQuestion) {
    let newTest = JSON.parse(JSON.stringify(test));
    newTest.questions.splice(idQuestion, 1);
    setItem(newTest);
}

function AddAnswer(test, setItem, idQuestion) {
    let newTest = JSON.parse(JSON.stringify(test));
    let answers = [...newTest.questions[idQuestion].answers];
    let maxID = 0;
    answers.forEach(item => {
        if (maxID < +item.idAnswer) {
            maxID = +item.idAnswer;
        }
    })
    newTest.questions[idQuestion].answers.push({ idAnswer: String(maxID + 1), nameAnswer: '', isTrue: '0' });
    setItem(newTest);
}

function DeleteAnswer(test, setItem, idQuestion, idAnswer) {
    let newTest = JSON.parse(JSON.stringify(test));
    newTest.questions[idQuestion].answers.splice(idAnswer, 1);
    setItem(newTest);
}
function ChangeQuestionName(test, idQuestion, idAnswer, newName) {
    let newTest = JSON.parse(JSON.stringify(test));
    newTest.questions[idQuestion].answers[idAnswer].nameAnswer = newName;
    console.log(newTest);
    return newTest;
}
function PageEditTest() {
    const idTest = useParams()['id'];
    const [test, setTest] = useState();
    useEffect(() => {
        document.title = "Редактирование теста";
        GetItems(setTest, idTest);
    }, [])
    if (!test) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />)
    }
    console.log(test);
    return (
        <div className='page__test__edit'>
            <div className="site__content">
                <p>Наименование теста: &#160;
                    <input type="text" name="nameTest" id='nameTest' defaultValue={test.nameTest} />
                </p>
                <p>Уровень сложности: &#160;
                    <select name="complexity" defaultValue={test.idComplexity} >
                        <option value="1">Легкий</option>
                        <option value="2">Средний</option>
                        <option value="3" >Сложный</option>
                    </select>
                </p>
                <p>Статус: &#160;
                    <select name="status" defaultValue={test.idStatus}>
                        <option value="1">Черновик</option>
                        <option value="2">Опубликован</option>
                    </select>
                </p>
                {test.questions.map((question, index) => {
                    return (
                        <div className='question question__one-answer' key={question.idQuestion}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='close' width="16" height="16" viewBox="0 0 16 16" onClick={() => { DeleteQuestion(test, setTest, index) }}>
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                            <textarea placeholder='Введите вопрос' defaultValue={question.nameQuestion} />
                            <textarea placeholder='Введите код вопроса' />
                            {(() => {
                                switch (+question.idType) {
                                    case 1:
                                        return (
                                            <div className="answers">
                                                {question.answers.map((answer, i) =>
                                                    <div className='answers__item' key={answer.idAnswer}>
                                                        <input type="radio" name={'question' + index} defaultChecked={answer.isTrue == 1} />
                                                        <div className="answer__value">
                                                            <textarea name="text" placeholder='Введите текст ответа' defaultValue={answer.nameAnswer}
                                                                onChange={(event) => { setTest(ChangeQuestionName(test, index, i, event.target.value)) }} />
                                                            <textarea name="code" placeholder='Введите код ответа' />
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => { DeleteAnswer(test, setTest, index, i) }} viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </div>)}

                                                <button className='add__answer' onClick={() => { AddAnswer(test, setTest, index) }}>Добавить вариант ответа</button>
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div className="answers">
                                                {question.answers.map((item, i) =>
                                                    <div className='answers__item' key={i}>
                                                        <input type="checkbox" name={'question' + index} defaultChecked={item.isTrue == 1} />
                                                        <div className="answer__value">
                                                            <textarea name="text" placeholder='Введите текст ответа' defaultValue={item.nameAnswer} />
                                                            <textarea name="code" placeholder='Введите код ответа' />
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => { alert('1') }} viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </div>)}

                                                <button className='add__answer' onClick={() => { AddAnswer(test, setTest, index) }}>Добавить вариант ответа</button>
                                            </div>
                                        );
                                    case 3:
                                        return (
                                            <div className="answer answer__string">
                                                <p>Ответ: &#160;
                                                    <input type="text" name={'question' + index} placeholder="Ответ" defaultValue={question.answers[0].nameAnswer} />
                                                </p>
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div className="answer answer__number">
                                                <p>Ответ: &#160;
                                                    <input type="number" name={'question' + index} placeholder="Ответ" defaultValue={question.answers[0].nameAnswer} />
                                                </p>
                                            </div>
                                        );
                                    default:
                                        return (<div className="unknown__question" key={index}>Ошибка</div>);
                                }
                            })()}
                        </div>

                    );
                })}


                < div className="question" >
                    <p className="title">Добавить вопрос</p>
                    <select name="typeQuestion" id='selectTypeQuestionForAdd'>
                        <option value="1">Один правильный ответ</option>
                        <option value="2">Несколько правильных ответов</option>
                        <option value="3">Ввод строки</option>
                        <option value="4">Ввод числа</option>
                    </select>
                    <button className='question__add' onClick={() => {
                        AddQuestion(test, setTest, +document.querySelector('#selectTypeQuestionForAdd').options.selectedIndex + 1);
                    }}>Добавить вопрос</button>
                </div>
                <button className='test__save'>Сохранить тест</button>

            </div>
        </div >
    )
}

export default PageEditTest