import React, {useState} from 'react';
import './style.css';

function SectionComments() {
    const [currentComment, setCurrentComment] = useState(2);
    const comments = [
        { authorIcon: 'https://sun9-67.userapi.com/impg/j0fpDZzKEmEn-IYU1Mzb9KC2v8_woZB5SKVM3w/0_5_gZgAgUE.jpg?size=480x480&quality=96&sign=860c5c9350380d2af941257153b17ba7&type=album', authorName: 'Кирилл', comment: 'Я очень долго изучал программирование и думал, что знаю всё. Данный сайт помог мне в этом удостовериться!' },
        { authorIcon: 'https://sun9-86.userapi.com/impg/CrA5Fk6E2wuPbKYgfuQzAFr_fnP8hVmhlPzkZw/9vXeCp2tyQg.jpg?size=915x915&quality=96&sign=78b6cfe460bb7afea15555bed41e4694&type=album', authorName: 'Захар', comment: 'Когда я зашел на сайт, то был удивлен... Я сразу понял, что над дизайном сайта решили не заморачиваться.' },
        { authorIcon: 'https://sun9-74.userapi.com/impg/Ki1iTLdZXoy3DK1zgWJCfai54M_qheUTm0J19Q/JesiDpgnW1g.jpg?size=828x854&quality=96&sign=4025b8ff1b4d1869e5d8505e0ec14761&type=album', authorName: 'Антон', comment: 'Очень хороший сайт. Сразу видно, что разработчик делал его не один день и вложил в этот сайт свою душу.' },
        { authorIcon: 'https://sun9-3.userapi.com/impg/7lyEd_ZuDgvHjo0Z8Gn5vcBndLMcUt7AouaxgA/lr2ilogMdFs.jpg?size=669x669&quality=96&sign=45d0d4b3bc1d268543826292c860ed0d&type=album', authorName: 'Никита', comment: 'У меня нет слов, чтобы описать те чувства, которые я испытал при использовании сайта😉💋' },
        { authorIcon: 'https://sun9-81.userapi.com/impg/V_Vrwxt9jBzZ4LBOUJ0C1aTWoe75ZKGMrNuNOQ/0UBvxKDCAdc.jpg?size=147x147&quality=96&sign=4e58cb1d3369f4d2d2c66cf168b237c9&type=album', authorName: 'Павел', comment: 'Раньше я боялся всего, но, после прохождения обучения, я боюсь всего, кроме программирования.' }
    ]
    return (

        <section className='comments__section'>
            <div className="site__content">
                <p className="section__title">Отзывы реальных <mark> пользователей</mark></p>
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