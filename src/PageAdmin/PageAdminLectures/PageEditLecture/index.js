import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../Config.json';
import './style.css';

function GetItems(setItems, idLecture) {
    let dataRequest = new FormData();
    dataRequest.append('idLecture', +idLecture);
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'lectures/AdminDataLecture.php', {
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

function SaveLecture(idLecture, name, idChapter, idStatus, content) {
    let dataRequest = new FormData();
    dataRequest.append('idLecture', +idLecture);
    dataRequest.append('nameLecture', name);
    dataRequest.append('idChapter', idChapter);
    dataRequest.append('idStatus', idStatus);
    dataRequest.append('content', content);
    dataRequest.append('email', localStorage.getItem('email'));
    dataRequest.append('password', localStorage.getItem('password'));
    fetch(config.backHost + 'lectures/AdminSaveLecture.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => { alert(response) })
}

function insertText(id, text, countCharsBack) {
    var txtarea = document.getElementById(id);
    var start = txtarea.selectionStart;
    var end = txtarea.selectionEnd;
    var finText = txtarea.value.substring(0, start) + text + txtarea.value.substring(end);
    txtarea.value = finText;
    txtarea.focus();
    txtarea.selectionEnd = ((start == end) ? (end + text.length) : (start + text.length)) - countCharsBack;
}

function enableTab(event) {
    if (event.keyCode === 9) { // была нажата клавиша TAB
        event.preventDefault();
        insertText(event.target.id, '\t', 0)
    }
}

function PageLectureRead() {
    const idLecture = useParams()['id'];
    const [lecture, setLecture] = useState();
    useEffect(() => {
        document.title = "Редактирование лекции";
        GetItems(setLecture, idLecture);
    }, [])
    if (!lecture) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />)
    }
    return (
        <div className='page__lecture__edit'>
            <div className="site__content">
                <p>Наименование лекции: &#160;
                    <input type="text" name="lecture__name" id='lecture__name' defaultValue={lecture.name} />
                </p>
                <p>Глава: &#160;
                    <select name="chapter" id='lecture__chapter' defaultValue={lecture.idChapter} >
                        {lecture.chapters.map(item=><option key={item.idChapter} value={item.idChapter}>{item.nameChapter}</option>)}
                    </select>
                </p>
                <p>Статус: &#160;
                    <select name="status" id='lecture__status' defaultValue={lecture.idStatus}>
                        <option value="1">Черновик</option>
                        <option value="2">Опубликован</option>
                    </select>
                </p>

                <ul type="none" className='insert__buttons'>
                    <li title='Подзаголовок'>
                        <button onClick={() => { insertText('lecture__content', '<h3></h3>', 5) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z" />
                            </svg>
                        </button>
                    </li>
                    <li title='Текст'>
                        <button onClick={() => { insertText('lecture__content', '<p></p>', 4) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z" />
                            </svg>
                        </button>
                    </li>
                    <li title='Жирный текст'>
                        <button onClick={() => { insertText('lecture__content', '<strong></strong>', 9) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
                            </svg>
                        </button>
                    </li>
                    <li title='Код'>
                        <button onClick={() => { insertText('lecture__content', '<code>\n\n</code>', 8) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
                            </svg>
                        </button>
                    </li>
                    <li title='Нумерованный список'>
                        <button onClick={() => { insertText('lecture__content', '<ol>\n\t<li></li>\n\t<li></li>\n</ol>', 22) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
                            </svg>
                        </button>
                    </li>
                    <li title='Маркированный список'>
                        <button onClick={() => { insertText('lecture__content', '<ul>\n\t<li></li>\n\t<li></li>\n</ul>', 22) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg>
                        </button>
                    </li>
                    <li title='Картинка'>
                        <button onClick={() => { insertText('lecture__content', '<img src="" alt="image">', 14) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                            </svg>
                        </button>
                    </li>
                    <li title='Таблица'>
                        <button onClick={() => { insertText('lecture__content', '<table>\n\t<tr>\n\t\t<th></th>\n\t\t<th></th>\n\t</tr>\n\t<tr>\n\t\t<td></td>\n\t\t<td></td>\n\t</tr>\n</table>', 70) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                            </svg>
                        </button>
                    </li>
                </ul>
                <textarea name="lecture__content" id="lecture__content" defaultValue={lecture.content} onKeyDown={(event) => { enableTab(event) }}></textarea>
                <button className='save' onClick={() => {
                    SaveLecture(idLecture, document.querySelector("#lecture__name").value, document.querySelector("#lecture__chapter").value, document.querySelector("#lecture__status").value, document.querySelector("#lecture__content").value)
                }}>Сохранить лекцию</button>

            </div>
        </div >
    )
}

export default PageLectureRead