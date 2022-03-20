import React from 'react';
import './style.css';
import config from '../../Config.json';


class PageCatalogLabs extends React.Component {

    constructor() {
        super();
        this.state = {
            labs: [],
            filteredText: ''

        }
    }

    componentDidMount() {
        fetch(config.backHost + 'labs/GetCatalogLabs.php', {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                this.setState(() => {
                    return {
                        labs: response
                    }
                });

            })
            .catch(error => console.log(error))
    }


    render() {
        document.title = "Лабораторные работы";
        return (
            <div className='page__labs'>
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
                    <ul className='labs' type="none">
                        {this.state.labs.map(item => {
                            let fullStringLab = `Лабораторная работа №${item.startNumber == item.endNumber ? item.startNumber : `${item.startNumber} - ${item.endNumber}`}. ${item.theme}`;
                            if (fullStringLab.toLowerCase().indexOf(this.state.filteredText) != -1) {
                                return (
                                    <li className='labs__item' key={item.idLab}>
                                        <a href={config.frontHost + "lab/" + String(item.idLab)}>
                                        {fullStringLab}
                                        </a>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default PageCatalogLabs