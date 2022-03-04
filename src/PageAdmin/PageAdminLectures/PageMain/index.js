import React, { useState, useEffect } from 'react';
import LecturePage from './Lectures';
import './style.css';

function PageAdminTests() {
    const [selectedItem, setSelectedItem] = useState(0);
    useEffect(() => {
        document.title = "Управление лекциями";
    }, [])


    return (
        <div className="page__admin__lectures" >
            <div className="site__content">
                <div className="control">
                    <button className={selectedItem == 0 ? 'active' : ''} onClick={()=>{setSelectedItem(0)}}>Лекции</button>
                    <button className={selectedItem == 1? 'active' : ''} onClick={()=>{setSelectedItem(1)}}>Главы</button>
                </div>
                {selectedItem == 0 ? <LecturePage /> : ''}
            </div>
        </div>
    )
}


export default PageAdminTests