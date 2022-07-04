import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

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
      code_product: '',
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
      consultant: '',
      partnership: '',
      demi_suite: '',
      zone_full: '',
      tax: '',
      title_description: '',
      tax_data: '',
      show_map: '',
      show_map_data: '',
      integration_zap: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  loadDetails = async () => {
    const id = location.search.replace('?', '');
    const detailsResponse = fetch('https://sort.vps-kinghost.net/api/immobile/select/details/' + id);
    const [details] = await Promise.all([detailsResponse]);
    const detailsJson = await details.json();
    this.setState({ details: detailsJson });
  }

  componentDidMount() {
    this.loadDetails();
    this.loadOptions();
  }

  loadOptions = async () => {
    const id = location.search.replace('?', '');
    const imovelResponse = fetch('https://sort.vps-kinghost.net/api/immobile/select/' + id);
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
    this.setState({ code_product: location.search.replace('?', '') });
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
    this.setState({ partnership: imovelJson[0].partnership });
    this.setState({ demi_suite: imovelJson[0].demi_suite });
    this.setState({ zone_full: imovelJson[0].zone_full });
    this.setState({ tax: imovelJson[0].tax });
    this.setState({ integration_zap: imovelJson[0].integration_zap })
    if (imovelJson[0].show_map !== null && imovelJson[0].show_map !== '') {
      this.setState({ show_map_data: imovelJson[0].show_map });
    } else {
      this.setState({ show_map_data: '0' });
    }
    this.setState({ title_description: imovelJson[0].title_description });
  }

  handleChange(event) { this.setState({ value: event.target.value }); }

  handleSubmit = () => {
    event.preventDefault()
    const id = location.search.replace('?', '');
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
    const dataPartnership = this.state.partnership;
    const dataDemiSuite = this.state.demi_suite;
    const dataZoneFull = this.state.zone_full;
    const dataTitleDesc = this.state.title_description;
    const dataTax = this.state.tax_data;
    const dataShowMap = this.state.show_map_data;
    const dataIntegrationZap = this.state.integration_zap;
    const dataDate = new Date();
    const dataDateFull = {
      id: id,
      owner: dataOwner,
      whatsapp: dataWhatsapp,
      unity: dataUnity,
      observation: dataObservation,
      status: dataStatus,
      best: dataBest,
      integration_zap: dataIntegrationZap,
      opportunity: dataOpportunity,
      objective: dataObjective,
      type_immobile: dataType,
      sku: dataSku,
      name: dataName,
      url_parameter: dataUrl,
      price: dataPriceFinal,
      zone: dataZone,
      zone_full: dataZoneFull,
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
      date_post: dataDate,
      partnership: dataPartnership,
      demi_suite: dataDemiSuite,
      title_description: dataTitleDesc,
      tax: dataTax,
      show_map: dataShowMap
    };

    let linhas = this.state.value.replace("'", "@").split('\n');
    const value = linhas;
    const data = {
      id_product: id,
      details: value,
      type_details: 'immobile'
    };
    axios.post('https://sort.vps-kinghost.net/api/immobile/create/details', data)

    axios.put('https://sort.vps-kinghost.net/api/immobile/update', dataDateFull)
      .then(response => {
        window.location.reload();
      });
  }

  handleDelete = (details) => {
    const id = location.search.replace('?', '');
    const data = {
      id_product: id,
      id: details
    };
    axios.post('https://sort.vps-kinghost.net/api/immobile/delete/details', data)
      .then(response => {
        console.log(data)
        window.location.reload();
      });
  }


  render() {
    const { value, details, code_product } = this.state;
    return (
      <div className="update-form">
        <div className="step-container carac">
          <h3>Característica do Imóvel</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="container-form">
              <label><span>Característica do Imóvel</span>
                <span><textarea type="text" value={value} rows={10} cols={4}
                  onChange={this.handleChange}></textarea></span>
              </label>
            </div>
            <div className="container-button"><button>Adicionar</button></div>

          </form>
          <ul className="list-skills">
            {details.map((details, i) => (
              <li key={i}>{details.details.replace("@", "'")}<img src={del} onClick={() => this.handleDelete(details.id)}></img></li>
            ))}
          </ul >
        </div>
        <Link to={"/UpdateBuild?" + code_product}><div className="container-button"><button>Atualizar Características do Empreendimento</button></div></Link>

      </div >
    );
  }
}

export { UpdateSkill };