import React, { useEffect, useState, useRef } from "react";
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
import "./imoveis.css"


const handleStatus = (imovel) => {
  if (imovel.status === '1') {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'status',
      update: '',
      status: '0'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
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
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
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
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
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
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
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
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
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
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}

const handleIntegration = (imovel) => {
  if (imovel.integration === '1') {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'integration',
      status: '0'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  } else {
    const idU = imovel.code_product;
    const data = {
      id: idU,
      column: 'integration',
      status: '1'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
}

const handleIntegrationZap = (props) => {
  if (props.integration_zap === '1') {
    const idU = props.code_product;
    const data = {
      id: idU,
      column: 'integration_zap',
      status: '0'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data)
      .then(resp => {
        window.location.reload();
      });
  } else {
    const idU = props.code_product;
    const data = {
      id: idU,
      column: 'integration_zap',
      status: '1'
    };
    console.log(data);
    axios.put('https://sort.vps-kinghost.net/api/immobile/update/promo', data)
      .then(resp => {
        window.location.reload();
      });
  }
}


const ImoveisDestaque = props => {

  //BreadCrumd add
  const breadcrumbItems = [
    { title: "Sort", link: "#" },
    { title: "Imóveis", link: "#" },
  ]

  const [selectImoveis, setSelectImoveis] = useState([]);
  const [status, setStatus] = useState('1');
  const [negocio, setNegocio] = useState('sell');
  const [update, setUpdate] = useState('/UpdateImovel');
  const [images, setImages] = useState([]);
  const [countCount, setCountCount] = useState()


  useEffect(() => {
    axios.get("https://sort.vps-kinghost.net/api/immobile/select/all")
      .then(response => {
        response.data.map((imovelR, index) => (
          axios.get('https://sort.vps-kinghost.net/api/immobile/select/media/' + imovelR.code_product)
            .then(resp => {
              selectImoveis.push(Object.assign({}, response.data[index], resp.data[0]))
            })
        ))
        setSearchResults(selectImoveis)
        let count = 0;
        const interv = setInterval(() => {
          setCountCount(count);
          count++;
          if (count > response.data.length) clearInterval(interv);
        }, 100);
      }
      )
      .catch(function (error) { console.log(error); });
    if (localStorage.getItem('negocio') == 'sell') {
      setNegocio('sell');
    } else if (localStorage.getItem('negocio') == 'rent') {
      setNegocio('rent');
    }
  }, []);

  setTimeout(() => {
    if (localStorage.getItem('negocio') == 'sell') {
      document.getElementById('negocio').value = 'sell';
    } else if (localStorage.getItem('negocio') == 'rent') {
      document.getElementById('negocio').value = 'rent';
    }
  }, 300);


  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {

    const results = selectImoveis.filter(imovel =>
      imovel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, countCount]);

  const [searchTermSku, setSearchTermSku] = React.useState("");
  const handleChangeSku = event => {
    setSearchTermSku(event.target.value);
  };
  React.useEffect(() => {
    const resultsSku = selectImoveis.filter(imovel =>
      String(imovel.sku).toLowerCase().includes(searchTermSku.toLowerCase())
    );
    setSearchResults(resultsSku);
  }, [searchTermSku]);


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

    const statusIntegration = document.querySelectorAll('.integrationImage');
    for (var i = 0, len = statusLaunch.length; i < len; i++) {
      if (document.querySelectorAll('.integrationImage')[i].getAttribute('data-r') === '1') {
        document.querySelectorAll('.integrationImage')[i].classList.add('active');
      } else {
        document.querySelectorAll('.integrationImage')[i].classList.remove('active');
      }
    }

    const statusIntegrationZap = document.querySelectorAll('.integrationImageZap');
    for (var i = 0, len = statusIntegrationZap.length; i < len; i++) {
      if (document.querySelectorAll('.integrationImageZap')[i].getAttribute('data-r') === '1') {
        document.querySelectorAll('.integrationImageZap')[i].classList.add('active');
      } else {
        document.querySelectorAll('.integrationImageZap')[i].classList.remove('active');
      }
    }

  }, 100);



  return (

    <React.Fragment>

      <MetaTags>
        <title>Imóveis Chaves na Mão</title>
      </MetaTags>
      <div className="container-imovel-options">
        <div className="container-filters">
          <div className="filters-title">
            <h3>Buscar Imóvel</h3>
          </div>
          <div className="filters-input">
            <div>
              <label>Negócio<select id="negocio" onChange={() => {
                localStorage.setItem('negocio', event.target.value)
                setNegocio(localStorage.getItem('negocio'))
                window.location.reload();
              }} >
                <option value='sell'>Venda</option>
                <option value='rent'>Locação</option>
              </select></label>
            </div>
            <div>
              <label>Nome<input
                type="text"
                placeholder="Buscar Imóvel"
                value={searchTerm}
                onChange={handleChange}
              /></label>
            </div>
            <div>
              <label>Código<input
                type="text"
                placeholder="Buscar Imóvel"
                value={searchTermSku}
                onChange={handleChangeSku}
              /></label>
            </div>
          </div>
        </div>
      </div>
      <div className="container-imoveis">
        <div className="row-imoveis title">
          <div className="picture-box"><div className="picture"></div></div>
          <div className="sku">Código</div>
          <div className="name">Nome do Imóvel</div>
          <div className="update-btn">Atualizar</div>
          <div className="status-box tit">
            <div className="status">Oport.</div>
            <div className="status">Pré-L.</div>
            <div className="status">C. Pro</div>
            <div className="status">Chaves</div>
            <div className="status">Status</div>
          </div>
        </div>
      </div>

      <div className="container-imoveis">
        {searchResults.filter(imovelfilter => imovelfilter.best === '1')
          .filter(imovelfilterNegocio => imovelfilterNegocio.objective === negocio)
          .sort((c1, c2) => (c1.name > c2.name) ? 1 : -1).map((imovel, index) => (
            <div className="row-imoveis body" key={index}>
              < div className="picture" style={
                {
                  backgroundImage: ` url(${imovel.url})`
                }}>
              </div>
              {/* <ImoveisImages id={imovel.code_product} /> */}
              <div className="sku">{imovel.sku}</div>
              <div className="name">{imovel.name}</div>
              <div className="update-btn">
                <select type="text" value={update}
                  onChange={e => setUpdate(e.target.value)}>
                  <option value="/UpdateImovel">Imóvel</option>
                  <option value="/UpdateSkill">Características</option>
                  <option value="/UpdateBuild">Empreendimento</option>
                  <option value="/UpdateImage">Imagens</option>
                </select>
                {/* <Link key={index} to='/:handle' onClick={() => { localStorage.setItem('id', imovel.code_product) }}><button>Atualizar</button></Link> */}
                <Link key={index} to={update + "?" + imovel.code_product}><button>Atualizar</button></Link>
              </div>
              <div className="status-box">
                <div id="star" className="status"><div className="starImage" data-r={imovel.best} onClick={() => handleStar(imovel)}></div></div>
                <div id="launch" className="status"><div className="launchImage" data-r={imovel.opportunity} onClick={() => handleOpportunity(imovel)}></div></div>
                <div id="integration-canal" className="status"><div className="integrationImageZap" data-r={imovel.integration_zap} onClick={() => handleIntegrationZap(imovel)}></div></div>
                <div id="integration-chaves" className="status"><div className="integrationImage" data-r={imovel.integration} onClick={() => handleIntegration(imovel)}></div></div>
                <div id="publish" className="status"><div className="statusImage" data-r={imovel.status} onClick={() => handleStatus(imovel)}></div></div>
              </div>
            </div>
          ))}
      </div>

    </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(ImoveisDestaque)
