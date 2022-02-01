import React from 'react';
import './style.css';

import siteAuthor from './image/author1.jpg';
import socialMediaVK from './image/vk.svg';
import socialMediaYoutube from './image/youtube.svg';
import socialMediaInst from './image/inst.svg';

class PageMain extends React.Component {

    render() {

        return (
            <div className='page__main'>
                <div className="site__content">
                    {/* <div className="social-media">
                        <div className="social-media__item"><a href="https://vk.com/norimyxxxo"><img src={socialMediaVK} alt="vk" className="icon" /></a></div>
                        <div className="social-media__item"><a href="#"><img src={socialMediaYoutube} alt="youtube" className="icon" /></a></div>
                        <div className="social-media__item"><a href="#"><img src={socialMediaInst} alt="inst" className="icon" /></a></div>
                    </div> */}
                    <div className="site__about page__main__block">
                        <div className="title">О сайте</div>
                        <div className="text">
                            Сайт был разработан в качестве дипломной работы. <br />
                            По всем вопросам писать по сюда: natribu.org. <br />
                            Автор сайта: Гузиков Антон Сергеевич, учащийся группы ПО-42.
                            <img src={siteAuthor} alt="автор" />
                        </div>
                    </div>
                    <div className="site__news page__main__block">
                        <div className="title">Новости</div>
                        <div className="text">
                            <ul>
                                <li>Внесены изменения в тему: Классы</li>
                                <li>Добавлен новый тест для языка C#</li>
                                <li>Добавлена новая тема в языке C#: Классы</li>
                                <li>Добавлен новый язык: С#</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageMain