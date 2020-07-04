import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='footerItem'>
                <h1>Информация</h1>
            </div>
            <div className='footerItem'>
                <h1>Присоединяйтесть</h1>
            </div>
            <div className='footerItem'>
                <h1>Контакты</h1>
                <p>
                    <img src={require('../../images/geo.png')} height='30vh' alt='mail'/>
                    197101, Санкт-Петербург, пр. Кронверкский, д. 49
                </p>
                <p>
                    
                    <a href='tel:+7 (812) 233-38-22'>
                    <img src={require('../../images/tel.png')} height='30vh' alt='mail'/>
                        <div>+7 (812) 233-38-22</div>
                    </a>
                </p>
                <p>
                    
                    <a href='mailto:ialexey@corp.ifmo.ru'>
                        <img src={require('../../images/mail.png')} height='30vh' alt='mail'/>
                        Обратная связь
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer