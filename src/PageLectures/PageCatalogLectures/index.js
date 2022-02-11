import React from 'react';
import './style.css';

class PageMain extends React.Component {

    constructor() {
        super();
        this.state = {
            chapters: []
        }
    }

    componentDidMount() {
        fetch('http://edu-testback-end.com/lectures/GetCatalogLectures.php', {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                this.setState(() => {
                    return {
                        chapters: response
                    }});

            })
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.state.chapters);
        // let lectures = [
        //     // {'name' : "Тест на знание классов", 'countQuestion': 7, 'timeOnPass': 30}
        //     {
        //         'idChapter': 1, 'nameChapter': 'Основы', 'lecturesInChapter': [
        //             { 'name': 'Структура программы', 'idLecture': 1 },
        //             { 'name': 'Переменные и константы', 'idLecture': 1 },
        //             { 'name': 'Литералы', 'idLecture': 1 },
        //             { 'name': 'Типы данных', 'idLecture': 1 }
        //         ]
        //     },
        //     {
        //         'idChapter': 2, 'nameChapter': 'Классы, структуры и пространство имен', 'lecturesInChapter': [
        //             { 'name': 'Классы и объекты',' idLecture': 1 },
        //             { 'name': 'Конструкторы', 'idLecture': 1 },
        //             { 'name': 'Структуры', 'idLecture': 1 },
        //             { 'name': 'Пространство имен', 'idLecture': 1 }
        //         ]
        //     },
        //     {
        //         'idChapter': 3, 'nameChapter': 'Объектно-ориентированное программирование', 'lecturesInChapter': [
        //             { 'name': 'Наследование', 'idLecture': 1 },
        //             { 'name': 'Преобразование типов', 'idLecture': 1 },
        //             { 'name': 'Виртуальные методы и свойства', 'idLecture': 1 }
        //         ]
        //     }
        // ]
        document.title="Лекции";
        return (
            <div className='page__lectures'>
                <div className="site__content">
                    <div className='search__container'>
                        <svg>
                            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
                        </svg>
                        <input type="search" placeholder='Поиск...' />
                    </div>
                    {this.state.chapters.map((itemChapter, indexChapter) =>
                        <div className="chapter">
                            <div className="title">{indexChapter+1}. {itemChapter.nameChapter}</div>
                            {itemChapter.lectures.map((itemLecture, indexLecture) =>
                                <div className='lectures'>
                                    <a href={"/lecture/" + String(itemLecture.idLecture)}>
                                        <span className='id'>{indexChapter+1}.{indexLecture+1}</span> {itemLecture.nameLecture}
                                        </a>
                                </div>)}
                        </div>)}

                </div>
            </div>
        )
    }
}

export default PageMain