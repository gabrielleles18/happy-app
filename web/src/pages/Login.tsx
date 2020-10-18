import React from 'react'
import {FiArrowLeft} from "react-icons/fi";
import {useHistory} from "react-router-dom";
import {Link} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

import '../styles/pages/login.css';

import Button from '../components/Button';
import Input from '../components/Input';
import SidebarLogin from "../components/SidebarLogin";

export default function Login() {
    const {goBack} = useHistory();

    return (
        <main className="app-login">
            <SidebarLogin/>
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

                    <Button
                        title="Enviar"
                    />
                </form>
            </div>
        </main>
    )
}

