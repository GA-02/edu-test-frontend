import React from 'react';
import config from '../../Config.json';
import './style.css';

class PageMain extends React.Component {

    constructor() {
        super();
        this.state = {
            tests: [],
            filteredText: ''
        }
        document.title = 'Тесты';
    }

    componentDidMount() {
        fetch(config.backHost + 'tests/GetCatalogTests.php', {
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
        return (
            <div className='page__tests__catalog'>
                <div className="site__content">
                    <div className='search__container'>
                        <svg>
                            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
                        </svg>
                        <input type="search" placeholder='Поиск...' onChange={(event) => {
                            this.setState(() => {
                                return {
                                    filteredText: event.target.value.toLowerCase()
                                }
                            });
                        }} />
                    </div>
                    <div className="tests__catalog">
                        {this.state.tests.filter(test => {
                            let filtered = false;
                            Object.values(test).map((field, index) => {
                                if (index == 1 || index == 2)
                                    if ((field ?? '').toLowerCase().indexOf(this.state.filteredText) != -1) {
                                        filtered = true;
                                    }
                            })
                            return filtered;
                        })
                            .map(item =>
                                <a href={config.frontHost + "test/" + item.idTest} className='test' key={item.idTest}>
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