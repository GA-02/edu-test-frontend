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
    const idTest = useParams()['id'];
    const [test, setTest] = useState([]);
    useEffect(() => {
        GetItems(setTest, idTest);
    }, [])
    return (
        <div className='page__test__edit'>
            <div className="site__content">

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
                            return (<img src={item.valueElem} alt="photo"  key={index}/>);
                        default:
                            return (<div className="unknown__elem"  key={index}>{item.valueElem}</div>);
                    }
                })}
            </div>
        </div>
    )
}

export default PageLectureRead