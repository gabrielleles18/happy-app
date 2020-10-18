import React from 'react'

import '../styles/components/button.css';

export default function Button(props: any) {
    return (
        <button className="confirm-button" type="submit">{props.title}</button>
    )
}

