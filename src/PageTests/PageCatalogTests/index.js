import React from 'react';
import './style.css';

class PageMain extends React.Component {


    render() {
       
        let tests = [
            {'name': 'Тест на знание основ C#', 'timeOnTest': 600, 'countQuestion' : 5, 'category' : ['class', 'construction']},
            {'name': 'События', 'timeOnTest': 3600, 'countQuestion' : 103, 'category' : ['class', 'construction']},
            {'name': 'Тест на знание конструкций', 'timeOnTest': 0, 'countQuestion' : 15, 'category' : ['class', 'construction']},
            {'name': 'Тест на знание класс', 'timeOnTest': 14440, 'countQuestion' : 7, 'category' : ['class', 'construction']}
            
        ]
        return (
            <div className='page__tests'>
                <div className="site__content">
                    Тесты
                    <div className='search__container'>
                        <svg>
                            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
                        </svg>
                        <input type="search" placeholder='Поиск...' />
                    </div>

                {tests.map(item => 
                <div className='test'>
                    <div className="title">{item.name}</div>
                    <div className="categories">{item.category.join(', ')}</div>
                    <div className="time">{item.timeOnTest}</div>
                    <div className="question__count">{item.countQuestion}</div>
                    </div>)}
                    
                </div>
            </div>
        )
    }
}

export default PageMain