import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../Config.json';
import './style.css';

function GetItems(setItems, idTest) {
    let dataRequest = new FormData();
    dataRequest.append('idTest', +idTest);
    fetch(config.backHost + 'tests/AdminDataTest.php', {
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


function AddLecture(test, setItem, idQuestion) {
    let newTest = JSON.parse(JSON.stringify(test));
    let lectures = [...newTest.questions[idQuestion].lectures];
    let maxID = 0;
    lectures.forEach(item => {
        if (maxID < +item.idString) {
            maxID = +item.idString;
        }
    })
    newTest.questions[idQuestion].lectures.push({ idString: String(maxID + 1), idLecture: test.allChapters[0].lectures[0].idLecture, idChapter: test.allChapters[0].idChapter });
    setItem(newTest);
}

function DeleteLecture(test, setItem, idQuestion, idLecture) {
    let newTest = JSON.parse(JSON.stringify(test));
    newTest.questions[idQuestion].lectures.splice(idLecture, 1);
    setItem(newTest);
}

function ChangeChapter(event, test, setItem, idQuestion, idLecture) {
    let newTest = JSON.parse(JSON.stringify(test));
    newTest.questions[idQuestion].lectures[idLecture].idChapter = test.allChapters[event.target.selectedIndex].idChapter;
    newTest.questions[idQuestion].lectures[idLecture].idLecture = test.allChapters[event.target.selectedIndex].lectures[0].idLecture;
    setItem(newTest);
}


function SaveTest(idTest, test) {
    let newTest = JSON.parse(JSON.stringify(test));
    newTest.nameTest = document.querySelector('#nameTest').value;
    newTest.idComplexity = document.querySelector('#idComplexityTest').value;
    newTest.idStatus = document.querySelector('#idStatusTest').value;
    newTest.questions.map(question => {
        question.nameQuestion = document.querySelector('#question__name__' + question.idQuestion).value;
        question.codeQuestion = document.querySelector('#question__code__' + question.idQuestion).value;
        question.answers.map(answer => {
            answer.nameAnswer = document.querySelector('#answer__name__' + question.idQuestion + '__' + answer.idAnswer).value;
            if (!document.querySelector('#answer__code__' + question.idQuestion + '__' + answer.idAnswer)) {
                answer.codeAnswer = '';
            }
            else {
                answer.codeAnswer = (document.querySelector('#answer__code__' + question.idQuestion + '__' + answer.idAnswer) ?? '').value;
            }
        })
        question.lectures.map(lecture => {
            lecture.idLecture = document.querySelector('#question__lecture__' + question.idQuestion + '__' + lecture.idLecture).value;
        })
    })
    fetch(config.backHost + 'tests/AdminSaveTest.php', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'idTest': idTest,
            'test': newTest,
        })
    })
        .then(response => response.text())
        .then(response => {
            alert(response);
        })
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
                    <select name="complexity" id='idComplexityTest' defaultValue={test.idComplexity} >
                        <option value="1">Легкий</option>
                        <option value="2">Средний</option>
                        <option value="3" >Сложный</option>
                    </select>
                </p>
                <p>Статус: &#160;
                    <select name="status" id='idStatusTest' defaultValue={test.idStatus}>
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
                            <textarea placeholder='Введите вопрос' id={'question__name__' + question.idQuestion} defaultValue={question.nameQuestion} />
                            <textarea placeholder='Введите код вопроса' id={'question__code__' + question.idQuestion} defaultValue={question.codeQuestion} />
                            {(() => {
                                switch (+question.idType) {
                                    case 1:
                                        return (
                                            <div className="answers">
                                                {question.answers.map((answer, i) =>
                                                    <div className='answers__item' key={answer.idAnswer}>
                                                        <input type="radio" name={'question' + index} defaultChecked={answer.isTrue == 1} />
                                                        <div className="answer__value">
                                                            <textarea name="text" placeholder='Введите текст ответа' id={'answer__name__' + question.idQuestion + '__' + answer.idAnswer} defaultValue={answer.nameAnswer} />
                                                            <textarea name="code" placeholder='Введите код ответа' id={'answer__code__' + question.idQuestion + '__' + answer.idAnswer} defaultValue={answer.codeAnswer} />
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
                                                {question.answers.map((answer, i) =>
                                                    <div className='answers__item' key={answer.idAnswer}>
                                                        <input type="checkbox" name={'question' + index} defaultChecked={answer.isTrue == 1} />
                                                        <div className="answer__value">
                                                            <textarea name="text" placeholder='Введите текст ответа' id={'answer__name__' + question.idQuestion + '__' + answer.idAnswer} defaultValue={answer.nameAnswer} />
                                                            <textarea name="code" placeholder='Введите код ответа' id={'answer__code__' + question.idQuestion + '__' + answer.idAnswer} defaultValue={answer.codeAnswer} />
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => { DeleteAnswer(test, setTest, index, i) }} viewBox="0 0 16 16">
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
                                                    <input type="text" name={'question' + index} placeholder="Ответ" id={'answer__name__' + question.idQuestion + '__' + question.answers[0].idAnswer} defaultValue={question.answers[0].nameAnswer} />
                                                </p>
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div className="answer answer__number">
                                                <p>Ответ: &#160;
                                                    <input type="number" name={'question' + index} placeholder="Ответ" id={'answer__name__' + question.idQuestion + '__' + question.answers[0].idAnswer} defaultValue={question.answers[0].nameAnswer} />
                                                </p>
                                            </div>
                                        );
                                    default:
                                        return (<div className="unknown__question" key={index}>Ошибка</div>);
                                }
                            })()}
                            <hr />
                            <p className="title">Рекомендованные лекции:</p>
                            <ul className="question__lectures">

                                {question.lectures.map((lecture, i) =>
                                    <li key={lecture.idString}>
                                        <div className="content">
                                            <select defaultValue={lecture.idChapter} onChange={event => { ChangeChapter(event, test, setTest, index, i) }}>
                                                {test.allChapters.map(chapter => <option value={chapter.idChapter} key={chapter.idChapter}>{chapter.nameChapter}</option>)}
                                            </select>
                                            <select id={'question__lecture__' + question.idQuestion + '__' + lecture.idLecture} defaultValue={lecture.idLecture}>
                                                {test.allChapters.filter(chapter => chapter.idChapter == lecture.idChapter)[0].lectures.map(lectureChapter =>
                                                    <option value={lectureChapter.idLecture} key={lectureChapter.idLecture}>{lectureChapter.nameLecture}</option>)
                                                }
                                            </select>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => { DeleteLecture(test, setTest, index, i) }} viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </div>
                                    </li>
                                )}
                            </ul>

                            <button className='add__lecture' onClick={() => { AddLecture(test, setTest, index) }}>Добавить лекцию</button>


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
                <button className='test__save' onClick={() => { SaveTest(idTest, test) }}>Сохранить тест</button>

            </div>
        </div >
    )
}

export default PageEditTest