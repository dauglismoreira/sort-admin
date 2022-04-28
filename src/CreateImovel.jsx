import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { setBreadcrumbItems } from './store/actions';

import './UpdateImovel.css';
import './CreateImovel.css';

const dataInit = {
  cep: "",
  logradouro: "",
  complemento: "",
  bairro: "",
  localidade: "",
  uf: "",
  ibge: "",
  gia: "",
  ddd: "",
  siafi: "",
}

class CreateImovel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
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
      lat: '0',
      lng: '0',
      description: '',
      observation: '',
      typeRent: [],
      calcao: '',
      seguro: '',
      carta: '',
      fiador: '',
      price_previous: '0',
      titulo: '',
      fee: '',
      iptu: '',
      condition: '',
      consultant: ''
    };

    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleChangeCondition = this.handleChangeCondition.bind(this);
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
    this.handleChangeObservation = this.handleChangeObservation.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCapture = this.handleChangeCapture.bind(this);
    this.handleChangeFee = this.handleChangeFee.bind(this);
    this.handleChangeIptu = this.handleChangeIptu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  url = () => {
    return `http://viacep.com.br/ws/${this.state.cep}/json/`;
  }

  componentDidMount() {
    document.querySelectorAll('.status-selector-button')[0].click();
    document.querySelectorAll('.status-selector-button')[0].click();
  }

  componentDidUpdate() {
    if (localStorage.getItem('create-id') !== 'undefined' && localStorage.getItem('create-id') !== '') {
      document.getElementById('next-step').style.display = "flex";
    }
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
  handleChangeCarta = e => {
    this.setState({ carta: e.target.checked });
    setTimeout(() => {
      if (this.state.carta !== false) {
        this.state.typeRent.push('Carta Fiança');
      } else {
        var indice = this.state.typeRent.indexOf('Carta Fiança');
        while (indice >= 0) {
          this.state.typeRent.splice(indice, 1);
          indice = this.state.typeRent.indexOf('Carta Fiança');
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
  handleChangeTitulo = e => {
    this.setState({ titulo: e.target.checked });
    setTimeout(() => {
      if (this.state.titulo !== false) {
        this.state.typeRent.push('Título de Captalização');
      } else {
        var indice = this.state.typeRent.indexOf('Título de Captalização');
        while (indice >= 0) {
          this.state.typeRent.splice(indice, 1);
          indice = this.state.typeRent.indexOf('Título de Captalização');
        }
      }
      console.log(this.state.typeRent);
    }, 300);
  };
  handleChangeFee(event) { this.setState({ fee: event.target.value }); }
  handleChangeIptu(event) { this.setState({ iptu: event.target.value }); }
  handleChangeObservation(event) { this.setState({ observation: event.target.value }); }
  handleChangeOwner(event) { this.setState({ owner: event.target.value }); }
  handleChangeWhatsapp(event) { this.setState({ whatsapp: event.target.value }); }
  handleChangeUnity(event) { this.setState({ unity: event.target.value }); }
  handleChangeStatus(event) { this.setState({ status: event.target.value }); }
  handleChangeObjective(event) { this.setState({ objective: event.target.value }); }
  handleChangeType(event) { this.setState({ type_immobile: event.target.value }); }
  handleChangeName(event) {
    const sku = this.state.sku;
    this.setState({ name: event.target.value });
    this.setState({
      url_parameter: (event.target.value.toLowerCase()
        .replace(/[ÀÁÂÃÄàáâãä]/g, "a")
        .replace(/[ÉÈÊËéèêë]/g, "e")
        .replace(/[ÌÍÎÏíìîï]/g, "i")
        .replace(/[ÓÒÕÔÖóòôõö]/g, "o")
        .replace(/[ÚÙÛÜúùûü]/g, "u")
        .replace(/[çÇ]/g, "c")
        .replace(/ /g, "-") + "-" + sku.toLowerCase())
    })
  }
  handleChangeUrl(event) { this.setState({ url_parameter: event.target.value }) }
  handleChangePrice(event) { this.setState({ price: event.target.value.toLocaleString() }); }
  handleChangePricePrev(event) { this.setState({ price_previous: event.target.value.toLocaleString() }) }
  handleChangeZone(event) {
    const zone = event.target.value;
    this.setState({ zone: zone })
  }
  handleChangeRooms(event) { this.setState({ rooms: event.target.value }); }
  handleChangeSuites(event) { this.setState({ suites: event.target.value }); }
  handleChangeBathrooms(event) { this.setState({ bathrooms: event.target.value }); }
  handleChangeGarage(event) { this.setState({ garage: event.target.value }); }
  handleChangeCity(event) { this.setState({ city: event.target.value }); }
  handleChangeAddress(event) { this.setState({ address: event.target.value }); }
  handleChangeComplement(event) { this.setState({ complement: event.target.value }); }
  handleChangeCondition(event) { this.setState({ condition: event.target.value }); }
  handleChangeNumber(event) {
    this.setState({ number: event.target.value });
  }
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
  handleChangeCep(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value }, () => {
      this.buscarCep();
    });
  }
  handleChangeDistrict(event) { this.setState({ district: event.target.value }); }
  handleChangeLat(event) { this.setState({ lat: event.target.value }); }
  handleChangeLng(event) { this.setState({ lng: event.target.value }); }
  handleChangeDescription(event) { this.setState({ description: event.target.value }); }
  handleChangeCapture(event) { this.setState({ consultant: event.target.value }); }

  buscarCep() {
    if (this.state.cep.length < 8) {
      return;
    } else {
      fetch(this.url(), { mode: 'cors' })
        .then((res) => res.json())
        .then((data) => {
          if (data.hasOwnProperty("erro")) {
            this.setState({ data: dataInit });
            alert('Cep não existente');
          } else {
            this.setState({ address: data.logradouro });
            this.setState({ district: data.bairro });
            this.setState({ complement: data.complemento });
            this.setState({ city: data.localidade });
          }
        })
        .catch(err => consolelog(err));
    }
  }

  activeMark = () => {
    var buttons = document.querySelectorAll(".status-selector-button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        for (var a = 0; a < buttons.length; a++) {
          document.querySelectorAll(".status-selector-button")[a].classList.remove("status-selector-active");
        }
        this.classList.add("status-selector-active");
      }
      )
    }
  }

  // mascaraMoeda = () => {
  //   var tecla = (!event) ? window.event.keyCode : event.which;
  //   var cont = document.getElementById('price').value;
  //   var valor = cont.replace(/\D/g, '').split("").reverse().join("");
  //   var resultado = "";
  //   var mascara = "##.###.###,##".split("").reverse().join("");
  //   for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
  //     if (mascara.charAt(x) != '#') {
  //       resultado += mascara.charAt(x);
  //       x++;
  //     } else {
  //       resultado += valor.charAt(y);
  //       y++;
  //       x++;
  //     }
  //   }
  //   document.getElementById('price').value = resultado.split("").reverse().join("");
  // }

  handleSubmit = () => {
    event.preventDefault()
    const dataOwner = this.state.owner;
    const dataDate = new Date();
    const dataIptu = this.state.iptu;
    const dataFee = this.state.fee;
    const dataObservation = this.state.observation;
    const typeRentState = this.state.typeRent;
    const dataTypeRent = typeRentState.toString(typeRentState);
    const dataWhatsapp = this.state.whatsapp;
    const dataUnity = this.state.unity;
    const dataStatus = this.state.status;
    const dataObjective = this.state.objective;
    const dataType = this.state.type_immobile;
    const dataSku = this.state.sku;
    const dataName = this.state.name;
    const dataNameType = this.state.name;
    const dataUrl = this.state.url_parameter;
    const dataPrice = parseInt(this.state.price.replace('.', '').replace('.', ''));
    const dataPriceFinal = dataPrice;
    const dataPricePrev = parseInt(this.state.price_previous.replace('.', '').replace('.', ''));
    const dataPricePrevFinal = dataPricePrev;
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
    const data = {
      owner: dataOwner,
      whatsapp: dataWhatsapp,
      unity: dataUnity,
      status: dataStatus,
      integration: 0,
      objective: dataObjective,
      type_immobile: dataType,
      media_one: "1.jpg",
      media_two: "2.jpg",
      media_three: "3.jpg",
      sku: 0,
      name: dataNameType,
      url_parameter: dataUrl,
      price: dataPriceFinal,
      zone: dataZone,
      zone_full: "m²",
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
      observation: dataObservation,
      business_condition: dataCondition,
      description: dataDescription,
      price_previous: dataPricePrevFinal,
      date_post: dataDate
    };
    axios.post('https://sort.vps-kinghost.net/api/post/immobile/create', data)
      .then(response => {
        alert("Imóvel adicionado com " + response.data.message)
        localStorage.setItem('create-id', response.data.data)
      })

  }

  render() {
    const { type_immobile, condition, price_previous, observation, fee, iptu, type_rent, owner, whatsapp, unity, consultant, status, objective, sku, name, url_parameter, price, zone, rooms, garage, bathrooms, suites, city, address, complement, number, cep, district, lat, lng, description, imovel } = this.state;
    return (
      <div className="update-form">
        <form onSubmit={this.handleSubmit}>
          <div className="step-container">
            <h3>Sobre o proprietário</h3>
            <div className="container-form">
              <label><span>Nome</span><input value={owner}
                onChange={this.handleChangeOwner} placeholder="Nome do proprietário"></input></label>
              <label><span>Telefone</span><input value={whatsapp}
                onChange={this.handleChangeWhatsapp} placeholder="Telefone do proprietário"></input></label>
              <label><span>Unidade</span><input value={unity}
                onChange={this.handleChangeUnity} placeholder="Identificação da propriedade"></input></label>
            </div>
          </div>
          <div className="step-container">
            <h3>Sobre o negócio</h3>
            <div className="container-form">
              <label><span>Negócio</span>
                <select type="text" value={objective}
                  onChange={this.handleChangeObjective} placeholder="Objetivo">
                  <option value={null}>Selecione um negócio</option>
                  <option value="sell">Venda</option>
                  <option value="rent">Locação</option>
                </select></label>
              <label><span>Tipo do Imóvel</span>
                <select type="text" value={type_immobile}
                  onChange={this.handleChangeType} placeholder="Tipo do Imóvel">
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
                onChange={this.handleChangeFee} placeholder="Condomínio"></input></label>
              <label><span>IPTU</span><input type="text" value={iptu}
                onChange={this.handleChangeIptu} placeholder="IPTU"></input></label>
              <div className="check-box-container">
                <span>Garantia de Locação</span>
                <label className="check-box-label"><input type="checkbox" defaultChecked={this.state.calcao} onClick={this.handleChangeCalcao}></input>Déposito Caução</label>
                <label className="check-box-label"><input type="checkbox" defaultChecked={this.state.seguro} onClick={this.handleChangeSeguro}></input>Seguro Fiança</label>
                <label className="check-box-label"><input type="checkbox" defaultChecked={this.state.fiador} onClick={this.handleChangeFiador}></input>Fiador</label>
              </div>
              <label><span>Condições de Pagamento</span><textarea type="text" rows={3} cols={4} value={condition}
                onChange={this.handleChangeCondition} placeholder="Condições de Pagamento"></textarea></label>
              <label><span>Observação</span><textarea type="text" rows={3} cols={4} value={observation}
                onChange={this.handleChangeObservation} placeholder="Observação"></textarea></label>
            </div>
          </div>
          <div className="step-container">
            <h3>Sobre o imóvel</h3>
            <div className="container-form">
              <label><span>Nome do Imóvel</span><input type="text" value={name}
                onChange={this.handleChangeName} placeholder="Nome" maxLength="55" required></input></label>
              <label><span>Url</span><input type="text" value={url_parameter.replace(/\//g, '')}
                onChange={this.handleChangeUrl} placeholder="Url" maxLength="55" required></input></label>
              <label><span>Valor RISCADO em R$</span><input id="price-prev" type="number" placeholder="Valor RISCADO"
                onChange={this.handleChangePricePrev} value={price_previous}></input></label>
              <label><span>Valor em R$</span><input id="price" type="text" value={price}
                onChange={this.handleChangePrice} placeholder="Valor" required></input></label>
              <label><span>Metragem</span><input type="text" value={zone}
                onChange={this.handleChangeZone} placeholder="Metragem" required></input></label>
              <label><span>Nº de Quartos</span><input type="number" value={rooms}
                onChange={this.handleChangeRooms} placeholder="Nº de Quartos" required></input></label>
              <label><span>Nº de Suítes</span><input type="number" value={suites}
                onChange={this.handleChangeSuites} placeholder="Nº de Suítes" required></input></label>
              <label><span>Nº de Banheiros</span><input type="number" value={bathrooms}
                onChange={this.handleChangeBathrooms} placeholder="Nº de Banheiros" required></input></label>
              <label><span>Vagas de Garagem</span><input type="number" value={garage}
                onChange={this.handleChangeGarage} placeholder="Vagas de Garagem" required></input></label>
            </div>
          </div>
          <div className="step-container">
            <h3>Endereço do imóvel</h3>
            <div className="container-form">
              <label><span>CEP</span><input name="cep" type="text" value={cep}
                onChange={this.handleChangeCep} placeholder="CEP"></input></label>
              <label><span>Nome da rua</span><input type="text" value={address}
                onChange={this.handleChangeAddress} placeholder="Nome da Rua"></input></label>
              <label><span>Nº</span><input id="adress-number" type="text" value={number}
                onChange={this.handleChangeNumber} placeholder="Número"></input><div className="load-coord" onClick={() => this.loadCordenadas()}>Carregar Coordenadas</div></label>
              <label><span>Complemento</span><input type="text" value={complement}
                onChange={this.handleChangeComplement} placeholder="Complemento"></input></label>
              <label><span>Bairro</span><input type="text" value={district}
                onChange={this.handleChangeDistrict} placeholder="Bairro"></input></label>
              <label><span>Cidade</span><input type="text" value={city}
                onChange={this.handleChangeCity} placeholder="Cidade" required></input></label>
              <label><span>Latitude</span><input type="text" value={lat}
                onChange={this.handleChangeLat} placeholder="Latitude" required></input></label>
              <label><span>Longitude</span><input type="text" value={lng}
                onChange={this.handleChangeLng} placeholder="Longitude" required></input></label>
            </div>
          </div>
          <div className="step-container">
            <h3>Descrição e Captador</h3>
            <div className="container-form desc">
              <label><span>Captação</span><input type="text" value={consultant}
                onChange={this.handleChangeCapture} placeholder="Captação"></input></label>
              <label><span>Descrição</span><textarea type="text" rows={10} cols={4} value={description}
                onChange={this.handleChangeDescription} placeholder="Descrição"></textarea></label>
            </div>
          </div>
          <div className="step-container">
            <h3>Status</h3>
            <div className="container-form">
              <div className="status-bussiness-selector">
                <div value="0" onClick={() => {
                  this.setState({ status: '0' })
                  this.activeMark()
                }} className="btn status-selector-button">Rascunho</div>
                <div value="1" onClick={() => {
                  this.setState({ status: '1' })
                  this.activeMark()
                }} className="btn status-selector-button">Publicar</div>
              </div>
            </div>
          </div>
          <div className="container-button"><button>Cadastrar</button></div>
        </form>
        <div id="next-step" className="container-button"><Link to='/ImobilleSkill'><button>Adicionar Caracteristicas</button></Link></div>
      </div >
    );
  }
}

export { CreateImovel };