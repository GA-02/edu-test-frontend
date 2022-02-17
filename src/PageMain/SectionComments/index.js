import React, {useState} from 'react';
import './style.css';

function SectionComments() {
    const [currentComment, setCurrentComment] = useState(2);
    const comments = [
        { authorIcon: 'https://sun9-13.userapi.com/impf/c624425/v624425433/4dbb5/pZM0qjWXYpo.jpg?size=480x640&quality=96&sign=a53df9456feaeb93cafa0be971c64d76&type=album', authorName: 'Кирилл', comment: 'Я очень долго изучал программирование и думал, что знаю всё. Данный сайт помог мне в этом удостовериться!' },
        { authorIcon: 'https://sun9-68.userapi.com/impg/iyFUzNqSZHoB-ejzt_szHJDD3VG8I9p79n4t-A/gBqCAvd4Ibc.jpg?size=750x750&quality=96&sign=422e3272be0927a7f82bfb60df9782f8&type=album', authorName: 'Захар', comment: 'Когда я зашел на сайт, то был удивлен... Я сразу понял, что над дизайном сайта решили не заморачиваться.' },
        { authorIcon: 'https://sun9-74.userapi.com/impg/Ki1iTLdZXoy3DK1zgWJCfai54M_qheUTm0J19Q/JesiDpgnW1g.jpg?size=828x854&quality=96&sign=4025b8ff1b4d1869e5d8505e0ec14761&type=album', authorName: 'Антон', comment: 'Очень хороший сайт. Сразу видно, что разработчик делал его не один день и вложил в этот сайт свою душу (отсылка к крестражам).' },
        { authorIcon: 'https://sun9-24.userapi.com/impg/-WfPg4BPxIw-t6Ntdqjp1SQO6Sxcedgh2przPQ/tNiEbCOZk6Q.jpg?size=776x1080&quality=95&sign=60cb41fe1dee57918718134033536bd9&type=album', authorName: 'Никита', comment: 'Жаңа жыл құтты болсын, аудармашы қажет болмауы үшін қазақ тілін үйрену керек, бірақ мен бұған жете алмаймын деп ойлаймын' },
        { authorIcon: 'https://sun9-12.userapi.com/impg/akyaXzn3CiCA9uo-GFgHnzbyqys0Oi2A_cXzVA/_ddVuwqs2bc.jpg?size=696x777&quality=96&sign=449250e9b756981e060aa55db92b4123&type=album', authorName: 'Павел', comment: 'Раньше я боялся всего, но, после прохождения обучения, я боюсь всего, кроме программирования.' }
    ]
    return (

        <section className='comments__section'>
            <div className="site__content">
                <p className="section__title">Отзывы реальных пользователей</p>
                <div className="comments">
                {comments.map((item, index) => 
                <div className={"comment " + (index === currentComment ? "active" : "")} onClick={()=>{setCurrentComment(index)}} key={index}>
                    <img src={item.authorIcon} alt="icon" />
                    <p className="author__name">{item.authorName}</p>
                    <p className="text">{item.comment}</p>
                </div>
                )}
</div>
            </div>
        </section>
    )
}


export default SectionComments