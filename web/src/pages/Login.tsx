import React from 'react'
import {FiArrowLeft} from "react-icons/fi";
import {useHistory} from "react-router-dom";
import {Link} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

import happyimg from '../images/logo-login.svg';
import '../styles/pages/login.css';

import Input from '../components/Input';

export default function Login() {
    const {goBack} = useHistory();

    return (
        <main className="app-login">
            <div className="left">
                <img src={happyimg} alt="Happy"/>
                <div className="region">
                    <h1>Goiás</h1>
                    <h2>Ceres</h2>
                </div>
            </div>
            <div className="right">
                <button className="arrow" type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#15C3D6"/>
                </button>

                <form className="block-login">

                    <h1>Fazer login</h1>

                    <Input
                        id="email"
                        title="E-mail"
                        type="text"
                    />
                    <Input
                        id="senha"
                        title="Senha"
                        type="password"
                    />

                    <div className="options">
                        <Checkbox
                            style={{
                                color: "#37C77F"
                            }}
                        />

                        <label htmlFor="remember">Lembrar-me</label>

                        <Link to="/" className="link">Esqueci minha senha</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

