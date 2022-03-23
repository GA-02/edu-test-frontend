import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { renderMatches, useParams } from 'react-router-dom';
import Highlight from 'react-highlight';
import config from '../../Config.json';
import './style.css';
import './vsStyleForCode.css';

function GetItems(setItems, idLab) {
    let dataRequest = new FormData();
    dataRequest.append('idLab', +idLab);
    fetch(config.backHost + 'labs/GetContentLab.php', {
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
            response.content = response.content.replace(/<table[\S\s]*?>[\S\s]*?<\/table>/gi, (replacedString) => {
                replacedString = '<div class="container-for-table">' + replacedString + '</div>';
                return replacedString
            })
            setItems(response);
            document.title = "Лабораторная работа № " + (response.startNumber == response.endNumber ? response.startNumber : `${response.startNumber} - ${response.endNumber}`);
        })
}


function PageLabRead() {
    const idLab = useParams()['id'];
    const [lab, setLab] = useState(null);
    useEffect(() => {
        GetItems(setLab, idLab);
    }, [])
    if (!lab)
        return (<img className='loading' width="50px" height="50px" src="https://c.tenor.com/XK37GfbV0g8AAAAi/loading-cargando.gif" alt="loading" />)
    return (
        <div className='page__lab_read'>
            <div className="site__content">
                <div className="navigation">
                    <a href={config.frontHost + "lab/" + lab.idPrevLab}><div className="prev" style={{ opacity: lab.idPrevLab ?? 0 }}><div className="arrow" />Предыдущая </div></a>
                    <a href={config.frontHost + "lab/" + lab.idNextLab}><div className="next" style={{ opacity: lab.idNextLab ?? 0 }}>Следующая <div className="arrow" /></div></a>
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
                </div>
            </div>
        </div>
    )
}

export default PageLabRead