import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
            setItems(response);
            document.title = response[0]['valueElem']
        })
}


function PageLectureRead() {
    const idLecture = useParams()['id'];
    const [lectureElement, setLectureElement] = useState([]);
    useEffect(() => {
        GetItems(setLectureElement, idLecture);
    }, [])
    return (
        <div className='page__lecture_read'>
            <div className="site__content">
                <div className="navigation">
                    <div className="prev" ><div className="arrow" />Предыдущая </div>
                    <div className="select">Лекция 2 из 3</div>
                    <div className="next" >Следующая <div className="arrow" /></div>
                </div>
                <div className="lecture__content">
                {lectureElement.map((item, index) => {
                    switch (+item.idType) {
                        case 0:
                            return (<p className="title" key={index}>{item.valueElem}</p>);
                        case 1:
                            return (<p className="subsection" key={index}>{item.valueElem}</p>);
                        case 2:
                            return (<p className="text" key={index}>{item.valueElem}</p>);
                        case 3:
                            return (<Highlight className='csharp' key={index}>{item.valueElem}</Highlight>);
                        case 4:
                            return (<img src={item.valueElem} alt="photo" key={index} />);
                        default:
                            return (<div className="unknown__elem" key={index}>{item.valueElem}</div>);
                    }
                })}
                </div>
            </div>
        </div>
    )
}

export default PageLectureRead