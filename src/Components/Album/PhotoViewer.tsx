import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

const PhotoViwer = (props : any) => {
    let [escape, setEscape] = useState(false)
    let [size, setSize] = useState({
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    })

    const scrollToRef = (ref : React.RefObject<any>) => window.scrollTo(0, ref.current.offsetTop) 

    const handleEscEnter = (event : any) => {
        console.log(event.key)
        if(event.key === 'Escape') {
            setEscape(true)
        }
        if(event.key === 'ArrowRight') {
            document.getElementById('next-photo-link')?.click()
        }
        if(event.key === 'ArrowLeft') {
            document.getElementById('prev-photo-link')?.click()
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleEscEnter, false)
        return () => {
            window.removeEventListener('keyup', handleEscEnter, false)
        }
    })

    useLayoutEffect(() => {
        const updateSize = () => {
            setSize({
                w: document.documentElement.clientWidth, 
                h: document.documentElement.clientHeight
            })
        }
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    let history = useHistory()

    if(escape && props.location.hash === '') {
        setEscape(false)
    }

    if(escape) {
        console.log('redirect')
        return <Redirect to={props.location.pathname}/>
    }

    let {count, refs, photoIndex, photos} = props

    document.body.style.overflow = 'hidden'

    console.log(photos[photoIndex])

    if(!photos[photoIndex]) {
        return (
            <Redirect to={props.location.pathname} />
        )
    }

    let width = photos[photoIndex].small.width 
    let height = photos[photoIndex].small.height

    let mobile = size.w <= 700

    let maxHeight = size.h * 0.75
    let maxWidth = size.w * (mobile ? 1 : 0.5)

    let c1 = width/height
    let c2 = maxWidth/maxHeight

    console.log({maxHeight, maxWidth, height, width, c1, c2, mobile})

    let style1 = {}



    if(c1 >= c2) {
        style1={width: '100%', marginTop: `${maxHeight / 2 - (maxWidth/width) * height / 2}px`}
    } else {
        style1={height: '100%', marginLeft: `${maxWidth / 2 - (maxHeight/height) * width / 2}px`}
    }

    return (
        <>
            <div style={{position: 'fixed', top: '0px', left: '0px', width: '100vw', height: '100vh', backgroundColor: 'grey', opacity: 0.7}}></div>
            <div className='photo-view'>
                <div className='photo-view-photo' onClick={() => {}}>
                    <img style={style1} onClick={() => {}} src={photos[photoIndex].small.id} alt=''/>
                </div>
                <div onClick={() => history.push('#')} style={{position: 'fixed', top: '0px', left: '0px', width: '100vw', height: '100vh'}}/>
                <div className='control-block'>
                    {photoIndex > 0 ? 
                        <a onClick={() => scrollToRef(refs[photoIndex - 1])} id='prev-photo-link' href={`#photoview-${photoIndex - 1}`} className='control-prev'>
                            <img src={require('../../images/arrow_left.png')} alt=''/>
                        </a> : 
                        <div className='control-prev'></div> 
                    }
                    {photoIndex < count - 1 ? 
                        <a onClick={() => scrollToRef(refs[photoIndex + 1])} id='next-photo-link' href={`#photoview-${photoIndex + 1}`} className='control-next'>
                            <img src={require('../../images/arrow_right.png')} alt=''/>
                        </a> : 
                        <div className='control-next'></div> 
                    }
                </div>
                
            </div> 
        </>
    )
}

export default PhotoViwer