import React, { useEffect, useState, useRef } from "react";
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { setBreadcrumbItems } from './store/actions';
import { Link } from "react-router-dom";
import axios from 'axios';
import ImoveisImages from './imoveisImages';
import dateFormat, { masks } from "dateformat";
import Pagination from './Pagination';

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


const handleStatus = (post) => {
  if (post.status === '1') {
    const data = {
      id: post.id,
      column: 'status',
      status: '0'
    };
    axios.put('https://sort.vps-kinghost.net/api/blog/status', data)
      .then(res => { window.location.reload() })
  } else {
    const data = {
      id: post.id,
      column: 'status',
      status: '1'
    };
    axios.put('https://sort.vps-kinghost.net/api/blog/status', data)
      .then(res => { window.location.reload() })
  }
}


const Blog = props => {

  //BreadCrumd add
  const breadcrumbItems = [
    { title: "Sort", link: "#" },
    { title: "Imóveis", link: "#" },
  ]

  const [selectPosts, setSelectPosts] = useState([]);
  const [status, setStatus] = useState('1');
  const [negocio, setNegocio] = useState('sell');
  const [update, setUpdate] = useState('/UpdateImovel');
  const [images, setImages] = useState([]);
  const [max, setMax] = useState(3);


  useEffect((post) => {
    props.onSetBreadCrumbs('Posts', breadcrumbItems)

    axios.get("https://sort.vps-kinghost.net/api/blog/search")
      .then(response => {
        setSelectPosts(response.data.filter(postfilter => postfilter.status == 0 || postfilter.status == 1))
        setSearchResults(response.data.filter(postfilter => postfilter.status == 0 || postfilter.status == 1))
        setMax(Math.ceil(response.data.filter(postfilter => postfilter.status == 0 || postfilter.status == 1).length / 8))
      }
      )
      .catch(function (error) { console.log(error); });
    if (localStorage.getItem('statusBlog') == null) {
      setStatus('1')
    } else {
      setStatus(localStorage.getItem('statusBlog'))
    }
  }, []);

  setTimeout(() => {
    if (localStorage.getItem('statusBlog') == '1' || localStorage.getItem('statusBlog') == null) {
      document.getElementById('statu').value = 1;
    } else {
      document.getElementById('statu').value = 0;
    }
  }, 300);


  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = selectPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const [searchTermCategory, setSearchTermCategory] = React.useState("");
  const handleChangeCategory = event => {
    setSearchTermCategory(event.target.value);
  };
  React.useEffect(() => {
    const resultsCategory = selectPosts.filter(post =>
      String(post.category).toLowerCase().includes(searchTermCategory)
    );
    setSearchResults(resultsCategory);
  }, [searchTermCategory]);


  setTimeout(() => {

    const statusImage = document.querySelectorAll('.statusImage');
    for (var a = 0, len = statusImage.length; a < len; a++) {
      if (document.querySelectorAll('.statusImage')[a].getAttribute('data-r') === '1') {
        document.querySelectorAll('.statusImage')[a].classList.add('active');
      } else {
        document.querySelectorAll('.statusImage')[a].classList.remove('active');
      }
    }

  }, 100);



  return (

    <React.Fragment>

      <MetaTags>
        <title>Blog</title>
      </MetaTags>
      <div className="container-imovel-options">
        <div className="container-button-add-imovel">
          <Link to='/CreatePost'><button>Novo Post<i className="mdi mdi-add-icon"></i></button></Link>
        </div>
        <div className="container-filters">
          <div className="filters-title">
            <h3>Buscar Post</h3>
          </div>
          <div className="filters-input">
            <div>
              <label>Status<select id="statu" onChange={() => {
                localStorage.setItem('statusBlog', event.target.value)
                setStatus(localStorage.getItem('statusBlog'))
                window.location.reload();
              }} >
                <option value='1'>Publicado</option>
                <option value='0'>Rascunho</option>
              </select></label>
            </div>
            <div>
              <label>Categoria<input
                type="text"
                placeholder="Categoria"
                value={searchTermCategory}
                onChange={handleChangeCategory}
              /></label>
            </div>
            <div>
              <label>Título<input
                type="text"
                placeholder="Título"
                value={searchTerm}
                onChange={handleChange}
              /></label>
            </div>
          </div>
        </div>
      </div>
      <div className="container-imoveis">
        <div className="row-imoveis title">
          <div className="picture-box"><div className="picture"></div></div>
          <div className="sku">Data</div>
          <div className="sku">Categoria</div>
          <div className="name">Título</div>
          <div className="update-btn">Atualizar</div>
          <div className="status-box tit">
            <div className="status">Status</div>
          </div>
        </div>
      </div>

      <div className="container-imoveis">
        <Pagination
          data={searchResults.filter(postfilter => postfilter.status === status)}
          RenderComponent={Post}
          title="Posts"
          pageLimit={max}
          dataLimit={8}
          newFilter={(c1, c2) => (c1.name > c2.name) ? 1 : -1}
        />
      </div>

    </React.Fragment >
  )
}

function Post(props) {

  const { title, url, content, media, id, category, date, status } = props.data;
  return (
    <div className="row-imoveis body">
      < div className="picture" style={
        {
          backgroundImage: ` url(https://sort.vps-kinghost.net/media/blog/${media})`
        }}>
      </div>
      <div className="sku">{dateFormat(date, "d/mm/yyyy")}</div>
      <div className="sku">{category}</div>
      <div className="name">{title}</div>
      <div className="update-btn">
        <Link to={"/UpdatePost?" + id}><button>Atualizar</button></Link>
      </div>
      <div className="status-box">
        <div id="publish" className="status"><div className="statusImage" data-r={status} onClick={() => handleStatus(props.data)}></div></div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
