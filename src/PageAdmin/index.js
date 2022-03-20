import React from 'react';
import './style.css';
import config from '../Config.json';


class PageMain extends React.Component {


    render() {
        document.title = "Панель администратора"
        return (
            <div className='page__admin'>
                <div className="site__content">
                    <a href={config.frontHost + "admin/lectures"} className="admin__forward">
                        Перейти к управлению лекциями
                        <div className="arrow"></div>
                    </a>
                    <a href={config.frontHost + "admin/tests"} className="admin__forward">
                        Перейти к управлению тестами
                        <div className="arrow"></div>
                    </a>
                    <a href={config.frontHost + "admin/labs"} className="admin__forward">
                        Перейти к управлению лабораторными работами
                        <div className="arrow"></div>
                    </a>
                    <a href={config.frontHost + "admin/users"} className="admin__forward">
                        Перейти к управлению пользователями
                        <div className="arrow"></div>
                    </a>

                </div>
            </div>
        )
    }
}

export default PageMain