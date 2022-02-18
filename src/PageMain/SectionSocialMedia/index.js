import React from 'react';
import './style.css';
import socialMediaVK from './image/vk.svg';
import socialMediaYoutube from './image/youtube.svg';
import socialMediaGitHub from './image/github.svg';
import socialMediaTelegram from './image/telegram.svg';
import socialMediaInst from './image/inst.svg';
function SectionComments() {
    let socialMediaSource = [
        { name: 'VK', link: 'https://vk.com/id174109839', icon: socialMediaVK },
        { name: 'YouTube', link: 'https://www.youtube.com/channel/UCprkCrE3SSt2j4sXJnlAa-Q', icon: socialMediaYoutube },
        { name: 'GitHub', link: 'https://github.com/GA-02', icon: socialMediaGitHub },
        { name: 'Telegram', link: 'https://t.me/ggaekinf', icon: socialMediaTelegram },
        { name: 'Instagram', link: 'https://www.instagram.com/ggaek_gomel', icon: socialMediaInst },
    ];
    return (

        <section className='social-media__section'>
            <div className="site__content">
                <p className="section__title">Связь с автором</p>
                <p className="section__description">Связаться с автором, а также узнать последние новости о продукте вы можете здесь</p>

                <div className="social-media">
                    {socialMediaSource.map((item, index) =>
                        <div className="social-media__item" key={index}>
                            <a href={item.link}><img src={item.icon} alt={item.name} className="icon" /></a>
                            <p className="name">{item.name}</p>
                        </div>)}
                </div>
            </div>
        </section>
    )
}


export default SectionComments