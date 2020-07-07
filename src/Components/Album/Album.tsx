import React, { useState, useEffect, useRef, createRef } from 'react'
import './Album.css'
import { Redirect, useHistory } from 'react-router-dom'
import RowPhotos from './RowPhotos'
import PhotoViewr from './PhotoViewer'

interface Album {
    data: {
        id: string,
        type: string,
        attributes: {
            id: number,
            name: string,
            real_date: string,
        },
        relationships: {
            photos: {
                data: Array<{
                    id: string,
                    type: string,
                    cover: {
                        data: {
                            id: string,
                            type: string,
                        }
                    }
                }>
            }
        }
    },
    included: Array<{
        id: string,
        type: string,
        attributes: {
            id: number,
            title: string,
            data: {
                id: string,
                storage: string,
                metadata: {
                    filename: string,
                    size: number,
                    mime_type: string,
                    width: number,
                    height: number,
                },
                derivatives: {
                    small: {
                        id: string,
                        storage: string,
                        metadata: {
                            filename: string,
                            size: number,
                            mime_type: string,
                            width: number,
                            height: number,
                        }
                    },
                    medium: {
                        id: string,
                        storage: string,
                        metadata: {
                            filename: string,
                            size: number,
                            mime_type: string,
                            width: number,
                            height: number,
                        }
                    },
                    large: {
                        id: string,
                        storage: string,
                        metadata: {
                            filename: string,
                            size: number,
                            mime_type: string,
                            width: number,
                            height: number,
                        }
                    },
                }
            }
        }
    }>
}

interface HashTable<T> {
    [key: string] : T
}

export interface includedPtoto {
    small: {
        id: string,
        width: number,
        height: number,
    },
    medium: {
        id: string,
        width: number,
        height: number,
    },
    large: {
        id: string,
        width: number,
        height: number,
    },
}

const album : Album = require('./album.json')

const baseCountPhotos = 6
const countPhotosInRow = 3
const domain = 'https://media.itmo.ru/photos/'

const Album = (props : any) => {
    console.log(props.location.hash)

    let [countPhotos, setCountPhotos] = useState(baseCountPhotos)
    let [escape, setEscape] = useState(false)

    let refs : Array<React.RefObject<any>> = []

    const handleWindowMouseMove = (event? : any) => {
        let scrollTop = document.documentElement.scrollTop;
        let t1 = document.getElementById('album-page-load-photos')?.offsetTop
        let t3 = window.innerHeight
        if(scrollTop !== undefined && t1 !== undefined ) {
            if(scrollTop + t3 >= t1) {
                window.removeEventListener('scroll', handleWindowMouseMove);
                let maxLength = album.data.relationships.photos.data.length
                setCountPhotos(Math.min(countPhotos + baseCountPhotos, maxLength))
            }
        }
    }

    let isVisiblePhotoView = false

    useEffect(() => {
        window.addEventListener('scroll', handleWindowMouseMove)
        return () => {
            window.removeEventListener('scroll', handleWindowMouseMove);
        }
    })

    let photoIndex = -1;

    if(props.location.hash.indexOf('photoview-') !== -1 ) {
        document.body.style.overflow = 'hidden'
        photoIndex = parseInt(props.location.hash.split('-')[1], 10)
        if(isNaN(photoIndex) || photoIndex >= album.data.relationships.photos.data.length) {
            return <Redirect to={props.location.pathname}/>
        } else {
            isVisiblePhotoView = true
        }
    } else {
        document.body.style.overflow = 'auto'
    }

    if(escape && props.location.hash === '') {
        setEscape(false)
    }

    if(escape) {
        console.log('redirect')
        return <Redirect to={props.location.pathname}/>
    }

    let albumHashIncluded : HashTable<includedPtoto> = {}

    album.included.forEach(item => {
        albumHashIncluded[`${item.id}`] = {
            small: {
                id: item.attributes.data.derivatives.small.id,
                width: item.attributes.data.derivatives.small.metadata.width,
                height: item.attributes.data.derivatives.small.metadata.height,
            },
            medium: {
                id: item.attributes.data.derivatives.medium.id,
                width: item.attributes.data.derivatives.medium.metadata.width,
                height: item.attributes.data.derivatives.medium.metadata.height,
            },
            large: {
                id: item.attributes.data.derivatives.large.id,
                width: item.attributes.data.derivatives.large.metadata.width,
                height: item.attributes.data.derivatives.large.metadata.height,
            },
        }
    })


    let row : Array<includedPtoto> = []
    let rows : Array<JSX.Element> = []

    let photos : Array<includedPtoto> = []

    console.log(countPhotos)
    album.data.relationships.photos.data.slice(0, countPhotos).forEach((photo, ind) => {
        let item = albumHashIncluded[photo.id]
        console.log(item)
        if(item) {
            row.push(item)
            refs.push(createRef())
            photos.push(item)
        }
        if(row.length === countPhotosInRow || album.data.relationships.photos.data.slice(0, countPhotos).length - 1 === ind) {
            let count = row.length
            rows.push(
                <RowPhotos row={row} refs={refs} ind={ind} count={count} domain={domain}/>
            )
            row = []
        }
    })

    console.log(isVisiblePhotoView)

    let count = album.data.relationships.photos.data.length

    if(isVisiblePhotoView && photoIndex === countPhotos  - 1 && countPhotos !== count) {
        let maxLength = album.data.relationships.photos.data.length
        setCountPhotos(Math.min(countPhotos + baseCountPhotos, maxLength))
    }

    return (
        <div className={'album-block'}>
            <div className='album-header'>
                <h1>{album.data.attributes.name}</h1>
                <div className='album-header-block'>
                    <img src={''} alt=''/>
                    <div className='album-header-authors'>
                        {/* {album.authors.map(author => <div className='album-header-author'>{author}</div>)} */}
                    </div>
                    <div className='album-header-date'>
                        {album.data.attributes.real_date}
                    </div>
                </div>
            </div>
            
            <div className='albums-photos-block'>
                {rows.map(Row => Row)}
            </div>
            {countPhotos < count ? <div id='album-page-load-photos' className='loader-album' /> : null}
            {isVisiblePhotoView ? 
                <PhotoViewr photos={photos} photoIndex={photoIndex} refs={refs} count={count} location={props.location} />
                : null
            }
        </div>
    )
}

export default Album