import React from 'react';
import './style.css';
import config from '../Config.json';


class PageError404 extends React.Component {
    constructor() {
        super();
        setTimeout(() => {
            document.location.href = config.frontHost;
        }, 5000)
    }
    render() {
        return (
            <div className='page__error404'>
                <div className="site__content">
                    <p><mark>404</mark><br />страница не найдена</p>
                </div>
            </div>
        )
    }
}

export default PageError404