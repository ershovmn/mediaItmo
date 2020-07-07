import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

let albums1 = [
    {name: 'ОТКРЫТЫЙ ЧЕМПИОНАТ ИТМО ПО НАСТОЛЬНОМУ ТЕННИСУ (3 ТУР)', date: '14 марта 2020', photo: 'https://media.itmo.ru/images/Album/1968/album/big/p1968.jpg', id: 0},
    {name: 'ХАКАТОН ПО МАШИННОМУ ОБУЧЕНИЮ MLHACK', date: '15 марта 2020', photo: 'https://media.itmo.ru/images/Album/1960/album/big/p1960.jpg', id: 1},
    {name: 'ЛИГА ИТМО ПО МИНИ-ФУТБОЛУ. ФИНАЛЫ', date: '15 марта 2020', photo: 'https://media.itmo.ru/images/Album/1966/album/big/p1966.jpg', id: 2},
    {name: 'ОТКРЫТЫЙ КОМАНДНЫЙ МИКСТ ИТМО ПО НАСТОЛЬНОМУ ТЕННИСУ', date: '15 марта 2020', photo: 'https://media.itmo.ru/images/Album/1965/album/big/p1965.jpg', id: 3},
    {name: 'ОТКРЫТЫЙ ГОРОДСКОЙ ТУРНИР ПО ШАХМАТАМ, ПОСВЯЩЁННЫЙ МЕЖДУНАРОДНОМУ ЖЕНСКОМУ ДНЮ', date: '10 марта 2020', photo: 'https://media.itmo.ru/images/Album/1964/album/big/p1964.jpg', id: 4},
    {name: 'КУРИЛКА ГУТЕНБЕРГА / 17.03.2020', date: '17 марта 2020', photo: 'https://media.itmo.ru/images/Album/1963/album/big/p1963.jpg', id: 5},
    {name: 'ОТКРЫТЫЙ ТУРНИР ПО ДЕБАТАМ О КУЛЬТУРЕ', date: '13 марта 2020', photo: 'https://media.itmo.ru/images/Album/1962/album/big/p1962.jpg', id: 6},
    {name: 'MEGAQUIZ ITMO.MEGABATTLE', date: '13 марта 2020', photo: 'https://media.itmo.ru/images/Album/1961/album/big/p1961.jpg', id: 7},
    {name: 'MEGAQUIZ ITMO.MEGABATTLE', date: '13 марта 2020', photo: 'https://media.itmo.ru/images/Album/1961/album/big/p1961.jpg', id: 8},
    {name: 'MEGAQUIZ ITMO.MEGABATTLE', date: '13 марта 2020', photo: 'https://media.itmo.ru/images/Album/1961/album/big/p1961.jpg', id: 9},
    {name: 'ДЕНЬ ОТКРЫТЫХ ДВЕРЕЙ МЕГАФАКУЛЬТЕТА БИОТЕХНОЛОГИЙ И НИЗКОТЕМПЕРАТУРНЫХ СИСТЕМ', date: '15 марта 2020', photo: 'https://media.itmo.ru/images/Album/1959/album/big/p1959.jpg', id: 10},
]

const Home = () => {
    let [albums, setAlbums] = useState(albums1)

    useEffect(() => {
        const handleWindowMouseMove = (event : any) => {
            let scrollTop = document.documentElement.scrollTop;
            let t1 = document.getElementById('last-album-home-page')?.offsetTop
            let t3 = window.innerHeight
            if(scrollTop !== undefined && t1 !== undefined ) {
                if(scrollTop + t3 >= t1) {
                        //console.log('start', new Date().getTime())
                        window.removeEventListener('scroll', handleWindowMouseMove);
                        setAlbums(albums.concat(albums1))
                        //console.log(albums.length)
                }
            }
        }
        window.addEventListener('scroll', handleWindowMouseMove)
        return () => window.removeEventListener('scroll', handleWindowMouseMove);
    })

    let array : Array<{name: string, date: string, photo : string, id: number}> = []
    let albumsElements : Array<JSX.Element> = []

    let lastCount = 2;

    albums.forEach(album => {
        array.push(album)
        if(array.length === 3) {
            albumsElements.push (
                    <div className='homeAlbumsBlock'>
                        {array.map(item => <Link className='homeAlbumBlock'  to={`/album/${album.id}`}>
                            <div style={{width: '100%', overflow: 'hidden'}}>
                                <img src={item.photo} data-src={item.photo} alt={item.name} width='100%' />
                            </div>
                            <div className='homeAlbumOpacity' />
                            <div style={{overflow: 'hidden', position: 'absolute', top: '0px', left: '0px', fontWeight: 'bold', color: 'white'}}>{item.name}</div>
                        </Link>)}
                    </div>
            )
            lastCount = 2 + (lastCount - 1) % 2
            array = []
        }
    })

    return (
        <div className='homeMainBlock'>
            {
                albumsElements.map((element) => element)
            }
            <div id='last-album-home-page'><div className='loaderHome'></div></div>
        </div>
    )
}

export default Home