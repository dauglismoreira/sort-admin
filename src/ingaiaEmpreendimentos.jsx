import React, { useEffect, useState, useRef, Component } from "react";
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { setBreadcrumbItems } from './store/actions';
import { Link } from "react-router-dom";
import axios from 'axios';
import ImoveisImages from './imoveisImages';

import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import listPlugin from '@fullcalendar/list';

import {
  addNewEvent,
  deleteEvent,
  getCategories,
  getEvents,
  updateEvent,
} from "./store/actions"
//css
import "@fullcalendar/bootstrap/main.css"
import "./imoveis.css";
import "./ingaia.css"

const json_data = require('./ingaia/empreendimentos.json');
const json_imoveis = require('./ingaia/imoveis.json');


const IngaiaEmpreendimentos = () => {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };


  React.useEffect(() => {
    if (localStorage.getItem('empreendimento_filtro') !== '' || localStorage.getItem('empreendimento_filtro') !== null) {
      setSearchTerm(localStorage.getItem('empreendimento_filtro'));
    }
  }, []);

  React.useEffect(() => {
    const results = json_data.filter(empreendimento =>
      empreendimento.nome.toLowerCase().includes(searchTerm),
    );
    setSearchResults(results);
    localStorage.setItem('empreendimento_filtro', searchTerm)
  }, [searchTerm]);


  return (
    <>
      <div className="container-imovel-options">
        <div className="container-filters">
          <div className="filters-title">
            <h3>Buscar Imóvel</h3>
          </div>
          <div className="filters-input">
            <div>
              <label>Busca por Empreendimento<input
                type="text"
                placeholder="Buscar Imóvel"
                value={searchTerm}
                onChange={handleChange}
              /></label>
            </div>
          </div>
        </div>
      </div>


      <div>
        <div className="container-imoveis">
          <div className="row-imoveis title ingaia">
            <div className="name"><b>Empreendimento</b></div>
            <div className="ingaia-cliente-imovel-title"><b>Imóveis</b></div>
          </div>
        </div>
        <div className="container-imoveis">
          {searchResults.map((empreendimento, index) => (
            <div className="row-imoveis body">
              <div className="name">{empreendimento.nome}</div>
              <div className="ingaia-cliente-imovel">
                <ul>
                  {json_imoveis.filter(imovelfilter => imovelfilter.idempreendimento === empreendimento.idempreendimento).map((imovel, index) => (
                    <Link key={index} to='/perfilIngaia' onClick={() => { localStorage.setItem('ingaia-id', imovel.idimovel) }}>
                      <li className="ingaia-ref">{imovel.referencia} - <span>{imovel.titulo}</span></li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}


export default IngaiaEmpreendimentos;
