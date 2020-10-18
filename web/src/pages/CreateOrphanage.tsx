import React, {useState, FormEvent, ChangeEvent} from "react";
import {Map, Marker, TileLayer} from 'react-leaflet';
import {LeafletMouseEvent} from "leaflet";
import {FiPlus} from "react-icons/fi";
import {useHistory} from 'react-router-dom';

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../ultis/mapIcon";
import api from "../services/api";


export default function CreateOrphanage() {
    const history = useHistory();

    const [position, setPosition] = useState({latitude: 0, longitude: 0})

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImage, setPreviewImage] = useState<string[]>([])

    function handMapClick(event: LeafletMouseEvent) {
        const {lat, lng} = event.latlng;
        setPosition({
            latitude: lat,
            longitude: lng
        });
    }

    function handSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }
        const selectedImagens = Array.from(event.target.files);

        setImages(selectedImagens);

        const selectedImagenspreview = selectedImagens.map(image => {
            return URL.createObjectURL(image);
        });

        setPreviewImage(selectedImagenspreview);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const {latitude, longitude} = position;

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('whatsapp', whatsapp);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));

        images.forEach(image => {
            data.append('images', image);
        });

        await api.post('orphanages', data);

        alert("sucesso!!!")

        history.push('/app')
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar/>
            <main>
                <form className="create-orphanage-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados</legend>

                        <div className="map-container">

                            <Map
                                center={[-15.3066274, -49.5999757]}
                                style={{width: '100%', height: 280}}
                                zoom={15}
                                onClick={handMapClick}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                {position.latitude !== 0 && (
                                    <Marker
                                        interactive={false}
                                        icon={mapIcon}
                                        position={[
                                            position.latitude,
                                            position.longitude
                                        ]}
                                    />
                                )
                                }
                            </Map>
                            <footer>
                                <h3>Clique no mapa para adicionar a localização</h3>
                            </footer>
                        </div>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="whatsapp">Número de Whatsapp</label>
                            <input id="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>
                            <div className="images-container">
                                {previewImage.map(image => {
                                    return (
                                        <img key={image} src={image} alt={image}/>
                                    )
                                })}
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6"/>
                                </label>
                            </div>
                            <input multiple onChange={handSelectImages} type="file" id="image[]"/>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea id="instructions" value={instructions}
                                      onChange={e => setInstructions(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <input id="opening_hours" value={opening_hours}
                                   onChange={e => setOpeningHours(e.target.value)}/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana?</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}>
                                    Sim
                                </button>

                                <button
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}>
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
