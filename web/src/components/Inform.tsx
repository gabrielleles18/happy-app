import React from 'react'
import {Link} from 'react-router-dom';

import '../styles/components/inform.css';

export default function Inform(props: any) {
    return (
        <main className={`app-inform ${props.themeRed && 'app-red'}`}>
            <div className="container">
                <div className="texts">
                    <h1>{props.title}</h1>
                    <p>{props.text}</p>
                    <Link to="/app">
                        <button className={`${props.themeRed && 'button-red'}`}>Voltar para o mapa</button>
                    </Link>
                </div>
                <img src={props.imgSrc} alt=""/>
            </div>
        </main>
    )
}

