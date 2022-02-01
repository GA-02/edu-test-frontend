import React from 'react';


class PageError404 extends React.Component {
    constructor(){
        super();
        setTimeout(()=>{
            document.location.href = '/';
        }, 5000)
    }
    render() {
        return (
            <div className='page__error404'>
                <p>Ошика 404</p>
            </div>
        )
    }
}

export default PageError404