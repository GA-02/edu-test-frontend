import React from 'react';
import './style.css';

class PageMain extends React.Component {


    render() {
        return (
            <div className='page__admin'>
                <div className="site__content">
                    <a href="/admin/lectures" className="admin__forward">
                        Перейти к управлению лекциями
                        <div className="arrow"></div>
                    </a>
                    <a href="/admin/tests" className="admin__forward">
                        Перейти к управлению тестами
                        <div className="arrow"></div>
                    </a>
                    <a href="/admin/users" className="admin__forward">
                        Перейти к управлению пользователями
                        <div className="arrow"></div>
                    </a>
                </div>
            </div>
        )
    }
}

export default PageMain