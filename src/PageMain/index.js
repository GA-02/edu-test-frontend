import React from 'react';
import CSharpLogo from './image/c_sharp.png'
import SectionComments from './SectionComments'
import SectionSocialMedia from './SectionSocialMedia'

import './style.css';
class PageMain extends React.Component {

    render() {

        document.title = 'Главная';
        return (
            <div className='page__main'>
                <div className="site__content">
                    <section className='start__section'>
                        <div className="img__container">
                            <img src={CSharpLogo} alt="photo" />
                        </div>
                        <div className="inscription">
                            <p className="title">Обучающий комплекс</p>
                            <p className="subtitle">по дисциплине "Конструирование программ и языки программирования"</p>
                            <p className="text">
                                Создано для обучения программированию. Ознакомляйтесь с лекциями, проходите тестирование, выполняйте лабораторные работы и становитесь настоящими программистами.</p>
                            <a href="/lectures"><button>Начать обучение</button></a>
                        </div>
                    </section>
                </div>
                <SectionComments />
                <SectionSocialMedia />
            </div>
        )
    }
}

export default PageMain