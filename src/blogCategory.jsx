import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import axios from 'axios';
//css
import "./imoveis.css";
import del from './assets/images/delete.png';


class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      newCategory: ''
    };

    this.handleChangeNewCategory = this.handleChangeNewCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('https://sort.vps-kinghost.net/api/blog/category')
      .then(response => {
        this.setState({ category: response.data })
      })
  }

  componentDidUpdate() {
  }

  handleChangeNewCategory(event) { this.setState({ newCategory: event.target.value }); }

  handleDelete = (categoria) => {
    event.preventDefault()
    const data = {
      id: categoria.id,
    };
    axios.post('https://sort.vps-kinghost.net/api/blog/category/delete', data)
      .then(response => {
        window.location.reload();
      })
  }

  handleSubmit = () => {
    event.preventDefault()
    const dataCategory = this.state.newCategory;
    const data = {
      name: dataCategory,
    };
    axios.post('https://sort.vps-kinghost.net/api/blog/category/create', data)
      .then(response => {
        alert("Imóvel adicionado com " + response.data.message)
        window.location.reload();
      })
  }

  render() {
    const { category, newCategory } = this.state;
    return (
      <div className="update-form">
        <form onSubmit={this.handleSubmit}>
          <div className="step-container">
            <h3>Adicionar categoria</h3>
            <div className="container-form">
              <label className=""><span>Nova Categoria</span><input type="text" value={newCategory}
                onChange={this.handleChangeNewCategory} placeholder="Categoria" maxLength="55" required></input></label>
              <div className="container-button"><button>Cadastrar categoria</button></div>
            </div>
          </div>
        </form>
        <div className="step-container">
          <h3>Categorias</h3>
          <div className="list-category">
            <ul>
              {category.map((categoria, index) => (
                <li key={index}>{categoria?.name}<img src={del} onClick={() => this.handleDelete(categoria)}></img></li>
              ))}
            </ul>
          </div>
        </div>
      </div >
    );
  }
}

export default Category;