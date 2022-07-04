import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { Draggable } from "react-drag-reorder";
import Teste from './teste';

import './UpdateImovel.css';
import del from './assets/images/delete.png';

import load from './assets/images/loading-buffering.gif';

class UpdateImage extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      selectedFile: '',
      imovel: [],
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
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.loadImages();
    this.loadOptions();
  }

  loadOptions = async () => {
    const id = location.search.replace('?', '');
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

  handleDelete = (images) => {
    const id = location.search.replace('?', '');
    const data = {
      id_product: id,
      medias: [images]
    };
    console.log(data)
    axios.post('https://sort.vps-kinghost.net/api/delete/immobile/media/', data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  loadImages = async () => {
    const id = location.search.replace('?', '');
    const imagesResponse = fetch('https://sort.vps-kinghost.net/api/select/immobile/media/' + id);
    const [images] = await Promise.all([imagesResponse]);
    const imagesJson = await images.json();
    this.setState({ images: imagesJson });

  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  submit() {
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
    const dataDate = new Date();
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

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    console.warn(this.state.selectedFile);
    let url = "https://sort.vps-kinghost.net/api/post/immobile/media/" + id;

    axios.put('https://sort.vps-kinghost.net/api/update/immobile/' + id, dataDateFull)
    axios.post(url, data, {})
      .then(res => {
        console.warn(res);
        if (res.data.success === 'true') {
          alert('Imagem enviada com sucesso!')
        } else {
          alert('O envio da imagem falhou, tente novamente.')
        }
        window.location.reload();
      })
    document.getElementById('message').style.display = "flex";
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }

  getChangedPos = (currentPos, newPos) => {
    const { images } = this.state;
    const id = location.search.replace('?', '');
    const upImg = {
      id: images[currentPos].id,
      position: newPos
    };
    const upImgOld = {
      id: images[newPos].id,
      position: (newPos + 1)
    };
    // console.log("Nova posição para a imagem " + currentPos + " é " + newPos)
    // console.log(images[currentPos].id)
    const pos = []
    const teste = []

    for (var i = 0; i < images.length; i++) {
      teste.push({ 'id': images[i].id })
    }
    for (var i = 0; i < images.length; i++) {
      pos.push({ 'position': images[i].position })
    }

    console.log(teste)
    console.log(images.length)
    // axios.put("https://sort.vps-kinghost.net/api/update/immobile/media/position/" + id, upImg)
    //   .then(res => {
    //     axios.put("https://sort.vps-kinghost.net/api/update/immobile/media/position/" + id, upImgOld)
    //       .then(res => {
    //         window.location.reload();
    //       })
    //   })
  };

  render() {
    const id = location.search.replace('?', '');
    const { value, images } = this.state;
    return (
      <div>
        <div className="row">
          <h3>Imagens do Imóvel</h3>
          <div className="container-send-image">
            <div className="col-md-6">
              <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
            </div>
            <div className="container-button"><button type="submit" onClick={() => this.submit()}>Enviar</button></div>
          </div>
        </div>
        <div className="pictures-container">
          {images.length !== 0 ?
            <Draggable onPosChange={this.getChangedPos}>
              {images.sort((c1, c2) => (c1.position > c2.position) ? 1 : -1).map((images, i) => {
                return (
                  < div key={i} id={images.id} className="picture" style={
                    {
                      backgroundImage: ` url(https://sort.vps-kinghost.net/media/immobile/${id}/${images.url})`
                    }}>
                    <img src={del} onClick={() => this.handleDelete(images.id)}></img>
                    <span style={{ color: `red` }}>{images.position}</span>
                  </div>
                )
              })}
            </Draggable>
            :
            <span></span>
          }

          {/* <Draggable>
            {images.map((images, i) => {
              return (
                < div key={i} className="picture" style={
                  {
                    backgroundImage: ` url(https://sort.vps-kinghost.net/media/immobile/` + id + `/${images.url})`
                  }}>
                  <img src={del} onClick={() => this.handleDelete(images.id)}></img>
                </div>
              )
            })}
          </Draggable> */}
        </div >
        <div className="container-button"><Link to="/imoveis"><button>Concluído</button></Link></div>
        <div id="message" className="message">
          <img className="image-message" src={load}></img>
          <p>Aguarde enquanto tratamos e adicionamos sua imagem</p></div>
      </div >
    );
  }
}

export { UpdateImage };