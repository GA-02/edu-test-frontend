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
function ChangeQuestionName(test, idQuestion, idAnswer, newName){
    let newTest = JSON.parse(JSON.stringify(test));
    newTest.questions[idQuestion].answers[idAnswer].nameAnswer = newName;
    console.log(newTest);
    return newTest;
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
                    switch (+question.idType) {
                        case 1:
                            return (
                                <div className='question question__one-answer' key={question.idQuestion}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='close' width="16" height="16" viewBox="0 0 16 16" onClick={() => { DeleteQuestion(test, setTest, index) }}>
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' defaultValue={question.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
                                    <div className="answers">
                                        {question.answers.map((answer, i) =>
                                            <div className='answers__item' key={answer.idAnswer}>
                                                <input type="radio" name={'question' + index} defaultChecked={answer.isTrue == 1} />
                                                <div className="answer__value">
                                                    <textarea name="text" placeholder='Введите текст ответа' defaultValue={answer.nameAnswer} 
                                                    onChange={(event)=>{setTest(ChangeQuestionName(test, index, i, event.target.value ))}}/>
                                                    <textarea name="code" placeholder='Введите код ответа' />
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" onClick={() => { DeleteAnswer(test, setTest, index, i) }} viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </div>)}

                                        <button className='add__answer' onClick={() => { AddAnswer(test, setTest, index) }}>Добавить вариант ответа</button>
                                    </div>
                                </div>);
                        case 2:
                            return (
                                <div className='question question__many-answer' key={question.idQuestion}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='close' width="16" height="16" viewBox="0 0 16 16" onClick={() => { DeleteQuestion(test, setTest, index) }}>
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' defaultValue={question.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
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
                                </div>);
                        case 3:
                            return (
                                <div className='question question__string-answer' key={question.idQuestion}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='close' width="16" height="16" viewBox="0 0 16 16" onClick={() => { DeleteQuestion(test, setTest, index) }}>
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' defaultValue={question.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
                                    <div className="answer">
                                        <p>Ответ: &#160;
                                            <input type="text" name={'question' + index} placeholder="Ответ" defaultValue={question.answers[0].nameAnswer} />
                                        </p>
                                    </div>

                                </div>);
                        case 4:
                            return (
                                <div className='question question__number-answer' key={question.idQuestion} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className='close' width="16" height="16" viewBox="0 0 16 16" onClick={() => { DeleteQuestion(test, setTest, index) }}>
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                    <p className="title">Вопрос №<strong>{index + 1}</strong>:</p>
                                    <textarea placeholder='Введите вопрос' defaultValue={question.nameQuestion} />
                                    <textarea placeholder='Введите код вопроса' />
                                    <div className="answer">
                                        <p>Ответ: &#160;
                                            <input type="number" name={'question' + index} placeholder="Ответ" defaultValue={question.answers[0].nameAnswer} />
                                        </p>
                                    </div>

                                </div>);
                        default:
                            return (<div className="unknown__question" key={index}>Ошибка</div>);
                    }
                })}

                <div className="question">
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


                <ul>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet totam nam possimus soluta ex libero alias nobis iusto eligendi, sapiente temporibus non suscipit quisquam labore amet illum nesciunt reprehenderit corporis, nulla voluptates excepturi est doloribus! Eveniet cupiditate nisi quos repudiandae doloribus placeat facilis beatae. Ea ex voluptates veniam dolor repellat saepe omnis cupiditate ad officia hic, pariatur minus, asperiores consectetur sunt quae eos nostrum voluptatum, inventore dignissimos odio corrupti accusantium. Rerum in earum expedita voluptatem sunt voluptate officiis non labore corporis natus fugiat, molestias fuga, debitis, tenetur distinctio at hic. Recusandae exercitationem corrupti reiciendis aliquam id quae, a expedita iusto distinctio! Nemo hic corporis est odio dolores libero officiis assumenda doloribus voluptatum dignissimos adipisci ex placeat nisi quibusdam quam sunt, numquam quo, velit obcaecati. Sequi voluptatum voluptate dolorem ipsum asperiores quis consequuntur inventore voluptates qui quasi perspiciatis magni non, repellat ex dolore, quia voluptatibus. Qui accusantium tempora vel nemo iure ducimus quidem atque. Voluptatum dolorum in quis quasi reprehenderit? Quia illum iusto dolorum fugit, voluptates, quibusdam praesentium facere architecto veniam adipisci molestiae numquam earum ipsa quod in fugiat debitis accusantium sapiente vero iste voluptatem laborum quasi consequuntur cumque? Et incidunt non quaerat numquam dolorum quod, at amet quam similique molestiae pariatur, dicta iste porro a adipisci cupiditate totam reiciendis nemo illo dolores error. Sed, error temporibus doloribus explicabo obcaecati quisquam amet accusamus quae iste commodi maiores excepturi cupiditate culpa fuga asperiores in! Deleniti totam sequi eaque dolorem obcaecati, non eum dolores architecto veritatis optio ex, accusantium maiores, voluptate cum quibusdam fuga! Repellat eos et officiis quam sunt labore quos sint magnam animi necessitatibus, quaerat eum tempore impedit explicabo illo repudiandae enim perspiciatis sapiente? Ex necessitatibus, ut at voluptates maxime harum nam tempore velit, amet culpa non sed est doloremque ratione rem itaque dolorem cum inventore minus vel ab? Vero, necessitatibus eligendi praesentium nobis molestiae maiores, incidunt omnis maxime est, totam mollitia nemo ex sit molestias et natus! Nostrum commodi fuga delectus ea accusantium, maiores blanditiis enim. Impedit nulla voluptatibus dicta, similique, hic adipisci dolor soluta et cupiditate ipsum atque aut eius commodi quo aliquam optio nesciunt consequuntur eaque esse. Veritatis repudiandae voluptates deserunt, maxime tempora ullam omnis voluptatem quasi quia, cum accusamus suscipit, eum autem sed rem. Non magnam pariatur, et ab necessitatibus similique repellendus nemo, praesentium, reiciendis vitae dolor possimus veniam ad corrupti nesciunt autem laudantium veritatis porro ipsa inventore! Beatae officia blanditiis consequuntur illum, cum eos error accusamus, voluptates repudiandae itaque totam esse laborum eius alias tempora consectetur voluptas quidem repellendus, facere sed amet. Eius magnam, nesciunt veritatis maxime, mollitia esse voluptatem quisquam, inventore temporibus ex sint. Molestiae necessitatibus rerum asperiores, sunt maxime quos expedita reiciendis autem? A dolor ipsam eaque maiores eveniet ad? Corrupti tempora eaque omnis. Perferendis suscipit expedita quaerat! Accusamus dolorum delectus pariatur odio natus quasi quo ex temporibus, laudantium, distinctio nostrum minus laboriosam animi? Aspernatur, reprehenderit? Aspernatur sapiente voluptatibus tempora quaerat aliquid maxime asperiores, eveniet assumenda eos nisi nulla quod nesciunt aperiam ipsa reprehenderit nam deleniti labore, impedit cupiditate iste, dolor repudiandae officiis. Mollitia?</li>
                    <li>Doloribus iure soluta at a odit nobis excepturi sint, vitae aperiam qui amet culpa ut veniam accusamus voluptates molestiae accusantium fugit animi! Iure ut delectus consequatur numquam enim magnam tempora corporis doloribus asperiores adipisci. Dolores ab voluptas architecto ex fugiat cum sunt quam, dolor eveniet magni, magnam at ad quas minima praesentium voluptates consequuntur labore veritatis, nostrum optio? Ea officiis, deserunt dolor dicta suscipit, perferendis quibusdam commodi voluptate soluta quidem unde. Odio voluptas eos dolor atque reprehenderit facilis. Expedita debitis, porro quod quisquam assumenda temporibus error dolores repellat vitae, id quis distinctio culpa! Voluptatum, sit necessitatibus! Blanditiis id, similique perspiciatis quod iure veniam tenetur optio explicabo dolore consequuntur soluta inventore quis vero minus repellendus ab necessitatibus saepe molestias. Animi ipsum voluptatum, eum architecto corrupti cumque mollitia at. Iusto, fugit amet recusandae, odio architecto quasi vel iure porro corrupti saepe dolore, quod maxime illo molestiae. Vero laborum quis, id maxime delectus quod libero unde nam nobis sint perferendis repudiandae architecto labore praesentium iusto officiis ex velit hic in molestias, animi tempora exercitationem fuga at! Inventore eius modi iste voluptate velit minima veritatis sint tempora, fugit eaque iure dolorem consectetur quaerat saepe dolores amet itaque ipsam illo quibusdam magnam debitis voluptates esse totam! Tempore est magni molestias, architecto totam labore suscipit? Illum atque molestias, neque modi dolorem nesciunt, quas facere sed delectus deleniti explicabo soluta dolorum natus accusantium dolore iure voluptatem distinctio debitis sequi est. Porro perspiciatis repellat quidem deleniti aperiam rerum tenetur vero perferendis? Non quidem placeat itaque unde quod dicta natus commodi corporis explicabo aliquam, voluptatibus in, sunt nam eaque veniam delectus ex cum accusamus, error velit libero architecto nobis. Laborum ab ex facilis eum accusamus, eaque tempore soluta fugiat magni modi alias officia dolor voluptatibus excepturi id deleniti necessitatibus repudiandae quae, error repellat illum obcaecati! Tenetur atque alias nam, velit beatae itaque nisi reprehenderit, odit natus, numquam fugiat doloribus quasi ipsa sapiente? Iure inventore laudantium voluptatum repudiandae excepturi exercitationem doloribus nam delectus, iusto aperiam aspernatur temporibus quibusdam officiis omnis sequi laboriosam, beatae in dolores totam ipsa alias? Inventore, non placeat vel alias veniam recusandae velit, aut dicta odit quibusdam vero doloremque debitis nobis. Est, inventore unde quo harum totam deleniti at, quia ipsa hic quae officia, quisquam velit nam eaque dolorum sapiente assumenda! Accusamus quas debitis voluptatum vero aut atque nemo corporis tempora minus nam, sit hic suscipit repellat alias a fuga neque nihil rerum. Dignissimos illo ea exercitationem maxime, placeat fuga. Qui modi laboriosam sequi consequuntur corrupti blanditiis architecto culpa voluptas commodi repudiandae quas ipsum odio quos minima ullam, voluptate veritatis voluptates rem sit ab ipsa vel omnis non molestias? Asperiores recusandae modi magni ut eos illo architecto eum error sed cum illum, itaque expedita quia aperiam aut tenetur aspernatur incidunt neque iure. Molestias beatae dolores, numquam et tempore voluptatibus quod ipsum, atque accusamus pariatur est consequatur, expedita vitae quam explicabo ad illum! Sequi nobis qui quaerat architecto nulla nesciunt alias dolores, labore ea consequuntur. Eveniet, nostrum aperiam doloremque, maiores dicta magni, veritatis ipsa excepturi dolorum officia ea?</li>
                    <li>Quos mollitia non error, eaque recusandae, quidem ullam odit vero rerum enim praesentium repudiandae obcaecati perspiciatis, aperiam ex quaerat sequi porro maiores? Repudiandae dolorem ducimus, quae explicabo iste fugit itaque porro mollitia voluptatem nihil placeat adipisci ut voluptatum quos inventore odit optio amet. Corrupti necessitatibus ex et adipisci, voluptatem quos est sapiente suscipit ducimus placeat dicta nemo nesciunt velit odio maxime quidem repellendus eos illo quaerat saepe. Totam voluptatum iste consequuntur qui necessitatibus, debitis magnam nemo maiores, amet rem dolores asperiores officiis cumque doloribus laborum laudantium eligendi quidem porro similique esse repellendus facere quod hic laboriosam. Vel aspernatur expedita corrupti reprehenderit corporis maxime minus natus dolore temporibus maiores, obcaecati magni, laudantium laboriosam in. Quos temporibus excepturi quis, pariatur neque, dolore tenetur assumenda vel, perspiciatis accusamus alias id natus eum itaque nemo dignissimos aspernatur laborum in similique. Reiciendis ad id voluptatem amet ipsum quia debitis natus distinctio ullam quasi sunt ducimus molestias impedit pariatur, esse suscipit consequatur reprehenderit laboriosam nemo. Fugit quos iusto quisquam, itaque fugiat beatae, nihil libero sit, sapiente aperiam voluptatibus maxime ab repudiandae rem dolorum expedita quaerat autem. Illum qui earum esse aliquid sit alias, saepe velit ullam, modi sed, dicta dignissimos? Ab molestias, quasi deleniti nam vitae quis, nostrum a vel repudiandae doloribus provident temporibus numquam alias? Excepturi, ut consequuntur aliquid fuga hic veritatis aperiam ipsam numquam reprehenderit neque quasi ad sit fugiat laborum molestiae, alias dicta voluptas natus labore rem doloremque voluptatem. Expedita laboriosam commodi, nam quam alias mollitia eaque impedit debitis error minima voluptatum qui iure sunt beatae amet id officia similique assumenda placeat fugit doloribus itaque! Aliquid odio maxime sed illum ipsam quod iste consectetur eveniet dolore ullam magni accusantium a consequatur provident ipsum ducimus molestiae fugit excepturi quo nihil cumque dignissimos aut, molestias exercitationem. Minima fugit aspernatur perferendis quas architecto error, officiis voluptate explicabo debitis a dolores accusamus dolor reprehenderit praesentium? Libero enim temporibus recusandae itaque, quam sapiente, ea animi, dignissimos sed cum neque aperiam dolorum hic ipsam ut vel quo unde quis. Reprehenderit mollitia quidem facilis dolorum eius? Id expedita perspiciatis, natus mollitia animi, optio maxime nulla voluptatem illum repudiandae odio qui iste veniam assumenda aliquid voluptate? Veritatis saepe facere minima magnam est corrupti ratione voluptas sed dolorum, dicta adipisci, debitis nobis corporis. Totam aperiam quam nemo nisi tenetur eos sequi et porro officiis deleniti quis nulla ipsa dolore molestias impedit magni itaque ullam ex, alias velit omnis doloremque suscipit? Mollitia cupiditate omnis vero dolor harum magni eaque rerum laborum perferendis, voluptatum neque quisquam, quidem maiores totam ab inventore. Voluptas fuga eligendi earum ullam rem facilis, quaerat quia molestiae. Quis dicta aut eligendi ducimus? Dolorum rerum voluptates quasi modi numquam necessitatibus neque eveniet? Quibusdam magnam voluptates eveniet repellendus nesciunt tempora animi quasi illo quos laborum minus doloribus delectus rerum accusamus, consequatur sunt iusto vel nobis voluptatibus quo dolores, corrupti voluptas. Natus omnis sit vitae unde? Laboriosam placeat illo, totam doloribus, maiores adipisci dolores culpa commodi eaque reiciendis pariatur impedit assumenda similique asperiores dolor est architecto molestiae hic. Harum distinctio magnam accusantium nemo.</li>
                    <li>Ut, cumque laborum nisi dignissimos, fuga dolore aspernatur vero exercitationem iure mollitia eos minus earum ipsum eius accusamus quisquam sunt. Quos ipsum iusto aut porro. Nisi praesentium adipisci ipsa doloribus omnis facere libero tempore dolor molestias sint unde iste voluptate pariatur rem eligendi at, dolores nihil reprehenderit quis error beatae! Iure molestiae fugit voluptates fuga, quae quaerat nisi eveniet dolore corporis est hic at voluptatum repudiandae necessitatibus aliquam sint nemo quia officiis nesciunt! Fugiat dolore, architecto unde quam modi eaque consectetur dignissimos quasi magni fugit officiis perspiciatis voluptatem tempora aut quia, odio explicabo officia natus. Quam cupiditate corrupti, iure adipisci sit voluptatibus quia provident! Culpa ad accusantium qui. Quis harum assumenda, totam nulla, suscipit quod quaerat similique dignissimos beatae consequatur impedit, quo praesentium sequi ea voluptas iure fuga ullam quasi. Totam repellendus laudantium necessitatibus minus molestiae? Dolore, odit dignissimos corporis nostrum porro nesciunt soluta error eaque iusto reprehenderit, pariatur quisquam. Ipsum rem adipisci enim non. Quia quos amet aspernatur obcaecati asperiores tempore cupiditate odit repudiandae. Voluptatem laboriosam cupiditate quod ea, in unde enim blanditiis nemo eos deleniti debitis quas optio architecto rerum cumque aliquid earum magni accusantium, sed tempora facere repellat! Consequatur molestiae quae impedit dolor necessitatibus minus ipsam, dicta velit sequi numquam? Quod, laboriosam dolores non quos, veritatis ipsam fuga illo nam deserunt sunt nulla quibusdam quo perferendis ratione. Velit maiores iusto, officiis quo ut maxime ex. Maiores animi, numquam quaerat sunt minus adipisci in? Quae voluptate unde excepturi voluptas libero ad suscipit porro molestias minus reiciendis ut provident illum debitis nisi fuga sapiente, commodi sunt beatae vero blanditiis. Voluptatem aliquam voluptatum quae, explicabo repellat enim. Nobis maxime ab optio aperiam molestiae in unde provident dignissimos consequuntur. Impedit, sint repudiandae alias aspernatur porro doloribus laudantium aut deleniti qui, voluptate amet, numquam cumque maiores suscipit nisi eius iste pariatur officiis. Reiciendis debitis molestias neque nisi illo, ut quasi, nostrum provident vitae, voluptates voluptatum modi voluptatem amet accusantium ea consequatur velit autem corporis omnis. Cupiditate eos ut quibusdam perferendis, cumque aut fugit, maiores doloribus porro quasi, est laborum voluptates error. Perspiciatis placeat similique obcaecati veritatis accusamus dolorem amet iure, voluptatibus quia at omnis blanditiis fuga inventore beatae sapiente ratione, natus architecto autem commodi vero soluta corporis neque dolorum nemo. Beatae praesentium ea unde maiores quod corporis natus sequi sapiente, reprehenderit incidunt rem aspernatur hic ullam voluptates iure delectus officia aut quo accusamus. Autem a provident excepturi doloremque, recusandae enim eius distinctio quasi similique quidem fugiat cum voluptates inventore vero dolore harum unde facilis placeat reprehenderit repudiandae error fugit? Aliquid deserunt aperiam delectus enim excepturi, architecto dolorem dolore minus similique cupiditate illo. Consequatur consectetur maiores, minus velit sunt facere deleniti dignissimos atque qui, voluptates at natus ex ducimus, quam dicta eligendi omnis doloremque? Dignissimos corrupti fugiat ratione, modi molestiae reiciendis, numquam impedit aspernatur expedita quibusdam maxime. Minus mollitia ea blanditiis aperiam sit excepturi ipsum reiciendis at labore, repellendus vel, quae, delectus quaerat provident magnam vero ut quod voluptates iure necessitatibus perferendis maxime. Saepe distinctio, impedit qui quam quidem possimus perferendis dolorum totam.</li>
                    <li>Dicta culpa adipisci rem enim eos quia nihil natus nisi, molestiae quisquam, unde porro modi corporis dignissimos autem vel commodi quae et inventore reiciendis veniam. Illum ipsam exercitationem inventore quas. Atque eum fugit ut perferendis quos assumenda modi aliquam, consequatur quisquam culpa quidem tenetur quasi deleniti quis nobis accusamus? Vitae quisquam voluptate excepturi quam ut odio sit? Repudiandae ducimus ratione, sed sit laudantium ipsam dicta delectus. Tempora pariatur quod inventore voluptates obcaecati. Atque, consectetur a. Necessitatibus deleniti fuga unde pariatur assumenda praesentium soluta corporis dolores ad quis, velit, at nemo excepturi iusto voluptatem laborum qui eaque, provident commodi quam perspiciatis vel consequatur inventore saepe. Molestias tempore magnam odit tempora consectetur doloremque omnis, ut enim libero a quis. Expedita perspiciatis sit blanditiis aperiam, vitae nobis impedit iusto magnam accusantium quae at numquam quia, dolorum mollitia maiores consequatur illum? Eveniet ad sit laudantium modi dolores eaque nobis voluptatibus consequuntur maiores asperiores, fugit voluptas neque aut. Repellendus dolores molestias omnis perspiciatis, ratione libero minima ipsa assumenda. Porro, est exercitationem aliquam natus numquam autem at consectetur quam repellat harum quisquam rem ab expedita nesciunt quo aspernatur minus corrupti non. Nisi numquam ex cupiditate ipsum veritatis pariatur dolorem sequi non labore vitae minus quos, animi ipsam molestiae repellat esse explicabo accusamus quisquam sint! Quia iusto alias hic voluptates doloremque est rem id labore officia, dicta quisquam dolores animi soluta nostrum ad laudantium aperiam laboriosam blanditiis, libero eveniet a distinctio vel nesciunt vitae? Molestias aspernatur ut quisquam nulla distinctio, accusamus obcaecati repellendus exercitationem hic, vitae eius quod fugiat ullam beatae error voluptas quas ducimus perferendis nostrum aliquam suscipit! Eum amet cupiditate laborum sit minus eius omnis exercitationem ratione. Vel tenetur recusandae animi unde labore nulla minus enim ut, sint deleniti consequatur beatae dolorem quia. Laborum error dolor totam explicabo, sit perferendis enim impedit corporis quidem libero nesciunt sint unde, ducimus voluptatibus consectetur architecto quasi tempore quas ullam nemo minus iusto placeat alias. Neque odio, quaerat, soluta vitae, voluptatem corrupti voluptas beatae reiciendis necessitatibus voluptatibus enim. Ducimus, consectetur, reprehenderit laudantium obcaecati, dolore repudiandae voluptas deserunt dolor sunt rem aperiam. Omnis corrupti ea, perferendis minus alias quod! Id similique doloribus quam doloremque nisi consequatur. Ut tempore placeat cupiditate, debitis odio id dolorum. Deserunt, repellat voluptatem corrupti ipsum unde nisi, delectus molestias voluptatibus odio architecto reprehenderit nemo sit quo officia dolore, quibusdam cum placeat nostrum sint laborum. Earum, odio! Architecto repellendus cupiditate veniam! Quasi facere aut tenetur maiores ducimus, totam natus adipisci excepturi dolores, pariatur tempora hic tempore officia porro animi vero doloribus reprehenderit officiis ipsa unde! Molestiae dolorum maiores provident perferendis non. Vitae pariatur voluptatibus ipsa asperiores exercitationem fugiat tenetur! Hic, dolore doloremque. Quis labore totam debitis officia dolorum tempore quibusdam enim voluptate? Sapiente, vel suscipit id ad quisquam unde quam repellat consectetur, assumenda commodi voluptatibus libero distinctio illum facere accusantium ex corrupti autem minus error incidunt! Tenetur illum exercitationem saepe consequuntur asperiores omnis maxime ad assumenda atque aut laborum, alias dolor corrupti quam a repudiandae facere, voluptatem in veritatis placeat consequatur? Aspernatur, molestiae ducimus? Debitis, eveniet consequuntur.</li>
                </ul>
            </div>
        </div >
    )
}

export default PageLectureRead