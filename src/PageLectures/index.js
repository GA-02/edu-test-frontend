import React from 'react';
import './style.css';

class PageMain extends React.Component {


    render() {
        let lectures = [
            // {'name' : "Тест на знание классов", 'countQuestion': 7, 'timeOnPass': 30}
            {
                'idChapter': 1, 'nameChapter': 'Основы', 'lecturesInChapter': [
                    { 'name': 'Структура программы', 'link': '#' },
                    { 'name': 'Переменные и константы', 'link': '#' },
                    { 'name': 'Литералы', 'link': '#' },
                    { 'name': 'Типы данных', 'link': '#' }
                ]
            },
            {
                'idChapter': 2, 'nameChapter': 'Классы, структуры и пространство имен', 'lecturesInChapter': [
                    { 'name': 'Классы и объекты', 'link': '#' },
                    { 'name': 'Конструкторы', 'link': '#' },
                    { 'name': 'Структуры', 'link': '#' },
                    { 'name': 'Пространство имен', 'link': '#' }
                ]
            },
            {
                'idChapter': 3, 'nameChapter': 'Объектно-ориентированное программирование', 'lecturesInChapter': [
                    { 'name': 'Наследование', 'link': '#' },
                    { 'name': 'Преобразование типов', 'link': '#' },
                    { 'name': 'Виртуальные методы и свойства', 'link': '#' }
                ]
            }
        ]
        return (
            <div className='page__lectures'>
                <div className="site__content">
                    <div className='search__container'>
                        <svg>
                            <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
                        </svg>
                        <input type="search" placeholder='Поиск...' />
                    </div>
                    {lectures.map(item =>
                        <div className="chapter">
                            <div className="title">{item.idChapter}. {item.nameChapter}</div>
                            {item.lecturesInChapter.map((itemLecture, index) =>
                                <div className='lectures'>
                                    <a href={itemLecture.link}>
                                        <span className='id'>{item.idChapter}.{index+1}</span> {itemLecture.name}
                                        </a>
                                </div>)}
                        </div>)}

                </div>
            </div>
        )
    }
}

export default PageMain