import React from 'react'

import '../styles/components/button.css';

export default function Button({title}: any) {
    return (
        <button className="confirm-button" type="submit">{title}</button>
    )
}

