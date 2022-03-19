import React, { useState, useEffect } from 'react';
import TestsPage from './Test';
import ResultsPage from './Results';
import './style.css';

function PageAdminTests() {
    const [selectedItem, setSelectedItem] = useState(0);
    useEffect(() => {
        document.title = "Управление тестами";
    }, [])


    return (
        <div className="page__admin__tests" >
            <div className="site__content">
                <div className="control">
                    <button className={selectedItem == 0 ? 'active' : ''} onClick={()=>{setSelectedItem(0)}}>Тесты</button>
                    <button className={selectedItem == 1? 'active' : ''} onClick={()=>{setSelectedItem(1)}}>Результаты</button>
                </div>
                {selectedItem == 0 ? <TestsPage /> : <ResultsPage />}
            </div>
        </div>
    )
}


export default PageAdminTests