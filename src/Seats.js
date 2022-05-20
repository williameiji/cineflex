import { useEffect, useState } from "react";
import React from "react";
import Footer from "./Footer";
import RenderSits from "./RenderSits";
import TopSelect from "./TopSelect";
import SubtitleColor from "./SubtitleColor";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopBar from "./TopBar";
import loading from "../src/assets/image/loading.gif";

function Forms({ data, handleForm }) {
    return (
        <div className="forms">
            <label>Nome do comprador:</label>
            <input type="text" name="name" placeholder="Digite seu nome..." onChange={handleForm} value={data}></input>
            <label>CPF do comprador:</label>
            <input type="text" name="cpf" placeholder="Digite seu CPF..." maxLength="11" onChange={handleForm} value={data} required onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
            }} ></input>
        </div>
    );
}

export default function Seats({ setIdSeat, idSeat, section, setRenderSeats, renderSeats, setData, data, setNumSeats, numSeats, setCpfNovo }) {
    let history = useNavigate();

    function handleClick() {
        setIdSeat([]);
        history(`/sessoes/${section}`);
    }

    const { idSeats } = useParams();
    const [waiting, setWaiting] = useState(false);

    function handleForm(e) {
        setData({
            ...data,
            ids: idSeat,
            [e.target.name]: e.target.value,
        });
    }

    function submit() {
        if (data.cpf.length === 11 && data.name.length > 0) {
            let promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", data);
            promise.then(response => {
                history("/sucesso");
                printCPF(data.cpf)
            })
        }
    }

    function printCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpfNovo(cpf);
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSeats}/seats`);
        promise.then(response => {
            let seats = response.data.seats.map(value => {
                if (value.isAvailable === false) {
                    return {
                        ...value,
                        "class": "unvailable"
                    }
                } else {
                    return {
                        ...value,
                        "class": "available"
                    }
                }
            });
            setRenderSeats({ ...response.data, seats });
            setWaiting(true);
        })
    }, []);

    return (
        <>
            <TopBar>
                <div className="buttonBack" onClick={() => handleClick(idSeat)}>Voltar</div>
                <p>CINEFLEX</p>
            </TopBar>

            <TopSelect>
                <p className="topSelect">Selecione o(s) assento(s)</p>
            </TopSelect>

            {!waiting ? <img className="loading" src={loading} alt="" /> :
                <>
                    <RenderSits setIdSeat={setIdSeat} idSeat={idSeat} renderSeats={renderSeats} setRenderSeats={setRenderSeats} setNumSeats={setNumSeats} numSeats={numSeats} />

                    <SubtitleColor />

                    {/* {idSeat.map((value, index) => <form key={index}><Forms  id={value} data={data} handleForm={handleForm} /></form>)} */}

                    <Forms handleForm={handleForm} />

                    {/* {!idSeat.length ? null : <div className="button">{`Reservar assento(s)`}</div>} */}

                    <div className="button" onClick={submit}>{`Reservar assento(s)`}</div>

                    <Footer>
                        <div className="imgFooter">
                            <img className="imgPoster" src={renderSeats.movie.posterURL} alt="" />
                        </div>
                        <p>{renderSeats.movie.title}</p>
                        <p>{renderSeats.day.weekday} - {renderSeats.name}</p>
                    </Footer>
                </>}
        </>
    );
}