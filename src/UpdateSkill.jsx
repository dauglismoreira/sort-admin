import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './UpdateImovel.css';
import del from './assets/images/delete.png';

class UpdateSkill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
      imovel: [],
      value: '',
      owner: '',
      whatsapp: '',
      unity: '',
      objective: '',
      type_immobile: '',
      sku: '',
      name: '',
      url_parameter: '',
      price: '',
      zone: '',
      rooms: '',
      suites: '',
      bathrooms: '',
      garage: '',
      city: '',
      address: '',
      complement: '',
      number: '',
      cep: '',
      district: '',
      lat: '',
      lng: '',
      description: '',
      type_rent: '',
      calcao: '',
      seguro: '',
      fiador: '',
      fee: '',
      iptu: '',
      status: '',
      best: '',
      opportunity: '',
      observation: '',
      consultant: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadDetails = async () => {
    const id = localStorage.getItem('id');
    const detailsResponse = fetch('https://sort.vps-kinghost.net/api/select/immobile/details/' + id);
    const [details] = await Promise.all([detailsResponse]);
    const detailsJson = await details.json();
    this.setState({ details: detailsJson });
  }

  componentDidMount() {
    this.loadDetails();
    this.loadOptions();
  }

  loadOptions = async () => {
    const id = localStorage.getItem('id');
    const imovelResponse = fetch('https://sort.vps-kinghost.net/api/select/immobile/' + id);
    const [imovel] = await Promise.all([imovelResponse]);
    const imovelJson = await imovel.json();
    this.setState({ imovel: imovelJson });

    this.setState({ owner: imovelJson[0].owner });
    this.setState({ whatsapp: imovelJson[0].whatsapp });
    this.setState({ unity: imovelJson[0].unity });
    this.setState({ status: imovelJson[0].status });
    this.setState({ best: imovelJson[0].best });
    this.setState({ opportunity: imovelJson[0].opportunity });
    this.setState({ objective: imovelJson[0].objective });
    this.setState({ type_immobile: imovelJson[0].type_immobile });
    this.setState({ sku: imovelJson[0].sku });
    this.setState({ name: imovelJson[0].name });
    this.setState({ url_parameter: imovelJson[0].url_parameter });
    this.setState({ price: imovelJson[0].price });
    this.setState({ zone: imovelJson[0].zone });
    this.setState({ rooms: imovelJson[0].rooms });
    this.setState({ suites: imovelJson[0].suites });
    this.setState({ bathrooms: imovelJson[0].bathrooms });
    this.setState({ garage: imovelJson[0].garage });
    this.setState({ city: imovelJson[0].city });
    this.setState({ address: imovelJson[0].address });
    this.setState({ complement: imovelJson[0].complement });
    this.setState({ number: imovelJson[0].number });
    this.setState({ cep: imovelJson[0].cep });
    this.setState({ district: imovelJson[0].district });
    this.setState({ lat: imovelJson[0].lat });
    this.setState({ lng: imovelJson[0].lng });
    this.setState({ description: imovelJson[0].description });
    this.setState({ consultant: imovelJson[0].consultant });
    this.setState({ fee: imovelJson[0].fee });
    this.setState({ iptu: imovelJson[0].iptu });
    this.setState({ observation: imovelJson[0].observation });
    this.setState({ typeRent: imovelJson[0].type_rent });
  }

  handleChange(event) { this.setState({ value: event.target.value }); }

  handleSubmit = () => {
    event.preventDefault()

    const dataTypeRent = this.state.typeRent;
    const dataOwner = this.state.owner;
    const dataWhatsapp = this.state.whatsapp;
    const dataObservation = this.state.observation;
    const dataUnity = this.state.unity;
    const dataStatus = this.state.status;
    const dataBest = this.state.best;
    const dataOpportunity = this.state.opportunity;
    const dataObjective = this.state.objective;
    const dataType = this.state.type_immobile;
    const dataSku = this.state.sku;
    const dataName = this.state.name;
    const dataUrl = this.state.url_parameter;
    const dataPrice = this.state.price;
    const dataPriceFinal = dataPrice;
    const dataZone = this.state.zone;
    const dataRooms = this.state.rooms;
    const dataSuites = this.state.suites;
    const dataBathrooms = this.state.bathrooms;
    const dataGarage = this.state.garage;
    const dataCity = this.state.city;
    const dataAddress = this.state.address;
    const dataComplement = this.state.complement;
    const dataNumber = this.state.number;
    const dataCep = this.state.cep;
    const dataDistrict = this.state.district;
    const dataLat = this.state.lat;
    const dataLng = this.state.lng;
    const dataDescription = this.state.description;
    const dataCapture = this.state.consultant;
    const dataFee = this.state.fee;
    const dataIptu = this.state.iptu;
    const dataDate = new Date();
    const id = localStorage.getItem('id');
    const dataDateFull = {
      owner: dataOwner,
      whatsapp: dataWhatsapp,
      unity: dataUnity,
      observation: dataObservation,
      status: dataStatus,
      best: dataBest,
      opportunity: dataOpportunity,
      objective: dataObjective,
      type_immobile: dataType,
      sku: dataSku,
      name: dataName,
      url_parameter: dataUrl,
      price: dataPriceFinal,
      zone: dataZone,
      rooms: dataRooms,
      suites: dataSuites,
      bathrooms: dataBathrooms,
      garage: dataGarage,
      city: dataCity,
      address: dataAddress,
      complement: dataComplement,
      number: dataNumber,
      cep: dataCep,
      district: dataDistrict,
      lat: dataLat,
      lng: dataLng,
      consultant: dataCapture,
      fee: dataFee,
      iptu: dataIptu,
      type_rent: dataTypeRent,
      description: dataDescription,
      date_post: dataDate
    };

    let linhas = this.state.value.split('\n');
    const value = linhas;
    const data = {
      id_product: id,
      details: value,
      type_details: 'immobile'
    };
    axios.post('https://sort.vps-kinghost.net/api/post/immobile/details/', data)

    axios.put('https://sort.vps-kinghost.net/api/update/immobile/' + id, dataDateFull)
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  handleDelete = (details) => {
    const id = localStorage.getItem('id');
    const data = {
      id_product: id,
      id: details
    };
    axios.post('https://sort.vps-kinghost.net/api/delete/immobile/details/', data)
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }


  render() {
    const { value, details } = this.state;
    return (
      <div className="update-form">
        <div className="step-container">
          <form onSubmit={this.handleSubmit}>
            <h3>Característica do Imóvel</h3>
            <div className="container-form">
              <label>Característica do Imóvel<textarea type="text" value={value} rows={10} cols={4}
                onChange={this.handleChange}></textarea></label>
            </div>
            <div className="container-button"><button>Adicionar</button></div>

          </form>
          <ul className="list-skills">
            {details.map((details, i) => (
              <li key={i}>{details.details}<img src={del} onClick={() => this.handleDelete(details.id)}></img></li>
            ))}
          </ul >
        </div>
        <Link to="/UpdateBuild"><div className="container-button"><button>Atualizar Características do Empreendimento</button></div></Link>

      </div >
    );
  }
}

export { UpdateSkill };