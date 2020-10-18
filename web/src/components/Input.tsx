import React from 'react'
import {Link} from 'react-router-dom';

import '../styles/components/input.css';

export default function Inform(props: any) {
    return (
        <div className="app-input">
            <label htmlFor={props.name}>{props.title}</label>
            <input id={props.name} type={props.type}/>
        </div>
    )
}

