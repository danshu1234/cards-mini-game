'use client'

import { FC, useEffect, useState } from "react";
import { initialCardsHide } from "./InitialCards";
import { initialCardsVis } from "./InitialCards";
import './globals.css'

interface Card{
    id: number,
    url: string,
    isClicked: boolean,
}

const Main: FC = () => {

    const [cards, setCards] = useState <Card[]> ([
        {id: 1, url: 'https://avatars.mds.yandex.net/i?id=52e508a5b28ef9b95479a1ca75f99691865bbfb1-4407893-images-thumbs&n=13', isClicked: false},
        {id: 2, url: 'https://avatars.mds.yandex.net/i?id=8cdb8d54c3d61e66680defbcfac90c78_l-4344598-images-thumbs&n=13', isClicked: false},
        {id: 3, url: 'https://i.pinimg.com/736x/7f/56/69/7f5669ca88385d72e76d8e993e9a9ac3.jpg', isClicked: false},
        {id: 4, url: 'https://i.pinimg.com/736x/7f/56/69/7f5669ca88385d72e76d8e993e9a9ac3.jpg', isClicked: false},
        {id: 5, url: 'https://i.pinimg.com/736x/02/37/9c/02379cfa450abd5dce6c606503e1613f.jpg', isClicked: false},
        {id: 6, url: 'https://avatars.mds.yandex.net/i?id=52e508a5b28ef9b95479a1ca75f99691865bbfb1-4407893-images-thumbs&n=13', isClicked: false},
        {id: 7, url: 'https://i.pinimg.com/736x/0a/10/bc/0a10bcb33172f782b47bb5eb9b4de6ba.jpg', isClicked: false},
        {id: 8, url: 'https://i.pinimg.com/736x/0a/10/bc/0a10bcb33172f782b47bb5eb9b4de6ba.jpg', isClicked: false},
        {id: 9, url: 'https://avatars.mds.yandex.net/i?id=8cdb8d54c3d61e66680defbcfac90c78_l-4344598-images-thumbs&n=13', isClicked: false},
        {id: 10, url: 'https://i.pinimg.com/736x/02/37/9c/02379cfa450abd5dce6c606503e1613f.jpg', isClicked: false},
    ])

    const [answer, setAnswer] = useState <string[]> ([])
    const [checkAnsw, setCheckAnsw] = useState <string> ('')

    useEffect(() => {
        const resultArr: Card[] = []
        let initialCards: Card[] = [...initialCardsVis]
        for (let i = 0; i < 10; i++) {
            if (i === 0) {
                const randomNum = Math.floor(Math.random() * 10) 
                const randomEl = initialCardsVis[randomNum]
                resultArr.push(randomEl)
                const filteredArr = initialCards.filter(item => item.id !== randomEl.id)
                initialCards = filteredArr
            } else {
                const randomNum = Math.floor(Math.random() * initialCards.length) 
                const randomEl = initialCards[randomNum]
                resultArr.push(randomEl)
                const filteredArr = initialCards.filter(item => item.id !== randomEl.id)
                initialCards = filteredArr
            }
        }
        console.log(resultArr)
        setCards(resultArr)
        setCheckAnsw('Запомните картинки')
        setTimeout(() => {
            const hideCards = resultArr.map(item => {
                return {id: item.id, url: item.url, isClicked: false}
            })
            setCards(hideCards)
            setCheckAnsw('')
        }, 5000);
    }, [])

    useEffect(() => {
        if (answer.length !== 0 && answer.length % 2 === 0 && answer.length !== 10) {
            if (answer[0] !== answer[1] || answer[2] !== answer[3] || answer[4] !== answer[5] || answer[6] !== answer[7] || answer[8] !== answer[9]) {
                setCheckAnsw('Неверно')
                setTimeout(() => {
                    setAnswer([])
                    setCards(initialCardsHide)
                    setCheckAnsw('')
                }, 1500);
            }
        } else if (answer.length === 10) {
            setCheckAnsw('Поздравляем, вы выиграли!')
            setTimeout(() => {
                window.location.href = '/'
            }, 3000);
        }
    }, [answer])

    return (
        <div className="game-container">
            <h1 className="game-title">Cards-game</h1>
            <ul className="card-list">
                {cards.map((item, index) => (
                    <li key={index}>
                        <div
                            className={`card ${item.isClicked ? 'flipped' : ''}`}
                            onClick={() => {
                                if (!item.isClicked && checkAnsw !== 'Неверно') {
                                    const newArr = cards.map(el => {
                                        return el.id === item.id ? { ...el, isClicked: true } : el;
                                    });
                                    setAnswer([...answer, item.url]);
                                    setCards(newArr);
                                }
                            }}
                        >
                            {item.isClicked ? (
                                <img src={item.url} alt={`Card ${item.id}`} className="card-image" />
                            ) : (
                                <div className="card-back"></div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <h1 className="result-message">{checkAnsw}</h1>
        </div>
    );
}

export default Main