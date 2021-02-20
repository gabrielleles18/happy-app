import React, {FormEvent, ChangeEvent, useState} from 'react'
import {FiArrowLeft} from "react-icons/fi";
import {useHistory} from "react-router-dom";
import {Link} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import api from "../services/api";

import '../styles/pages/login.css';

import Button from '../components/Button';
import SidebarLogin from "../components/SidebarLogin";

export default function Login() {
    const {goBack} = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = new FormData();

        data.append('email', email);
        data.append('password', password);

        await api.post('sessions', data);
    }

    return (
        <main className="app-login">
            <SidebarLogin/>
            <div className="right">
                <button className="arrow" type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#15C3D6"/>
                </button>

                <form className="block-login" onSubmit={handleSubmit}>

                    <h1>Fazer login</h1>

                    <div className="app-input">
                        <label htmlFor="email">E-mail</label>
                        <input id="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="app-input">
                        <label htmlFor="senha">Senha</label>
                        <input id="senha" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className="options">
                        <Checkbox
                            style={{
                                color: "#37C77F"
                            }}
                        />

                        <label htmlFor="remember">Lembrar-me</label>

                        <Link to="/" className="link">Esqueci minha senha</Link>
                    </div>

                    <Button title="Enviar"/>
                </form>
            </div>
        </main>
    )
}

