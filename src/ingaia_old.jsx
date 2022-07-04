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

const json_data = require('./ingaia/imoveis.json');
const json_clients = require('./ingaia/clientes.json');

const Ingaia = () => {

  const [clientes, setClientes] = React.useState(json_clients)

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const results = json_data.filter(imovel =>
      imovel.referencia.toLowerCase().includes(searchTerm),
    );
    setSearchResults(results);
  }, [searchTerm]);

  const [searchTermType, setSearchTermType] = React.useState("");
  const handleChangeType = event => {
    setSearchTermType(event.target.value);
  };

  React.useEffect(() => {
    const results2 = json_data.filter(imovel =>
      imovel.tipo.toLowerCase().includes(searchTermType),
    );
    setSearchResults(results2);
  }, [searchTermType]);


  return (
    <><div className="search-labels">
      <div>
        <label>Busca por Código<input
          type="text"
          placeholder="Buscar Imóvel"
          value={searchTerm}
          onChange={handleChange}
        /></label>
      </div>
      <div>
        <label>Busca por Tipo<input
          type="text"
          placeholder="Buscar Imóvel"
          value={searchTermType}
          onChange={handleChangeType}
        /></label>
      </div>
    </div>

      <div>
        <div className="container-imoveis">
          <div className="row-imoveis title">
            <div className="sku">Código</div>
            <div className="name">Cliente</div>
            <div className="status-box tit">
              <div className="status">Oport.</div>
              <div className="status">Pré-L.</div>
              <div className="status">Chaves</div>
              <div className="status">Status</div>
            </div>
          </div>
        </div>
        {searchResults.map((imovel, index) => (
          <Link key={index} to='/perfilIngaia' onClick={() => { localStorage.setItem('ingaia-id', imovel.idimovel) }}>
            <div className="container-ingaia-list">
              <div className="ingaia-ref">{imovel.referencia}</div>
              {clientes.filter(clientefilter => clientefilter.idcliente === imovel.idcliente).map((cliente, index) => (
                <div key={index} className="ingaia-ref">{cliente.nome}</div>
              ))}
              <div className="ingaia-name">{imovel.titulo}</div>
              <div className="ingaia-bairro">{imovel.tipo}</div>
              <div className="ingaia-city">{imovel.cidade}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}


export default Ingaia;
