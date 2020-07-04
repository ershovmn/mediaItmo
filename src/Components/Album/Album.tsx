import React, { useState, useEffect } from 'react'
import './Album.css'

const HashTable = require('hashtable')

interface PhotoType {
    url: string,
    name: string,
    tags: Array<string>,
    index: number,
    size: {
        x: number,
        y: number,
    }
}

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

const album : Album = require('./album.json')

const AlbumPhotosRow = (photos : Array<PhotoType>, countPhotos : number) => {
    return (
        <div className='album-photos-row'>
            
        </div>
    )
}

const baseCountPhotos = 10
const domain = '/'

const Album = () => {
    let [countPhotos, setCountPhotos] = useState(baseCountPhotos)

    useEffect(() => {
        const handleWindowMouseMove = (event : any) => {
            let scrollTop = document.documentElement.scrollTop;
            let t1 = document.getElementById('album-page-load-photos')?.offsetTop
            let t3 = window.innerHeight
            if(scrollTop !== undefined && t1 !== undefined ) {
                if(scrollTop + t3 >= t1) {
                        //console.log('start', new Date().getTime())
                        window.removeEventListener('scroll', handleWindowMouseMove);
                        setCountPhotos(countPhotos + baseCountPhotos)
                        //console.log(albums.length)
                }
            }
        }
        window.addEventListener('scroll', handleWindowMouseMove)
        return () => window.removeEventListener('scroll', handleWindowMouseMove);
    })

    let albumHashIncluded = new HashTable<string, {
        small: {id: string, width: number, height: number}, 
        medium: {id: string, width: number, height: number}, 
        large: {id: string, width: number, height: number},
    }>()

    album.included.forEach(item => {
        albumHashIncluded.put(item.id, {
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
        })
    })

    console.log(albumHashIncluded)

    const rows = []
    const row = []

    return (
        <div className='album-block'>
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
                
            </div>
            <div id='album-page-load-photos' className='loader-album' />
        </div>
    )
}

export default Album