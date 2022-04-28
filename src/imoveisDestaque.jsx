import React, { useEffect, useState, useRef } from "react";
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { setBreadcrumbItems } from './store/actions';
import { Link } from "react-router-dom";
import axios from 'axios';

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
import "./imoveis.css"


const handleStatus = (imovel) => {
  if (imovel.status === '1') {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'status',
      status: '0'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/update/immobile/promo/' + idU, data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  } else {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'status',
      status: '1'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/update/immobile/promo/' + idU, data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}

const handleOpportunity = (imovel) => {
  if (imovel.opportunity === '1') {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'opportunity',
      status: '0'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/update/immobile/promo/' + idU, data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  } else {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'opportunity',
      status: '1'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/update/immobile/promo/' + idU, data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}

const handleStar = (imovel) => {
  if (imovel.best === '1') {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'best',
      status: '0'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/update/immobile/promo/' + idU, data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  } else {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'best',
      status: '1'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/update/immobile/promo/' + idU, data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}


const Imoveis = props => {

  //BreadCrumd add
  const breadcrumbItems = [
    { title: "Sort", link: "#" },
    { title: "Imóveis", link: "#" },
  ]

  const [selectImoveis, setSelectImoveis] = useState([]);
  const [status, setStatus] = useState('1');

  useEffect(() => {
    props.onSetBreadCrumbs('Imóveis', breadcrumbItems)

    axios.get("https://sort.vps-kinghost.net/api/select/immobile/all")
      .then(response => {
        setSelectImoveis(response.data)
        setSearchResults(response.data)
      }
      )
      .catch(function (error) { console.log(error); });

  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = selectImoveis.filter(imovel =>
      imovel.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);


  setTimeout(() => {

    const statusImage = document.querySelectorAll('.statusImage');
    for (var a = 0, len = statusImage.length; a < len; a++) {
      if (document.querySelectorAll('.statusImage')[a].getAttribute('data-r') === '1') {
        document.querySelectorAll('.statusImage')[a].classList.add('active');
      } else {
        document.querySelectorAll('.statusImage')[a].classList.remove('active');
      }
    }

    const statusStar = document.querySelectorAll('.starImage');
    for (var e = 0, len = statusStar.length; e < len; e++) {
      if (document.querySelectorAll('.starImage')[e].getAttribute('data-r') === '1') {
        document.querySelectorAll('.starImage')[e].classList.add('active');
      } else {
        document.querySelectorAll('.starImage')[e].classList.remove('active');
      }
    }

    const statusLaunch = document.querySelectorAll('.launchImage');
    for (var i = 0, len = statusLaunch.length; i < len; i++) {
      if (document.querySelectorAll('.launchImage')[i].getAttribute('data-r') === '1') {
        document.querySelectorAll('.launchImage')[i].classList.add('active');
      } else {
        document.querySelectorAll('.launchImage')[i].classList.remove('active');
      }
    }

  }, 100);



  return (

    <React.Fragment>

      <MetaTags>
        <title>Imóveis Destaque</title>
      </MetaTags>
      <div className="container-imovel-options">
        <div className="container-button-add-imovel">

        </div>
        <div className="container-filters">
          <div>
            <label>Status<select onChange={() => setStatus(event.target.value)} >
              <option value='1'>Publicado</option>
              <option value='0'>Rascunho</option>
            </select></label>
          </div>
          <div>
            <label>Buscar<input
              type="text"
              placeholder="Buscar Imóvel"
              value={searchTerm}
              onChange={handleChange}
            /></label>
          </div>
        </div>
      </div>
      <div className="container-imoveis">
        <div className="row-imoveis title">
          <div className="picture"></div>
          <div className="sku">Código</div>
          <div className="name">Nome do Imóvel</div>
          <div className="update-btn"></div>
          <div className="status">Oportunidades</div>
          <div className="status">Pré-Lançamento</div>
          <div className="status">Status</div>
        </div>
      </div>

      <div className="container-imoveis">
        {searchResults.filter(imovelfilter => imovelfilter.status === status && imovelfilter.best === '1').sort((c1, c2) => (c1.name > c2.name) ? 1 : -1).map((imovel, index) => (
          <div className="row-imoveis" key={index}>
            < div className="picture" style={
              {
                backgroundImage: ` url(https://sort.vps-kinghost.net/media/immobile/${imovel.code_product}/${imovel.media_one})`
              }}>
            </div>
            <div className="sku">{imovel.sku}</div>
            <div className="name">{imovel.name}</div>
            <div className="update-btn">
              <Link key={index} to="/UpdateImovel" onClick={() => { localStorage.setItem('id', imovel.code_product) }}><button>Atualizar Imóvel</button></Link>
            </div>
            <div id="star" className="status"><div className="starImage" data-r={imovel.best} onClick={() => handleStar(imovel)}></div></div>
            <div id="launch" className="status"><div className="launchImage" data-r={imovel.opportunity} onClick={() => handleOpportunity(imovel)}></div></div>
            <div id="publish" className="status"><div className="statusImage" data-r={imovel.status} onClick={() => handleStatus(imovel)}></div></div>
          </div>
        ))}
      </div>

    </React.Fragment>
  )
}



const mapStateToProps = ({ calendar }) => ({
  events: calendar.events,
  categories: calendar.categories,
})

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => dispatch(getEvents()),
  onGetCategories: () => dispatch(getCategories()),
  onAddNewEvent: event => dispatch(addNewEvent(event)),
  onUpdateEvent: event => dispatch(updateEvent(event)),
  onDeleteEvent: event => dispatch(deleteEvent(event)),
  onSetBreadCrumbs: (title, breadcrumbItems) => dispatch(setBreadcrumbItems(title, breadcrumbItems)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Imoveis)
