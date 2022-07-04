import React from 'react';
import axios from 'axios';
import { setBreadcrumbItems } from './store/actions';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import dateFormat, { masks } from "dateformat";
import PropTypes from "prop-types";

import './UpdateImovel.css';
import { preventDefault } from '@fullcalendar/common';


class UpdateImovel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imovel: [],
      owner: '',
      whatsapp: '',
      unity: '',
      objective: '',
      type_immobile: '',
      sku: '',
      name: '',
      url_parameter: '',
      code_product: '',
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
      type_rent: [],
      calcao: '',
      seguro: '',
      fiador: '',
      fee: '',
      iptu: '',
      status: '',
      best: '',
      integration: '',
      opportunity: '',
      observation: '',
      condition: '',
      consultant: '',
      price_previous: '0',
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

    this.handleChangeZoneFull = this.handleChangeZoneFull.bind(this);
    this.handleChangePartnership = this.handleChangePartnership.bind(this);
    this.handleChangeDemiSuite = this.handleChangeDemiSuite.bind(this);
    this.handleChangeObservation = this.handleChangeObservation.bind(this);
    this.handleChangeCondition = this.handleChangeCondition.bind(this);
    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleChangeWhatsapp = this.handleChangeWhatsapp.bind(this);
    this.handleChangeUnity = this.handleChangeUnity.bind(this);
    this.handleChangeObjective = this.handleChangeObjective.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangePricePrev = this.handleChangePricePrev.bind(this);
    this.handleChangeZone = this.handleChangeZone.bind(this);
    this.handleChangeRooms = this.handleChangeRooms.bind(this);
    this.handleChangeSuites = this.handleChangeSuites.bind(this);
    this.handleChangeBathrooms = this.handleChangeBathrooms.bind(this);
    this.handleChangeGarage = this.handleChangeGarage.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeCep = this.handleChangeCep.bind(this);
    this.handleChangeComplement = this.handleChangeComplement.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeDistrict = this.handleChangeDistrict.bind(this);
    this.handleChangeLat = this.handleChangeLat.bind(this);
    this.handleChangeLng = this.handleChangeLng.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCapture = this.handleChangeCapture.bind(this);
    this.handleChangeFee = this.handleChangeFee.bind(this);
    this.handleChangeIptu = this.handleChangeIptu.bind(this);
    this.handleChangeTitleDesc = this.handleChangeTitleDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.loadOptions();

  }

  loadOptions = async () => {
    const id = location.search.replace('?', '');
    const imovelResponse = fetch('https://sort.vps-kinghost.net/api/immobile/select/' + id);
    const [imovel] = await Promise.all([imovelResponse]);
    const imovelJson = await imovel.json();
    this.setState({ imovel: imovelJson });

    if (imovelJson[0].type_rent !== null) {
      if (imovelJson[0].type_rent.includes('Déposito Calção') === true) {
        setTimeout(() => {
          document.getElementById('calcao').click()
        }, 300);
      }
      if (imovelJson[0].type_rent.includes('Seguro Fiança') === true) {
        setTimeout(() => {
          document.getElementById('fianca').click()
        }, 300);
      }
      if (imovelJson[0].type_rent.includes('Fiador') === true) {
        setTimeout(() => {
          document.getElementById('fiador').click()
        }, 300);
      }

      if (imovelJson[0].tax === '1') {
        setTimeout(() => {
          document.getElementById('tax').click()
        }, 300);
      }

      if (imovelJson[0].show_map == '1') {
        setTimeout(() => {
          document.getElementById('show_map').click()
        }, 300);
      } else {
        this.setState({ show_map_data: '0' })
      }
    }

    this.setState({ owner: imovelJson[0].owner });
    this.setState({ whatsapp: imovelJson[0].whatsapp });
    this.setState({ condition: imovelJson[0].business_condition });
    this.setState({ unity: imovelJson[0].unity });
    this.setState({ status: imovelJson[0].status });
    this.setState({ integration: imovelJson[0].integration });
    this.setState({ best: imovelJson[0].best });
    this.setState({ opportunity: imovelJson[0].opportunity });
    this.setState({ objective: imovelJson[0].objective });
    this.setState({ type_immobile: imovelJson[0].type_immobile });
    this.setState({ sku: imovelJson[0].sku });
    this.setState({ name: imovelJson[0].name });
    this.setState({ url_parameter: imovelJson[0].url_parameter });
    this.setState({ price: imovelJson[0].price });
    if (imovelJson[0].price_previous !== '' || imovelJson[0].price_previous !== null) {
      this.setState({ price_previous: imovelJson[0].price_previous })
    }
    this.setState({ zone: imovelJson[0].zone });
    this.setState({ rooms: imovelJson[0].rooms });
    this.setState({ suites: imovelJson[0].suites });
    this.setState({ bathrooms: imovelJson[0].bathrooms });
    this.setState({ garage: imovelJson[0].garage });
    this.setState({ code_product: location.search.replace('?', '') });
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
    this.setState({ typeRent: [] });
    this.setState({ seguro: true });
    this.setState({ fiador: true });
    this.setState({ partnership: imovelJson[0].partnership });
    this.setState({ demi_suite: imovelJson[0].demi_suite });
    this.setState({ zone_full: imovelJson[0].zone_full });
    this.setState({ tax: imovelJson[0].tax });
    this.setState({ title_description: imovelJson[0].title_description });
    this.setState({ show_map: imovelJson[0].show_map });
    this.setState({ integration_zap: imovelJson[0].integration_zap })
  }

  handleChangeCalcao = e => {
    this.setState({ calcao: e.target.checked });
    setTimeout(() => {
      if (this.state.calcao !== false) {
        this.state.typeRent.push('Déposito Calção');
      } else {
        var indice = this.state.typeRent.indexOf('Déposito Calção');
        while (indice >= 0) {
          this.state.typeRent.splice(indice, 1);
          indice = this.state.typeRent.indexOf('Déposito Calção');
        }
      }
      console.log(this.state.typeRent);
    }, 300);
  };
  handleChangeSeguro = e => {
    this.setState({ seguro: e.target.checked });
    setTimeout(() => {
      if (this.state.seguro !== false) {
        this.state.typeRent.push('Seguro Fiança');
      } else {
        var indice = this.state.typeRent.indexOf('Seguro Fiança');
        while (indice >= 0) {
          this.state.typeRent.splice(indice, 1);
          indice = this.state.typeRent.indexOf('Seguro Fiança');
        }
      }
      console.log(this.state.typeRent);
    }, 300);
  };
  handleChangeFiador = e => {
    this.setState({ fiador: e.target.checked });
    setTimeout(() => {
      if (this.state.fiador !== false) {
        this.state.typeRent.push('Fiador');
      } else {
        var indice = this.state.typeRent.indexOf('Fiador');
        while (indice >= 0) {
          this.state.typeRent.splice(indice, 1);
          indice = this.state.typeRent.indexOf('Fiador');
        }
      }
      console.log(this.state.typeRent);
    }, 300);
  };
  handleChangeTax = e => {
    this.setState({ tax: e.target.checked });
    setTimeout(() => {
      if (this.state.tax !== false) {
        this.setState({ tax_data: '1' });
      } else {
        this.setState({ tax_data: '0' });
      }
      console.log(this.state.tax_data);
    }, 300);
  };

  handleChangeShowMap = e => {
    this.setState({ show_map: e.target.checked });
    setTimeout(() => {
      if (this.state.show_map !== false) {
        this.setState({ show_map_data: '1' });
      } else if (this.state.show_map) {
        this.setState({ show_map_data: '0' });
      } else if (this.state.show_map == '') {
        this.setState({ show_map_data: '0' });
      } else {
        this.setState({ show_map_data: '0' });
      }
    }, 300);
  };

  handleChangeFee(event) { this.setState({ fee: event.target.value }); }
  handleChangeCondition(event) { this.setState({ condition: event.target.value }); }
  handleChangeIptu(event) { this.setState({ iptu: event.target.value }); }
  handleChangeOwner(event) { this.setState({ owner: event.target.value }); }
  handleChangeObservation(event) { this.setState({ observation: event.target.value }); }
  handleChangeWhatsapp(event) { this.setState({ whatsapp: event.target.value }); }
  handleChangeUnity(event) { this.setState({ unity: event.target.value }); }
  handleChangeObjective(event) { this.setState({ objective: event.target.value }); }
  handleChangeType(event) { this.setState({ type_immobile: event.target.value }); }
  handleChangeName(event) { this.setState({ name: event.target.value }); }
  handleChangeUrl(event) { this.setState({ url_parameter: event.target.value }) }
  handleChangePrice(event) { this.setState({ price: event.target.value }); }
  handleChangePricePrev(event) { this.setState({ price_previous: event.target.value }); }
  handleChangeZone(event) { this.setState({ zone: event.target.value }); }
  handleChangeRooms(event) { this.setState({ rooms: event.target.value }); }
  handleChangeSuites(event) { this.setState({ suites: event.target.value }); }
  handleChangeBathrooms(event) { this.setState({ bathrooms: event.target.value }); }
  handleChangeGarage(event) { this.setState({ garage: event.target.value }); }
  handleChangeCity(event) { this.setState({ city: event.target.value }); }
  handleChangeAddress(event) { this.setState({ address: event.target.value }); }
  handleChangeComplement(event) { this.setState({ complement: event.target.value }); }
  handleChangeNumber(event) { this.setState({ number: event.target.value }); }
  handleChangeCep(event) { this.setState({ cep: event.target.value }); }
  handleChangeDistrict(event) { this.setState({ district: event.target.value }); }
  handleChangeLat(event) { this.setState({ lat: event.target.value }); }
  handleChangeLng(event) { this.setState({ lng: event.target.value }); }
  handleChangeDescription(event) { this.setState({ description: event.target.value }); }
  handleChangeCapture(event) { this.setState({ consultant: event.target.value }); }
  handleChangeTitleDesc(event) { this.setState({ title_description: event.target.value }); }
  loadCordenadas(event) {
    const address = this.state.address;
    const number = this.state.number;
    const city = this.state.city;
    if (address !== '') {
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ',' + number + ',' + city + '&key=AIzaSyBswLCO_NJ1ZPqCfxFr6aNX0pyaw1SyhvM')
        .then(response => {
          this.setState({ lat: response.data.results[0].geometry.location.lat })
          this.setState({ lng: response.data.results[0].geometry.location.lng })
        })
    } else {
      alert("Você precisa inserir um CEP para encontrar as coordenadas.")
    }
  }
  handleChangePartnership(event) { this.setState({ partnership: event.target.value }); }
  handleChangeDemiSuite(event) { this.setState({ demi_suite: event.target.value }); }
  handleChangeZoneFull(event) {
    const zoneFull = event.target.value;
    this.setState({ zone_full: zoneFull })
  }
  mascaraMoeda = () => {
    var tecla = (!event) ? window.event.keyCode : event.which;
    var cont = document.getElementById('price').value;
    var valor = cont.replace(/\D/g, '');
    var resultado = "";
    var mascara = "###.###.###,##";
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
      if (mascara.charAt(x) != '#') {
        resultado += mascara.charAt(x);
        x++;
      } else {
        resultado += valor.charAt(y);
        y++;
        x++;
      }
    }
    document.getElementById('price').value = resultado;
  }

  mascaraMoeda = () => {
    var tecla = (!event) ? window.event.keyCode : event.which;
    var cont = document.getElementById('price-prev').value;
    var valor = cont.replace(/\D/g, '');
    var resultado = "";
    var mascara = "###.###.###,##";
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
      if (mascara.charAt(x) != '#') {
        resultado += mascara.charAt(x);
        x++;
      } else {
        resultado += valor.charAt(y);
        y++;
        x++;
      }
    }
    document.getElementById('price-prev').value = resultado;
  }

  handleSubmit = () => {
    event.preventDefault()
    const typeRentState = this.state.typeRent;
    const dataTypeRent = typeRentState.toString(typeRentState);
    const dataOwner = this.state.owner;
    const dataWhatsapp = this.state.whatsapp;
    const dataObservation = this.state.observation;
    const dataUnity = this.state.unity;
    const dataStatus = this.state.status;
    const dataIntegration = this.state.integration;
    const dataBest = this.state.best;
    const dataOpportunity = this.state.opportunity;
    const dataObjective = this.state.objective;
    const dataType = this.state.type_immobile;
    const dataSku = this.state.sku;
    const dataName = this.state.name;
    const dataUrl = this.state.url_parameter;
    const dataPrice = parseInt(this.state.price.replace('.', '').replace('.', ''));
    const dataPricePrev = this.state.price_previous;
    const dataPricePrevFinal = dataPricePrev;
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
    const dataCondition = this.state.condition;
    const dataCapture = this.state.consultant;
    const dataFee = this.state.fee;
    const dataIptu = this.state.iptu;
    const dataDate = new Date();
    const id = location.search.replace('?', '');
    const dataPartnership = this.state.partnership;
    const dataDemiSuite = this.state.demi_suite;
    const dataZoneFull = this.state.zone_full;
    const dataTitleDesc = this.state.title_description;
    const dataTax = this.state.tax_data;
    const dataShowMap = this.state.show_map_data;
    const dataIntegrationZap = this.state.integration_zap;
    const data = {
      id: id,
      owner: dataOwner,
      integration: dataIntegration,
      integration_zap: dataIntegrationZap,
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
      price_previous: dataPricePrevFinal,
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
      business_condition: dataCondition,
      date_post: dataDate,
      partnership: dataPartnership,
      demi_suite: dataDemiSuite,
      title_description: dataTitleDesc,
      tax: dataTax,
      show_map: dataShowMap
    };

    axios.put('https://sort.vps-kinghost.net/api/immobile/update', data)
      .then(response => {
        alert("Imóvel atualizado com " + response.data.message)
        console.log(data)
        window.location.reload();
      });
  }

  render() {
    const { type_immobile, title_description, zone_full, partnership, demi_suite, condition, price_previous, code_product, observation, fee, iptu, owner, whatsapp, unity, consultant, objective, sku, name, url_parameter, price, zone, rooms, garage, bathrooms, suites, city, address, complement, number, cep, district, lat, lng, description, imovel } = this.state;
    return (
      <div className="update-form">
        <form onSubmit={this.handleSubmit}>
          {imovel.map((imovel, index) => (
            <div key={index}>
              <span className="last-update"><b>Última atualização:</b>{dateFormat(imovel.date_post, "  d/mm/yyyy, h:MM:ss TT")}</span>
              <small>Campos em destaque são exibidos no site</small>
              <div className="step-container">
                <h3>Sobre o proprietário</h3>
                <div className="container-form">
                  <label><span>Nome</span><input value={owner}
                    onChange={this.handleChangeOwner} placeholder={imovel.owner}></input></label>
                  <label><span>Telefone</span><input value={whatsapp}
                    onChange={this.handleChangeWhatsapp} placeholder={imovel.whatsapp}></input></label>
                  <label><span>Unidade</span><input value={unity}
                    onChange={this.handleChangeUnity} placeholder={imovel.unity}></input></label>
                </div>
              </div>
              <div className="step-container">
                <h3>Sobre o negócio</h3>
                <div className="container-form">
                  <label className="front"><span>Negócio</span>
                    <select type="text" value={objective}
                      onChange={this.handleChangeObjective} placeholder={imovel.objective}>
                      <option value={null}>Selecione um negócio</option>
                      <option value="sell">Venda</option>
                      <option value="rent">Locação</option>
                    </select></label>
                  <label className="front"><span>Tipo do Imóvel</span>
                    <select type="text" value={type_immobile}
                      onChange={this.handleChangeType} placeholder={imovel.type_immobile}>
                      <option value={null}>Selecione um tipo</option>
                      <option value="land_shed">Galpões e terrenos logísticos</option>
                      <option value="roof">Coberturas</option>
                      <option value="facing_sea">Apartamentos Frente mar</option>
                      <option value="sea_court">Apartamentos Quadra mar</option>
                      <option value="apartament_dif">Apartamentos Diferenciados</option>
                      <option value="plant">Apartamentos na planta</option>
                      <option value="others_apartament">Outros Apartamentos</option>
                      <option value="terrain">Terrenos residencias</option>
                      <option value="house">Casas</option>
                    </select></label>
                  <label><span>Condomínio</span><input type="text" value={fee}
                    onChange={this.handleChangeFee} placeholder={imovel.fee}></input></label>
                  <label><span>IPTU</span><input type="text" value={iptu}
                    onChange={this.handleChangeIptu} placeholder={imovel.iptu}></input></label>
                  <div className="check-box-container">
                    <span>Garantia de Locação</span>
                    <label className="check-box-label"><input id="calcao" type="checkbox" defaultChecked={this.state.calcao} onClick={this.handleChangeCalcao}></input>Déposito Caução</label>
                    <label className="check-box-label"><input id="fianca" type="checkbox" defaultChecked={this.state.seguro} onClick={this.handleChangeSeguro}></input>Seguro Fiança</label>
                    <label className="check-box-label"><input id="fiador" type="checkbox" defaultChecked={this.state.fiador} onClick={this.handleChangeFiador}></input>Fiador</label>
                  </div>
                  <label><span>Observação</span><textarea type="text" rows={3} cols={4} value={observation}
                    onChange={this.handleChangeObservation} placeholder={imovel.observation}></textarea></label>
                  <label><span>Parceria com corretor</span><input type="text" value={partnership}
                    onChange={this.handleChangePartnership} placeholder={imovel.partnership}></input></label>
                </div>
              </div>
              <div className="step-container">
                <h3>Sobre o imóvel</h3>
                <div className="container-form">
                  <label className="front"><span>Código</span><span>{imovel.sku}</span></label>
                  <label className="front"><span>Nome do Imóvel</span><input type="text" value={name}
                    onChange={this.handleChangeName} placeholder={imovel.name} maxLength="55"></input></label>
                  <label><span>Url</span><input type="text" value={url_parameter}
                    onChange={this.handleChangeUrl} placeholder={imovel.url_parameter} maxLength="55"></input></label>
                  <label className="front"><span>Metragem Útil</span><input type="text" value={zone}
                    onChange={this.handleChangeZone} placeholder={imovel.zone}></input></label>
                  <label className="front"><span>Metragem Total</span><input type="text" value={zone_full}
                    onChange={this.handleChangeZoneFull} placeholder={imovel.zone_full} required></input></label>
                  <label className="front"><span>Valor RISCADO em R$</span><input id="price-prev" type="text" placeholder={price_previous}
                    onChange={this.handleChangePricePrev} value={price_previous}></input></label>
                  <label className="front"><span>Valor em R$</span><input id="price" type="text" placeholder={imovel.price}
                    onChange={this.handleChangePrice} value={price}></input></label>
                  <label className="front"><span>Nº de Quartos</span><input type="number" value={rooms}
                    onChange={this.handleChangeRooms} placeholder={imovel.rooms}></input></label>
                  <label className="front"><span>Nº de Demi-Suítes</span><input type="number" value={demi_suite}
                    onChange={this.handleChangeDemiSuite} placeholder={imovel.demi_suite}></input></label>
                  <label className="front"><span>Nº de Suítes</span><input type="number" value={suites}
                    onChange={this.handleChangeSuites} placeholder={imovel.suites}></input></label>
                  <label><span>Nº de Banheiros</span><input type="number" value={bathrooms}
                    onChange={this.handleChangeBathrooms} placeholder={imovel.bathrooms}></input></label>
                  <label className="front"><span>Vagas de Garagem</span><input type="number" value={garage}
                    onChange={this.handleChangeGarage} placeholder={imovel.garage}></input></label>
                  <label className="front"><span>Condições de Pagamento</span><textarea type="text" rows={3} cols={4} value={condition}
                    onChange={this.handleChangeCondition} placeholder={imovel.business_condition}></textarea></label>
                </div>
              </div>
              <div className="step-container">
                <h3>Endereço do imóvel</h3>
                <div className="container-form">
                  <label><span>CEP</span><input name="cep" type="text" value={cep}
                    onChange={this.handleChangeCep} placeholder={imovel.cep}></input></label>
                  <label><span>Nome da rua</span><input type="text" value={address}
                    onChange={this.handleChangeAddress} placeholder={imovel.address}></input></label>
                  <label><span>Nº</span><input id="adress-number" type="text" value={number}
                    onChange={this.handleChangeNumber} placeholder={imovel.number}></input><div className="load-coord" onClick={() => this.loadCordenadas()}>Carregar Coordenadas</div></label>
                  <label><span>Complemento</span><input type="text" value={complement}
                    onChange={this.handleChangeComplement} placeholder={imovel.complement}></input></label>
                  <label><span>Bairro</span><input type="text" value={district}
                    onChange={this.handleChangeDistrict} placeholder={imovel.district}></input></label>
                  <label className="front"><span>Cidade</span><input type="text" value={city}
                    onChange={this.handleChangeCity} placeholder={imovel.city}></input></label>
                  <label><span>Latitude</span><input type="text" value={lat}
                    onChange={this.handleChangeLat} placeholder={imovel.lat}></input></label>
                  <label><span>Longitude</span><input type="text" value={lng}
                    onChange={this.handleChangeLng} placeholder={imovel.lng}></input></label>
                  <label className="front check-box-label"><input id="show_map" type="checkbox" defaultChecked={this.state.show_map} onClick={this.handleChangeShowMap}></input>Exibir indicador no mapa</label>
                </div>
              </div>
              <div className="step-container">
                <h3>Descrição e Captador</h3>
                <div className="container-form desc">
                  <label className="front"><span>Captação</span><input type="text" value={consultant}
                    onChange={this.handleChangeCapture} placeholder={imovel.consultant}></input></label>
                  <label className="front"><span>Título da Descrição</span><input type="text" value={title_description}
                    onChange={this.handleChangeTitleDesc} placeholder="Título da Descrição"></input></label>
                  <label className="front"><span>Descrição</span><textarea type="text" rows={10} cols={4} value={description}
                    onChange={this.handleChangeDescription} placeholder={imovel.description}></textarea></label>
                  <label className="front check-box-label tax"><input id="tax" type="checkbox" defaultChecked={this.state.tax} onClick={this.handleChangeTax}></input>Taxas inclusas?</label>
                </div>
              </div>
            </div>
          ))}
          <div className="container-button"><button>Atualizar</button></div>
        </form>
        <div className="container-button"><Link to={"/UpdateSkill?" + code_product}><button>Atualizar Características</button></Link></div>
      </div >
    );
  }
}

export { UpdateImovel };