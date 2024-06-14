import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardPerson } from './components/CardPerson'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet'

import "leaflet-defaulticon-compatibility";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("1")
  const [name, setName] = useState("")
  const position = [-25.4249647, -49.272303]
  

  useEffect(() => {
    api.get(`/character/?page=${page}&name=${name}`).then((response) => {
      if(!response.data.results){
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if(error.response.status === 404){
        console.log("Esta pagina nao contem este personagem")
      }
      console.error(error)
    })
  }, [page, name])

  return (
    <>
    <div className={style.wrapBtns}>
      <button onClick={() => setShow("prod")}>Produtos</button>
      <button onClick={() => setShow("api")}>API</button>
      <button onClick={() => setShow("map")}>Mapa</button>
    </div>
    <div  className={style.wrapPage}>
      <h1>Exercícios de manutenção</h1>
     {show === "prod" &&
        <>
          <h2>Showroom de produtos</h2>
            <div className={style.items}>
            {produtos.map((item) => { 
              console.log(item.status)
              return(
                <Card name={item.name} status={item.status} desc={item.desc} value={item.value} image={item.image} key={item.id}/>
              )
             })}
            </div>
        </>
      }
     {show === "api" &&
        <>
          <h2>Rick and Morty API</h2>
            <div className={style.filter}>
               <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)}/>
               <input type="text" placeholder="name" value={name} onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className={style.items}>
            {data.map((item) => { 
             return(
              <div key={item.id}>
                <CardPerson name={item.name} status={item.status} species={item.species} gender={item.gender} image={item.image} />
                {/* <button onClick={() => {}}>Info</button> */}
              </div>
              )
           })}
            </div>
       </>
      }
     {show === "map" &&
        <>
      <h2>Mapa</h2>
          <div style={{alignItems: "center", justifyContent: "center"}}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{width: "500px", height: "400px"}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <a href="https://maps.app.goo.gl/WgqEuKXVENpRpABAA" target='_blank'>Abrir google maps</a>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
         </>
      }
      </div>
    </>
  )
}

export default App
