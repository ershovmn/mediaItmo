import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'


const menuItems = [
    // {name: 'Радио', url: '/radio/'},
    {name: 'Поиск', url: '/search/'},
    // {name: 'Журнал', url: 'https://mbradio.ru/magazines/'},
    // {name: 'Актовый зал', url: '/auditorium/'},
    // {name: 'Газета', url: 'https://mbradio.ru/newspapers/'},
    // {name: 'Контакты', url: '/contacts/'}
]

const Header = () => {
    let [visibleMenu, setVisibleMenu] = useState(false)
    let [visibleIcon, setVisibleIcon] = useState(false)


    useEffect(() => {
        const onScroll = () => {
            setVisibleMenu(false)
            if(document.documentElement.scrollTop >= 80) {
                setVisibleIcon(true)
            } else {
                setVisibleIcon(false)
            }
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    })

    return (
        <>
        <header className='header'>
            <div className='headerLeft'>
                <Link to='/'>
                    <img src={require('../../images/home.png')} alt='home'/>
                </Link>
                {/* <Link to='https://itmo.ru/'>
                    <img src={require('../../images/itmo.png')} alt='home'/>
                </Link>
                <Link to='https://radio.ifmo.ru/'>
                    <img src={require('../../images/megabyte.png')} alt='home'/>
                </Link> */}
            </div>
            <div className='headerRight'>
                <ul>
                    {menuItems.map((item, index) => <Link to={item.url}><li>{item.name}</li></Link>)}
                </ul>
            </div>
        </header>
        {visibleMenu ? 
            <header className='headerFixed'>
                <div className='headerLeft'>
                    <Link to='/'>
                        <img src={require('../../images/home.png')} alt='home'/>
                    </Link>
                    {/* <Link to='https://itmo.ru/'>
                        <img src={require('../../images/itmo.png')} alt='home'/>
                    </Link>
                    <Link to='https://radio.ifmo.ru/'>
                        <img src={require('../../images/megabyte.png')} alt='home'/>
                    </Link> */}
                </div>
                <div className='headerRight'>
                    <ul>
                        {menuItems.map((item, index) => <Link to={item.url}><li>{item.name}</li></Link>)}
                    </ul>
                </div>
            </header>
            : null
        }
        {(visibleIcon && !visibleMenu) ? 
            <div className='iconMenu' onMouseEnter={() => setVisibleMenu(true)}>
                <img src={require('../../images/home.png')} alt='menu'/>
            </div>
            : null
        }
        </>
    )
}

export default Header