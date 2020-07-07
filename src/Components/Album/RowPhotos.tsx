import React from 'react'
import {includedPtoto} from './Album'

interface Props {
    refs: Array<React.RefObject<any>>,
    row: Array<includedPtoto>,
    children? : React.ReactNode,
    ind: number,
    domain: string,
    count: number
}

const testRow : Array<includedPtoto> = [
    {
        small: {
            id: 'https://lh3.googleusercontent.com/proxy/C07cHzIZ1fKUe8tpg1J7NlCC-WUkTjH6n30iGt3dTZxum9PtasGFe9ye_GF_Vt7yeJxyZI6rgwUwVpS6NEK6AKKHpNcMjPN_9JYZxCsqB8MIhLpFgZ215K3_WrKquiQuVWT9OqTU-mMVo8FLI26NYY65HARtDWMz31L_yk-703qkfBnOziQ',
            width: 1080,
            height: 1080,
        },
        medium: {
            id: 'https://lh3.googleusercontent.com/proxy/C07cHzIZ1fKUe8tpg1J7NlCC-WUkTjH6n30iGt3dTZxum9PtasGFe9ye_GF_Vt7yeJxyZI6rgwUwVpS6NEK6AKKHpNcMjPN_9JYZxCsqB8MIhLpFgZ215K3_WrKquiQuVWT9OqTU-mMVo8FLI26NYY65HARtDWMz31L_yk-703qkfBnOziQ',
            width: 1080,
            height: 1080,
        },
        large: {
            id: 'https://lh3.googleusercontent.com/proxy/C07cHzIZ1fKUe8tpg1J7NlCC-WUkTjH6n30iGt3dTZxum9PtasGFe9ye_GF_Vt7yeJxyZI6rgwUwVpS6NEK6AKKHpNcMjPN_9JYZxCsqB8MIhLpFgZ215K3_WrKquiQuVWT9OqTU-mMVo8FLI26NYY65HARtDWMz31L_yk-703qkfBnOziQ',
            width: 1080,
            height: 1080,
        },
    },
    {
        small: {
            id: 'https://aboveart.ru/wp-content/uploads/2019/02/Feliks-K-%D0%B2-Instagram-%C2%AB%E2%80%9CNeon-Night%E2%80%9D-24%E2%80%9D-x-30%E2%80%9D-acrylic-on-gallery-canvas-sold.-Time-for-a-GIVEAWAY-%F0%9F%8E%8A%F0%9F%91%8F%F0%9F%8F%BC-As-a-way-to-thank-you-all-for-your-continued-support-and%E2%80%A6%C2%BB-Google-Chrome.jpg',
            width: 430,
            height: 537,
        },
        medium: {
            id: 'https://cs12.pikabu.ru/post_img/big/2019/11/08/5/1573196688136610627.jpg',
            width: 1050,
            height: 2060,
        },
        large: {
            id: 'https://cs12.pikabu.ru/post_img/big/2019/11/08/5/1573196688136610627.jpg',
            width: 1050,
            height: 2060,
        },
    },
    {
        small: {
            id: 'https://kartinki-dlya-srisovki.ru/wp-content/uploads/2019/02/peyzazh-dlya-srisovki-1.jpg',
            width: 747,
            height: 600,
        },
        medium: {
            id: 'https://kartinki-dlya-srisovki.ru/wp-content/uploads/2019/02/peyzazh-dlya-srisovki-1.jpg',
            width: 747,
            height: 600,
        },
        large: {
            id: 'https://kartinki-dlya-srisovki.ru/wp-content/uploads/2019/02/peyzazh-dlya-srisovki-1.jpg',
            width: 747,
            height: 600,
        },
    },
]

const RowPhotos = (props : Props) => {
    const scrollToRef = (ref : React.RefObject<any>) => window.scrollTo(0, ref.current.offsetTop) 

    let {refs, ind, count, row, domain} = props
    if(row.length === 0) {
        return <></>
    }
    let arrayWidth : Array<number> = []
    let width : number = 0

    //row = testRow

    row.forEach(item => {
        arrayWidth.push(row[0].small.height/item.small.height * item.small.width)
        width += row[0].small.height/item.small.height * item.small.width
    })

    console.log(row, arrayWidth, width)

    return (
        <div className='album-photos-row' >
            {row.map((photo, index) => {
                console.log(ind, index, count)
                return (
                    <a onClick={() => scrollToRef(refs[ind - count + 1 + index])} ref={refs[ind - count + 1 + index]} className='album-photo' href={`#photoview-${ind - count + 1 + index}`} style={{width: `${arrayWidth[index] * 99 / width}%`}}>
                        <img 
                            src={photo.small.id}
                            alt={`${domain}${photo.small.id}`}
                            onClick={() => {console.log(`click ${ind - count + index + 1}`); }}
                        />
                    </a>
                )
                })}
        </div>
    )
}

export default RowPhotos