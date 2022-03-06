import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { renderMatches, useParams } from 'react-router-dom';
import Highlight from 'react-highlight';
import './style.css';
import './vsStyleForCode.css';

function GetItems(setItems, idLecture) {
    let dataRequest = new FormData();
    dataRequest.append('idLecture', +idLecture);
    fetch('http://edu-testback-end.com/lectures/GetContentLecture.php', {
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
                ReactDOM.render(<Highlight>{replacedString}</Highlight>, span);
                return span.innerHTML
            })
            setItems(response);
            document.title = response['name']
        })
}


function PageLectureRead() {
    const idLecture = useParams()['id'];
    const [lecture, setLecture] = useState([]);
    useEffect(() => {
        GetItems(setLecture, idLecture);
    }, [])

    // console.log(span)
    return (
            <div className='page__lecture_read'>
                <div className="site__content">
                    <div className="navigation">
                        <div className="prev" ><div className="arrow" />Предыдущая </div>
                        <div className="select">Лекция 2 из 3</div>
                        <div className="next" >Следующая <div className="arrow" /></div>
                    </div>
                    <div className="lecture__content">
                        <div className='title'>{lecture.name}</div>
                        <div dangerouslySetInnerHTML={{ __html: lecture.content }}></div>
                        {// return (<Highlight className='csharp' key={index}>{str}</Highlight>);
                        }
                    </div>
                </div>
            </div>
    )
}

export default PageLectureRead