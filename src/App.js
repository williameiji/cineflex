import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/assets/css/reset.css";
import "../src/assets/css/style.css";
import Movies from "./Movies";
import Sections from "./Sections";
import Seats from "./Seats";
import TopBar from "./TopBar";
import Finished from "./Finished";


export default function App() {
    const [sitSelected, setSitSelected] = React.useState();
    const [idSeat, setIdSeat] = React.useState([]);
    const [section, setSection] = React.useState();
    const [renderSeats, setRenderSeats] = React.useState({});
    const [numSeats, setNumSeats] = React.useState([]);
    const [data, setData] = React.useState({
        ids: idSeat,
        name: "",
        cpf: "",
    });

    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path={`/sessoes/:idSection`} element={<Sections setSection={setSection} />} />
                <Route path={`/assentos/:idSeats`} element={<Seats
                    sitSelected={sitSelected}
                    setSitSelected={setSitSelected}
                    setIdSeat={setIdSeat}
                    idSeat={idSeat}
                    section={section}
                    setRenderSeats={setRenderSeats}
                    renderSeats={renderSeats}
                    setData={setData}
                    data={data}
                    setNumSeats={setNumSeats}
                    numSeats={numSeats}
                />} />
                <Route path="/sucesso" element={<Finished
                    renderSeats={renderSeats}
                    data={data} numSeats={numSeats}
                    setIdSeat={setIdSeat}
                    setNumSeats={setNumSeats}
                />} />
            </Routes>
        </BrowserRouter>
    );
}