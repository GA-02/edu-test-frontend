import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import Highlight from 'react-highlight';
import config from '../../Config.json';
import './style.css';
import './vsStyleForCode.css';

function GetItems(setItems, idLecture) {
    let dataRequest = new FormData();
    dataRequest.append('idLecture', +idLecture);
    fetch(config.backHost + 'lectures/GetContentLecture.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            response.content = response.content.replace(/<code[\S\s]*?>[\S\s]*?<\/code>/gi, (replacedString) => {
                const span = document.createElement('span');
                replacedString = replacedString.replace(/(<code[\S\s]*?>[\n\r]*)|(<\/code>)/gi, '');
                ReactDOM.render(<Highlight className='CSharp'>{replacedString}</Highlight>, span);
                return span.innerHTML
            })
            setItems(response);
            document.title = response['name']
        })
}


function PageLectureRead() {
    const idLecture = useParams()['id'];
    const [lecture, setLecture] = useState();
    useEffect(() => {
        GetItems(setLecture, idLecture);
    }, [])
    if (!lecture) {
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />)
    }
    let nameLecturesInChapter = Object.values(lecture.lecturesInChapter).map(item => item.name);
    let indexCurrentLectureInChapter = nameLecturesInChapter.indexOf(lecture.name);
    let prevLectureInChapter = lecture.lecturesInChapter[indexCurrentLectureInChapter - 1];
    let nextLectureInChapter = lecture.lecturesInChapter[indexCurrentLectureInChapter + 1];
    return (
        <div key={Date()} className='page__lecture_read'>
            <div className="site__content">
                <div className="navigation">
                    {!prevLectureInChapter ?
                        <a className='navigation__item'><div className="prev" style={{ opacity: 0 }}><div className="arrow" />Предыдущая </div></a>
                        :
                        <a className='navigation__item' href={config.frontHost + "lecture/" + prevLectureInChapter.idLecture}><div className="prev"><div className="arrow" />Предыдущая </div></a>}
                    {!nextLectureInChapter ?
                        <a className='navigation__item for-mobile'><div className="next" style={{ opacity: 0 }}>Следующая <div className="arrow" /></div></a>
                        :
                        <a className='navigation__item for-mobile' href={config.frontHost + "lecture/" + nextLectureInChapter.idLecture}><div className="next">Следующая <div className="arrow" /></div></a>}
                    <span className='navigation__item'><div className="select" onClick={() => {
                        document.querySelector('.navigation .select').classList.toggle('active');
                        document.querySelector('.navigation .select__drop-menu').classList.toggle('active');
                    }}>
                        Лекция {indexCurrentLectureInChapter + 1} из {nameLecturesInChapter.length}
                    </div>
                        <ul className="select__drop-menu" type="none">
                            <p className="chapter__name">{lecture.nameChapter}</p>
                            {lecture.lecturesInChapter.map((item, index) => {
                                return (<li key={item.idLecture}>
                                    <a href={config.frontHost + "lecture/" + item.idLecture} className={index == indexCurrentLectureInChapter ? 'selected' : ''}>
                                        <p className="lecture__name">{item.name}</p>
                                        <p className="lecture__time">{item.timeReading} мин</p>
                                    </a>
                                </li>)
                            })}
                        </ul>
                    </span>

                    {!nextLectureInChapter ?
                        <a className='navigation__item for-desktop'><div className="next" style={{ opacity: 0 }}>Следующая <div className="arrow" /></div></a>
                        :
                        <a className='navigation__item for-desktop' href={config.frontHost + "lecture/" + nextLectureInChapter.idLecture}><div className="next">Следующая <div className="arrow" /></div></a>}
                </div>
                <div className="lecture__content">
                    <div className='title'>{lecture.name}</div>
                    <div key={idLecture} dangerouslySetInnerHTML={{ __html: lecture.content }} />
                    <hr />
                    {nextLectureInChapter ?
                        <>
                            <p className="next__name">Следующая лекция: {nextLectureInChapter.name}</p>
                            <a className='next__start' href={config.frontHost + "lecture/" + String(nextLectureInChapter.idLecture)}><button>Продолжить<div className="arrow" /></button></a>
                        </>
                        :
                        <>
                            <p className="next__name">Ознакомьтесь с другими главами:</p>
                            {lecture.moveChapter.map((item, index) => <a className='next__chapter' href={config.frontHost + "lecture/" + item.idStart} key={index}>{item.nameChapter}<br /></a>)}
                        </>

                    }
                </div>

            </div>
        </div>
    )
}

export default PageLectureRead