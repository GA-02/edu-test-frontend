import React from 'react';
import config from '../../Config.json';
import './style.css';

class PageMain extends React.Component {

    constructor() {
        super();
        this.state = {
            chapters: [],
            filteredText: ''
        }
    }

    componentDidMount() {
        fetch(config.backHost + 'lectures/GetCatalogLectures.php', {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                this.setState(() => {
                    return {
                        chapters: response
                    }
                });

            })
            .catch(error => console.log(error))
    }

    detectEndingWordLecture(countLectures) {
        countLectures = +countLectures;
        switch (true) {
            case ((countLectures % 10 == 0) || (countLectures % 10 > 4 && countLectures % 10 < 10) || [11, 12, 13, 14].includes(countLectures)):
                return countLectures + ' лекций';
            case (countLectures % 10 == 1):
                return countLectures + ' лекция';
            case (countLectures % 10 > 1 && countLectures % 10 <= 4):
                return countLectures + ' лекции';
            default:
                return "";

        }
    }
    render() {
        document.title = "Лекции";
        return (
            <div className='page__lectures'>
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
                    {this.state.chapters.filter(itemChapter => {
                        let filtered = false;
                        let valuesForFilter = [itemChapter.nameChapter, itemChapter.description, itemChapter.lectures.map(lecture => lecture.nameLecture)].flat();
                        valuesForFilter.map(valueForFilter => {
                            if ((valueForFilter ?? '').toLowerCase().indexOf(this.state.filteredText) != -1) {
                                filtered = true;
                            }
                        })
                        return filtered;

                    })

                        .map((itemChapter, indexChapter) =>
                            <div className="chapter" key={itemChapter.idChapter}>
                                <div className="title">{indexChapter + 1}. {itemChapter.nameChapter}</div>
                                <div className="chapter__info"><span title='Среднее время прочтения главы'>
                                    {(Math.floor(+itemChapter.timeReadChapter / 60) == 0 ? "" : new Intl.NumberFormat('ru-RU', {
                                        style: 'unit',
                                        unit: 'hour',
                                        unitDisplay: "long"
                                    }).format(Math.floor(+itemChapter.timeReadChapter / 60))
                                        + ' ')
                                        + (+itemChapter.timeReadChapter % 60 == 0 ? "" : new Intl.NumberFormat('ru-RU', {
                                            style: 'unit',
                                            unit: 'minute',
                                            unitDisplay: "long"
                                        }).format(+itemChapter.timeReadChapter % 60))}
                                </span> • <span title='Количество лекций в главе'>{this.detectEndingWordLecture(itemChapter.lectures.length)}</span></div>
                                <p className="description">{itemChapter.description}</p>
                                <a href={config.frontHost + "lecture/" + String(itemChapter.lectures[0].idLecture)}><button className='chapter__start'>Начать<div className="arrow" /></button></a>
                                <button className='chapter__content' onClick={event => event.target.classList.toggle('active')}>Общие сведения</button>
                                <ul className='chapter__lectures' type="none">
                                    {itemChapter.lectures.map((itemLecture, indexLecture) =>
                                        <li className='chapter__lectures__item' key={itemLecture.idLecture}>
                                            <a href={config.frontHost + "lecture/" + String(itemLecture.idLecture)}>
                                                {indexChapter + 1}.{indexLecture + 1} {itemLecture.nameLecture}
                                            </a>
                                            <p className="time" title='Среднее время прочтения лекции'>
                                                {(Math.floor(+itemLecture.timeReadLecture / 60) == 0 ? "" : new Intl.NumberFormat('ru-RU', {
                                                    style: 'unit',
                                                    unit: 'hour',
                                                    unitDisplay: "long"
                                                }).format(Math.floor(++itemLecture.timeReadLecture / 60))
                                                    + ' ')
                                                    + (+itemLecture.timeReadLecture % 60 == 0 ? "" : new Intl.NumberFormat('ru-RU', {
                                                        style: 'unit',
                                                        unit: 'minute',
                                                        unitDisplay: "long"
                                                    }).format(+itemLecture.timeReadLecture % 60))}
                                            </p>
                                        </li>)}
                                </ul>
                            </div>)}

                </div>
            </div>
        )
    }
}

export default PageMain