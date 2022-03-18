import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function GetItems(setItems, idChapter) {
    let dataRequest = new FormData();
    dataRequest.append('idChapter', +idChapter);
    fetch('http://edu-testback-end.com/chapter/AdminDataLecture.php', {
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

function SaveLecture(idChapter, name, description) {
    let dataRequest = new FormData();
    dataRequest.append('idChapter', +idChapter);
    dataRequest.append('nameChapter', name);
    dataRequest.append('descriptionChapter', description);
    fetch('http://edu-testback-end.com/chapter/AdminSaveLecture.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.text())
        .then(response => { alert(response) })
}

function PageEditChapter() {
    const idChapter = useParams()['id'];
    const [chapter, setChapter] = useState();
    useEffect(() => {
        document.title = "Редактирование главы";
        GetItems(setChapter, idChapter);
    }, [])
    if (!chapter) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />)
    }
    return (
        <div className='page__chapter__edit'>
            <div className="site__content">
                <p>Наименование лекции: &#160;
                    <input type="text" name="chapter__name" id='chapter__name' defaultValue={chapter.name} />
                </p>
                <p>Описание лекции: &#160;
                    <textarea name="chapter__description" id="chapter__description" defaultValue={chapter.description} />
                </p>
                <button className='save' onClick={() => {
                    SaveLecture(idChapter, document.querySelector("#chapter__name").value, document.querySelector("#chapter__description").value,)
                }}>Сохранить главу</button>

            </div>
        </div >
    )
}

export default PageEditChapter