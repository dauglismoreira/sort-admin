import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './UpdateImovel.css';
import del from './assets/images/delete.png';
import load from './assets/images/loading-buffering.gif';

class ImobilleImage extends React.Component {

  constructor() {
    super();
    this.state = {
      images: [],
      selectedFile: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.loadImages();
  }

  handleDelete = (images) => {
    event.preventDefault()
    const id = localStorage.getItem('create-id');
    const data = {
      id_product: id,
      medias: [images.id]
    };
    axios.post('https://sort.vps-kinghost.net/api/delete/immobile/media/', data);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  loadImages = async () => {
    const id = localStorage.getItem('create-id');
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
    const id = localStorage.getItem('create-id');
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    console.warn(this.state.selectedFile);
    let url = "https://sort.vps-kinghost.net/api/post/immobile/media/" + id;

    axios.post(url, data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        console.warn(res);
        if (res.data.success === 'true') {
          alert('Imagem enviada com sucesso!')
        } else {
          alert('O envio da imagem falhou, tente novamente.')
        }
        window.location.reload();
      })
    document.getElementById('message').style.display = "flex";
  }

  render() {
    const { value, images, id } = this.state;
    console.log(images);

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
          {images.map((images, i) => (
            < div key={i} className="picture" style={
              {
                backgroundImage: ` url(https://sort.vps-kinghost.net/media/immobile/` + localStorage.getItem('create-id') + `/${images.url})`
              }}>
              <img src={del} onClick={() => this.handleDelete(images)}></img>
            </div>
          ))}
        </div >
        <div className="container-button"><Link to="/imoveis"><button>Concluído</button></Link></div>
        <div id="message" className="message">
          <img className="image-message" src={load}></img>
          <p>Aguarde enquanto tratamos e adicionamos sua imagem</p></div>
      </div >
    );

  }
}

export { ImobilleImage };