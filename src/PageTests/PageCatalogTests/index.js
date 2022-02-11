import React from 'react';
import './style.css';

class PageMain extends React.Component {

    constructor() {
        super();
        this.state = {
            tests: []
        }
        document.title = 'Тесты';
    }

    componentDidMount() {
        fetch('http://edu-testback-end.com/tests/GetCatalogTests.php', {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                this.setState(() => {
                    return {
                        tests: response
                    }
                });

            })
            .catch(error => console.log(error))
    }


    render() {

        // let tests = [
        //     { 'name': 'Тест на знание основ C#', 'timeOnTest': 600, 'countQuestion': 5 },
        //     { 'name': 'События', 'timeOnTest': 3600, 'countQuestion': 103 },
        //     { 'name': 'Тест на знание конструкций', 'timeOnTest': 1, 'countQuestion': 15 },
        //     { 'name': 'Тест на знание класс', 'timeOnTest': 14440, 'countQuestion': 7 }

        // ]
        return (
            <div className='page__tests__catalog'>
                <div className="site__content">
                    <div className='search__container'>
                        <svg>
                            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
                        </svg>
                        <input type="search" placeholder='Поиск...' />
                    </div>
                    <div className="tests__catalog">
                        {this.state.tests.map(item =>
                            <a href={'/test/'+item.idTest} className='test'>
                                <div className="title">{item.nameTest}</div>
                                <div className='specifications'>
                                    <div className="complexity"> {item.complexity}</div>
                                    <div className="question__count">{item.countQuestion}</div>
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default PageMain