import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import flag from './assets/1.png'
import balloonOne from './assets/balloon1.png'
import balloonTwo from './assets/balloon2.png'
import decorate from './assets/decorate.png'
import decorateFlower from './assets/decorate_flower.png'
import hat from './assets/hat.png'
import heartImg from './assets/heart.png'
import heartLetter from './assets/heart_letter.png'
import loveImg from './assets/love.png'
import mewmewGif from './assets/mewmew.gif'
import profileImg from './assets/unnamed.png'
import smiley from './assets/smiley_icon.png'

const dateText = '27 May'
const letterTitle = 'To you'
const letterBody =
    'My love. You are a very special girl. I always silently thank you for coming into my life. Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you.💕'

function App() { 
    const [typedDate, setTypedDate] = useState('')
    const [showDateStars, setShowDateStars] = useState(false)
    const [isMailOpen, setIsMailOpen] = useState(false)
    const [isLetterOpen, setIsLetterOpen] = useState(false)
    const [isLetterBorderVisible, setIsLetterBorderVisible] = useState(false)
    const [typedTitle, setTypedTitle] = useState('')
    const [typedLetter, setTypedLetter] = useState('')
    const [isLetterMotionOn, setIsLetterMotionOn] = useState(false)
    const [areHeartsFloating, setAreHeartsFloating] = useState(false)
    const dateTimeoutsRef = useRef<number[]>([])
    const dateIntervalsRef = useRef<number[]>([])
    const letterTimeoutsRef = useRef<number[]>([])
    const letterIntervalsRef = useRef<number[]>([])

    useEffect(() => {
        const startTimeout = window.setTimeout(() => {
            let index = 0
            const intervalId = window.setInterval(() => {
                index += 1
                setTypedDate(dateText.slice(0, index))
                if (index >= dateText.length) {
                    window.clearInterval(intervalId)
                    setShowDateStars(true)
                }
            }, 100)
            dateIntervalsRef.current.push(intervalId)
        }, 12000)
        dateTimeoutsRef.current.push(startTimeout)

        return () => {
            dateTimeoutsRef.current.forEach((id) => window.clearTimeout(id))
            dateIntervalsRef.current.forEach((id) => window.clearInterval(id))
        }
    }, [])

    const clearLetterTimers = useCallback(() => {
        letterTimeoutsRef.current.forEach((id) => window.clearTimeout(id))
        letterIntervalsRef.current.forEach((id) => window.clearInterval(id))
        letterTimeoutsRef.current = []
        letterIntervalsRef.current = []
    }, [])

    useEffect(() => () => clearLetterTimers(), [clearLetterTimers])

    const openLetter = () => {
        clearLetterTimers()
        setIsLetterOpen(true)
        setIsLetterBorderVisible(false)
        setTypedTitle('')
        setTypedLetter('')
        setIsLetterMotionOn(false)
        setAreHeartsFloating(false)

        const borderTimeout = window.setTimeout(() => {
            setIsLetterBorderVisible(true)
        }, 1000)
        letterTimeoutsRef.current.push(borderTimeout)

        const titleTimeout = window.setTimeout(() => {
            let index = 0
            const titleInterval = window.setInterval(() => {
                index += 1
                setTypedTitle(letterTitle.slice(0, index))
                if (index >= letterTitle.length) {
                    window.clearInterval(titleInterval)
                }
            }, 100)
            letterIntervalsRef.current.push(titleInterval)
        }, 2000)
        letterTimeoutsRef.current.push(titleTimeout)

        const motionTimeout = window.setTimeout(() => {
            setIsLetterMotionOn(true)
        }, 2800)
        letterTimeoutsRef.current.push(motionTimeout)

        const heartsTimeout = window.setTimeout(() => {
            setAreHeartsFloating(true)
        }, 3500)
        letterTimeoutsRef.current.push(heartsTimeout)

        const letterTimeout = window.setTimeout(() => {
            let index = 0
            const letterInterval = window.setInterval(() => {
                index += 1
                setTypedLetter(letterBody.slice(0, index))
                if (index >= letterBody.length) {
                    window.clearInterval(letterInterval)
                }
            }, 50)
            letterIntervalsRef.current.push(letterInterval)
        }, 6000)
        letterTimeoutsRef.current.push(letterTimeout)
    }

    const closeLetter = () => {
        clearLetterTimers()
        setIsLetterOpen(false)
        setIsLetterBorderVisible(false)
        setTypedTitle('')
        setTypedLetter('')
        setIsLetterMotionOn(false)
        setAreHeartsFloating(false)
    }

    return (
        <div id="wrapper">
            <div className="flag__birthday">
                <img src={flag} alt="" width={350} className="flag__left" />
                <img src={flag} alt="" width={350} className="flag__right" />
            </div>

            <div className="content">
                <div className="left">
                    <div className="title">
                        <h1 className="happy">
                            <span style={{ '--t': '4s' } as CSSProperties}>H</span>
                            <span style={{ '--t': '4.2s' } as CSSProperties}>a</span>
                            <span style={{ '--t': '4.4s' } as CSSProperties}>p</span>
                            <span style={{ '--t': '4.6s' } as CSSProperties}>p</span>
                            <span style={{ '--t': '4.8s' } as CSSProperties}>y</span>
                        </h1>
                        <h1 className="birthday">
                            <span style={{ '--t': '5s' } as CSSProperties}>B</span>
                            <span style={{ '--t': '5.2s' } as CSSProperties}>i</span>
                            <span style={{ '--t': '5.4s' } as CSSProperties}>r</span>
                            <span style={{ '--t': '5.6s' } as CSSProperties}>t</span>
                            <span style={{ '--t': '5.8s' } as CSSProperties}>h</span>
                            <span style={{ '--t': '6s' } as CSSProperties}>d</span>
                            <span style={{ '--t': '6.2s' } as CSSProperties}>a</span>
                            <span style={{ '--t': '6.4s' } as CSSProperties}>y</span>
                        </h1>
                        <div className="hat">
                            <img src={hat} alt="" width={130} />
                        </div>
                    </div>

                    <div className="date__of__birth">
                        {showDateStars && <i className="fa-solid fa-star" aria-hidden="true" />}
                        <span>{typedDate}</span>
                        {showDateStars && <i className="fa-solid fa-star" aria-hidden="true" />}
                    </div>

                    <div className="btn">
                        <button id="btn__letter" type="button" onClick={openLetter}>
                            <div className="mail" onClick={() => setIsMailOpen(true)}>
                                Click Here Rehana
                                <i className="fa-regular fa-envelope" aria-hidden="true" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="right">
                    <div className="box__account">
                        <div className="image">
                            <img src={profileImg} alt="" />
                        </div>
                        <div className="name">
                            <i className="fa-solid fa-heart" aria-hidden="true" />
                            <span>Dear Rehana</span>
                            <i className="fa-solid fa-heart" aria-hidden="true" />
                        </div>
                        <div className="balloon_one">
                            <img width={100} src={balloonOne} alt="" />
                        </div>
                        <div className="balloon_two">
                            <img width={100} src={balloonTwo} alt="" />
                        </div>
                    </div>
                    <div className="cricle">
                        <div className="text__cricle">
                            <span style={{ '--i': 1 } as CSSProperties}>h</span>
                            <span style={{ '--i': 2 } as CSSProperties}>a</span>
                            <span style={{ '--i': 3 } as CSSProperties}>p</span>
                            <span style={{ '--i': 4 } as CSSProperties}>p</span>
                            <span style={{ '--i': 5 } as CSSProperties}>y</span>
                            <span style={{ '--i': 6 } as CSSProperties}>-</span>
                            <span style={{ '--i': 7 } as CSSProperties}>b</span>
                            <span style={{ '--i': 8 } as CSSProperties}>i</span>
                            <span style={{ '--i': 9 } as CSSProperties}>r</span>
                            <span style={{ '--i': 10 } as CSSProperties}>t</span>
                            <span style={{ '--i': 11 } as CSSProperties}>h</span>
                            <span style={{ '--i': 12 } as CSSProperties}>d</span>
                            <span style={{ '--i': 13 } as CSSProperties}>a</span>
                            <span style={{ '--i': 14 } as CSSProperties}>y</span>
                            <span style={{ '--i': 15 } as CSSProperties}>-</span>
                        </div>
                        <i className="fa-solid fa-heart" aria-hidden="true" />
                    </div>
                </div>
            </div>

            <div className="decorate_star star1" style={{ '--t': '15s' } as CSSProperties} />
            <div className="decorate_star star2" style={{ '--t': '15.2s' } as CSSProperties} />
            <div className="decorate_star star3" style={{ '--t': '15.4s' } as CSSProperties} />
            <div className="decorate_star star4" style={{ '--t': '15.6s' } as CSSProperties} />
            <div className="decorate_star star5" style={{ '--t': '15.8s' } as CSSProperties} />

            <div className="decorate_flower--one" style={{ '--t': '15s' } as CSSProperties}>
                <img width={20} src={decorateFlower} alt="" />
            </div>
            <div className="decorate_flower--two" style={{ '--t': '15.3s' } as CSSProperties}>
                <img width={20} src={decorateFlower} alt="" />
            </div>
            <div className="decorate_flower--three" style={{ '--t': '15.6s' } as CSSProperties}>
                <img width={20} src={decorateFlower} alt="" />
            </div>
            <div className="decorate_bottom">
                <img src={decorate} alt="" width={100} />
            </div>
            <div className="smiley__icon">
                <img src={smiley} alt="" width={100} />
            </div>

            <div className={`boxMail ${isMailOpen ? 'active' : ''}`}>
                <i className="fa-solid fa-xmark" aria-hidden="true" onClick={() => setIsMailOpen(false)} />
                <div className="boxMail-container">
                    <div className="card1">
                        <div className="userImg">
                            <img src={profileImg} alt="" />
                        </div>
                        <h4 className="username">
                            To: Mehwish 💖<span className="underline" />
                        </h4>

                        <h3>Happy Birthday</h3>
                        <div className="imageCute">
                            <img src={loveImg} alt="" />
                        </div>
                    </div>
                    <div className="card2">
                        <div className="card2-content">
                            <h3>To You!</h3>
                            <h2>
                                Happy birthday 🥳🎂🥳 chanda the day you come into my life I was not really much attached to you but day by
                                day you became close to my heart . And now you are truly my younger sister. I wish I could remove some of
                                the pain from your life which you are bearing alone. But you are always welcome 🤗 you can talk anytime
                                you want to talk specially those which you can not say to others. And this year your all dreams come true
                                . I wish that your brother could wish you but if could not wish on him behalf I am wishing you happy
                                birthday 🎈🎂🎈 sana . Don't be Sad ok be happy 😌
                            </h2>

                            <div className="imageCute2">
                                <img src={mewmewGif} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box__letter" style={{ display: isLetterOpen ? 'block' : 'none' }}>
                <div className="letter__border" style={{ display: isLetterBorderVisible ? 'block' : 'none' }}>
                    <div className="close" onClick={closeLetter} role="button" aria-label="Close letter">
                        <i className="fa-solid fa-xmark" aria-hidden="true" />
                    </div>
                    <div className="letter">
                        <h3 className="title__letter">
                            {typedTitle}
                            {Array.from({ length: typedTitle.length }).map((_, index) => (
                                <i key={`title-heart-${index}`} className="fa-solid fa-heart" aria-hidden="true" />
                            ))}
                        </h3>
                        <div className="content__letter">
                            <div className="left">
                                <img
                                    id="heart__letter"
                                    className={isLetterMotionOn ? 'animationOp' : ''}
                                    src={heartLetter}
                                    alt=""
                                />
                                <img
                                    className={`heart heart_1 ${areHeartsFloating ? 'animation' : ''}`}
                                    style={{ '--t': '0.5s' } as CSSProperties}
                                    src={heartImg}
                                    alt=""
                                />
                                <img
                                    className={`heart heart_2 ${areHeartsFloating ? 'animation' : ''}`}
                                    style={{ '--t': '0.8s' } as CSSProperties}
                                    src={heartImg}
                                    alt=""
                                />
                                <img
                                    className={`heart heart_3 ${areHeartsFloating ? 'animation' : ''}`}
                                    style={{ '--t': '1.1s' } as CSSProperties}
                                    src={heartImg}
                                    alt=""
                                />
                                <img
                                    className={`heart heart_4 ${areHeartsFloating ? 'animation' : ''}`}
                                    style={{ '--t': '1.4s' } as CSSProperties}
                                    src={heartImg}
                                    alt=""
                                />
                            </div>
                            <div className="right">
                                <img className={`love__img ${isLetterMotionOn ? 'animationOp' : ''}`} src={loveImg} alt="" />
                                <div className="text__letter">
                                    <p>{typedLetter}</p>
                                </div>
                                <img id="mewmew" className={isLetterMotionOn ? 'animationOp' : ''} src={mewmewGif} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
