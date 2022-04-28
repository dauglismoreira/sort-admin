import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './UpdateImovel.css';
import del from './assets/images/delete.png';

class ImobilleSkill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      details: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({ value: event.target.value }); }

  loadDetails = async () => {
    const id = localStorage.getItem('create-id');
    const detailsResponse = fetch('https://sort.vps-kinghost.net/api/select/immobile/details/' + id);
    const [details] = await Promise.all([detailsResponse]);
    const detailsJson = await details.json();
    this.setState({ details: detailsJson });
  }

  componentDidMount() {
    this.loadDetails();
  }

  handleDelete = (details) => {
    const id = localStorage.getItem('create-id');
    const data = {
      id_product: id,
      id: details
    };
    axios.post('https://sort.vps-kinghost.net/api/delete/immobile/details/', data)
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  handleSubmit = () => {
    event.preventDefault()
    let linhas = this.state.value.split('\n')
    const value = linhas;
    console.log(value)
    const id = localStorage.getItem('create-id');
    const data = {
      id_product: id,
      details: value,
      type_details: 'immobile'
    };
    axios.post('https://sort.vps-kinghost.net/api/post/immobile/details/', data)
      .then(response => this.setState({ opdateAt: response.data.updateAt }));
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  render() {
    const { value, details } = this.state;
    return (
      <div className="update-form">
        <form onSubmit={this.handleSubmit}>
          <div className="step-container">
            <h3>Característica do Imóvel</h3>
            <div className="container-form">
              <textarea type="text" value={value} rows={10} cols={4} placeholder="Característica do Imóvel"
                onChange={this.handleChange}></textarea>
            </div>
          </div>
          <div className="container-button"><button onClick={() => this.loadDetails()}>Adicionar</button></div>
        </form>
        <ul>
          {details.map((details, i) => (
            <li key={i}>{details.details}<img src={del} onClick={() => this.handleDelete(details.id)}></img></li>
          ))}
        </ul >
        <Link to="/BuildSkill"><div className="container-button"><button>Adicionar Características do Empreendimento</button></div></Link>
      </div >
    );
  }
}

export { ImobilleSkill };