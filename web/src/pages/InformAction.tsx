import React from 'react'
import Inform from './../components/Inform';
import imgSrc from '../images/girl-green.svg';

export default function InformAction() {
    return (
        <Inform
            imgSrc={imgSrc}
            title="Ebaaa!"
            text="O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)"
        />
    )
}

