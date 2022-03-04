import React, { useState, useEffect } from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import Highlight from 'react-highlight';
import './style.css';
import './vsStyleForCode.css';

function GetItems(setItems, idLab) {
    let dataRequest = new FormData();
    dataRequest.append('idLab', +idLab);
    fetch('http://edu-testback-end.com/labs/GetContentLab.php', {
        method: "POST",
        body: dataRequest
    })
        .then(response => response.json())
        .then(response => {
            if (response['error'])
                throw (response['error']);
            setItems(response);
            document.title = "Лабораторная работа №" + response.startNumber
        })
}


function PageLabRead() {
    const idLab = useParams()['id'];
    const [lab, setLab] = useState([]);
    useEffect(() => {
        GetItems(setLab, idLab);
    }, [])
    return (
        <div className='page__lab_read'>
            <div className="site__content">
                <div className="navigation">
                    <div className="prev" ><div className="arrow" />Предыдущая </div>
                    <div className="next" >Следующая <div className="arrow" /></div>
                </div>
                <div className="lab__content">
                    <div className='title'>Лабораторная работа № {lab.startNumber == lab.endNumber ? lab.startNumber : `${lab.startNumber} - ${lab.endNumber}`}. {lab.theme}</div>
                    <div className="lab__info">
                        <p><strong>Цель:</strong> {lab.goal}</p>
                        <p><strong>Оборудование: </strong> {lab.equipment}</p>
                        <p><strong>Время выполнения: </strong>
                            {new Intl.NumberFormat('ru-RU', {
                                style: 'unit',
                                unit: 'hour',
                                unitDisplay: "long"
                            }).format((+lab.endNumber - (+lab.startNumber) + 1) * 2)}
                        </p>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: lab.content }}></div>
                    {// return (<Highlight className='csharp' key={index}>{str}</Highlight>);
                    }
                </div>
            </div>
        </div>
    )
}

export default PageLabRead