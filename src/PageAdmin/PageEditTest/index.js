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

function DeleteAnswer(test, setItem, idQuestion, idAnswer){
    // let newTest;
    // newTest = Object.assign(newTest, test);
    // console.log(typeof test)
    // let answers = [...test.questions[idQuestion].answers];
    let newTest = JSON.parse(JSON.stringify(test));
    console.log(newTest.questions[idQuestion].answers.splice(idAnswer, 1));
    
    setItem(newTest);
    // answers.splice(idAnswer, 1);
    // console.log(answers);
    // newTest.questions[idQuestion].answers = answers;
    // console.log(newTest) 

}

function PageLectureRead() {
    const idTest = useParams()['id'];
    const [test, setTest] = useState();
    useEffect(() => {
        document.title = "Редактирование теста";
        GetItems(setTest, idTest);
    }, [])
    if (!test) {
        return (<>Загрузка</>)
    }
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
                {test.questions.map((item, index) => {
                    switch (+item.idType) {
                        case 1:
                            return (
                                <div className='question question__one-answer' key={index}>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' key={item.nameQuestion} defaultValue={item.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
                                    <div className="answers">
                                        {item.answers.map((item, i) =>
                                            <div className='answers__item'  key={item.nameAnswer}>
                                                <input type="radio" name={'question' + index}  defaultChecked={item.isTrue == 1} />
                                                <div className="answer__value">
                                                    <textarea name="text" placeholder='Введите текст ответа' defaultValue={item.nameAnswer} />
                                                    <textarea name="code" placeholder='Введите код ответа' />
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => {DeleteAnswer(test, setTest, index, i)}} viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </div>)}

                                        <button className='add__answer'>Добавить вариант ответа</button>
                                    </div>
                                </div>);
                        case 2:
                            return (
                                <div className='question question__many-answer' key={index}>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' defaultValue={item.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
                                    <div className="answers">
                                        {item.answers.map((item, i) =>
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

                                        <button className='add__answer'>Добавить вариант ответа</button>
                                    </div>
                                </div>);
                        case 3:
                            return (
                                <div className='question question__string-answer' key={index}>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' defaultValue={item.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
                                    <div className="answer">
                                        <p>Ответ: &#160;
                                        <input type="text" name={'question' + index} placeholder="Ответ" defaultValue={item.answers[0].nameAnswer}  />
                                        </p>
                                    </div>

                                </div>);
                        case 4:
                            return (
                                <div className='question question__number-answer' key={index}>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' defaultValue={item.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
                                    <div className="answer">
                                        <p>Ответ: &#160;
                                        <input type="number" name={'question' + index} placeholder="Ответ" defaultValue={item.answers[0].nameAnswer}  />
                                        </p>
                                    </div>

                                </div>);
                        default:
                            return (<div className="unknown__question" key={index}>Ошибка</div>);
                    }
                })}
                <button className='add__question'>Добавить вопрос</button>
                <button>Сохранить</button>
            </div>
        </div >
    )
}

export default PageLectureRead