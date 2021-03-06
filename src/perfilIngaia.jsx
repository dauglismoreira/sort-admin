import React from 'react';
import axios from 'axios';
import { setBreadcrumbItems } from './store/actions';
import { Link } from 'react-router-dom';
import dateFormat, { masks } from "dateformat";
import Map from './Map';

import './UpdateImovel.css';
import './Map.css';
import { preventDefault } from '@fullcalendar/common';

class PerfilIngaia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imovel: [],
      cliente: [],
      empreendimento: [],
      fotos: []
    };
  }

  componentDidMount() {
    const json_data = require('./ingaia/imoveis.json');
    this.setState({
      imovel: json_data.find(obj => {
        return obj.idimovel === localStorage.getItem('ingaia-id');
      })
    })

    setTimeout(() => {
      const json_clients = require('./ingaia/clientes.json');
      const cliente = json_clients.find(obj => {
        return obj.idcliente === this.state.imovel.idcliente;
      });
      this.setState({ cliente: cliente })
      const json_empr = require('./ingaia/empreendimentos.json');
      const empreendimento = json_empr.find(obj => {
        return obj.idempreendimento === this.state.imovel.idempreendimento;
      });
      this.setState({ empreendimento: empreendimento })
      const json_fotos = require('./ingaia/fotos.json');
      // console.log(json_fotos)
      const fotos = [];
      for (var i = 0; json_fotos.length > i; i++) {
        if (json_fotos[i].idimovel == this.state.imovel.idimovel) {
          fotos.push(json_fotos[i]);
        }
      }
      this.setState({ fotos: fotos })
    }, 300);

  }

  // componentDidUpdate() {
  //   const json_clients = require('./ingaia/clientes.json');
  //   const cliente = json_clients.find(obj => {
  //     return obj.idcliente === this.state.imovel.idcliente;
  //     this.setState({ cliente: cliente })
  //   });
  // }

  render() {
    const { imovel, cliente, empreendimento, fotos } = this.state;

    return (
      <div className="update-form ingaia">
        <div className="container-button">
          <ul>
            <div className="step-container">
              <h3>Informa????es do Propriet??rio</h3>
              <li><b>Nome:</b> {cliente.nome}</li>
              <li><b>Email:</b> {cliente.emails}</li>
              <li><b>Telefone:</b> {cliente.telefones}</li>
              <li><b>Tipo de pessoa:</b> {cliente.tipodepessoa}</li>
              <li><b>CPF:</b> {cliente.cpf}</li>
              <li><b>CNPJ:</b> {cliente.cnpj}</li>
              <li><b>Origem:</b> {cliente.midiaorigem}</li>
              <li><b>Observa????es:</b> {cliente.observacoes}</li>
            </div>
            <div className="step-container">
              <h3>Informa????es do Empreendimento</h3>
              <li><b>Nome:</b> {empreendimento.nome}</li>
              <li><b>Tipo:</b> {empreendimento.tipo}</li>
              <li><b>Edif??cio:</b> {empreendimento.edificio}</li>
              <li><b>Andares:</b> {empreendimento.andares}</li>
              <li><b>Status:</b> {empreendimento.status}</li>
              <li><b>Fase:</b> {empreendimento.fase}</li>
              <li><b>Endere??o:</b> {empreendimento.tipologradouro + " " + empreendimento.logradouro}</li>
              <li><b>N??mero:</b> {empreendimento.nomero}</li>
              <li><b>CEP:</b> {empreendimento.cep}</li>
              <li><b>Bairro:</b> {empreendimento.bairro}</li>
              <li><b>Estado:</b> {empreendimento.estado}</li>
            </div>
            <div className="step-container">
              <h3>Cadastro do Im??vel</h3>
              <li><b>C??digo:</b> {imovel.referencia}</li>
              <li><b>Status:</b> {imovel.status}</li>
              <li><b>Id usu??rio:</b> {imovel.usuariocadastro}</li>
              <li><b>Exclusividade:</b> {imovel.exclusividade}</li>
              <li><b>Data de cria????o:</b> {imovel.datacadastro}</li>
              <li><b>??ltima atualiza????o:</b> {imovel.dataatualizacao}</li>
              <li><b>Unidade:</b> {imovel.complemento}</li>
              <li><b>Financiado:</b> {imovel.financiado}</li>
              <li><b>Aceita financiamento:</b> {imovel.aceitafinanciamento}</li>
              <li><b>Aceita permuta:</b> {imovel.aceitapermuta}</li>
              <li><b>Tipo:</b> {imovel.tipo}</li>
              <li><b>Finalidade:</b> {imovel.finalidade}</li>
              <li><b>Valor de venda:</b> {parseInt(imovel.valorvenda).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
              <li><b>Valor de loca????o:</b> {parseInt(imovel.valoravaliadolocacao).toLocaleString('pt-br', {
                style: 'currency', currency: 'BRL'
              })
              }</li >
              <li><b>Valor do Condom??nio:</b> {parseInt(imovel.valorcondominio).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
              <li><b>Valor do IPTU:</b> {parseInt(imovel.valoriptu).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
              <li><b>Condi????o do IPTU:</b> {imovel.condi????oiptu}</li>
            </div>
            <div className="step-container">
              <h3>Sobre o Im??vel</h3>
              <li><b>Litoral:</b> {imovel.litoral}</li>
              <li><b>Vista Mar:</b> {imovel.vistamar}</li>
              <li><b>P?? na Areia:</b> {imovel.penaareia}</li>
              <li><b>Beira mar:</b> {imovel.beiramar}</li>
              <li><b>Padr??o:</b> {imovel.padrao}</li>
              <li><b>Ano de Constru????o:</b> {imovel.anoconstrucao}</li>
              <li><b>Ocupado:</b> {imovel.ocupacao}</li>
              <li><b>Ocupador:</b> {imovel.ocupador}</li>
              <li><b>Refer??ncia:</b> {imovel.pontoreferencia}</li>
              <li><b>??rea total:</b> {imovel.areatotal}</li>
              <li><b>??rea comum:</b> {imovel.areacomum}</li>
              <li><b>??rea constru??da:</b> {imovel.areautilconstruida}</li>
            </div>
            <div className="step-container end">
              <h3>Endere??o</h3>
              <li><b>Endere??o:</b> {imovel.tipologradouro + " " + imovel.logradouro}</li>
              <li><b>N??mero:</b> {imovel.numero}</li>
              <li><b>Complemento:</b> {imovel.complemento}</li>
              <li><b>Andares:</b> {imovel.andares}</li>
              <li><b>Andar:</b> {imovel.andar}</li>
              <li><b>Condom??nio Fechado:</b> {imovel.condominiofechado}</li>
              <li><b>Localiza????o:</b> {imovel.localizacao}</li>
              <li><b>Cep:</b> {imovel.cep}</li>
              <li><b>Bairro:</b> {imovel.bairro}</li>
              <li><b>Cidade:</b> {imovel.cidade}</li>
              <li><b>Estado:</b> {imovel.estado}</li>
              <li><b>Pa??s:</b> {imovel.pais}</li>
              <Map latI={imovel.dl_latitude} lngI={imovel.dl_longitude} zoomLevel={15} />
            </div>
            <div className="step-container desc">
              <h3>Descri????es</h3>
              <li><b>Descri????o Geral:</b> {imovel.descricaogeral}</li>
              <li><b>Descri????o do site:</b> {imovel.descricaosite}</li>
            </div>
            <div className="step-container">
              <h3>Caracter??sticas</h3>
              <li><b>Banheiros:</b> {imovel.banheiros}</li>
              <li><b>Dormit??rios:</b> {imovel.dormitorios}</li>
              <li><b>Garagem:</b> {imovel.garagenscobertas}</li>
              <li><b>Su??tes:</b> {imovel.suites}</li>
              <li><b>Salas:</b> {imovel.salas}</li>
              <li><b>Cozinha:</b> {imovel.cozinha}</li>
              <li><b>Lavanderia:</b> {imovel.lavanderia}</li>
              <li><b>Dormit??rio empregada:</b> {imovel.dormitorioempregada}</li>
              <li><b>Banheiro empregada:</b> {imovel.banheiroempregada}</li>
              <li><b>Dispensa:</b> {imovel.dispensa}</li>
              <li><b>??rea de servi??o:</b> {imovel.areaservi??o}</li>
              <li><b>Ed??cula:</b> {imovel.edicula}</li>
              <li><b>Caseiro:</b> {imovel.caseiro}</li>
              <li><b>Zelador:</b> {imovel.zelador}</li>
              <li><b>Churrasqueira:</b> {imovel.churrasqueira}</li>
              <li><b>Adega:</b> {imovel.adega}</li>
              <li><b>Quadra Poliesportiva:</b> {imovel.quadrapoliesportiva}</li>
              <li><b>Sauna:</b> {imovel.sauna}</li>
              <li><b>Vesti??rio:</b> {imovel.vestiario}</li>
              <li><b>Campo de futebol:</b> {imovel.campofutebol}</li>
              <li><b>Lavabo:</b> {imovel.lavabo}</li>
              <li><b>Varanda:</b> {imovel.varanda}</li>
              <li><b>Sacada:</b> {imovel.sacada}</li>
              <li><b>Hidro:</b> {imovel.hidro}</li>
              <li><b>Decorato:</b> {imovel.decorado}</li>
              <li><b>Quintal:</b> {imovel.quintal}</li>
              <li><b>Escrit??rio:</b> {imovel.escritorio}</li>
              <li><b>Alarme:</b> {imovel.alarme}</li>
              <li><b>Dep??sito:</b> {imovel.deposito}</li>
              <li><b>Terra??o:</b> {imovel.terraco}</li>
              <li><b>Jardim de inverno:</b> {imovel.jardiminverno}</li>
              <li><b>P?? direito duplo:</b> {imovel.pedireitoduplo}</li>
              <li><b>Lareira:</b> {imovel.lareira}</li>
              <li><b>Mobiliado:</b> {imovel.mobiliado}</li>
              <li><b>??furo:</b> {imovel.ofuro}</li>
              <li><b>Doca:</b> {imovel.doca}</li>
              <li><b>Aquecimento Solar:</b> {imovel.aquecimentosolar}</li>
              <li><b>Recep????o:</b> {imovel.recepcao}</li>
              <li><b>Guarita:</b> {imovel.guarita}</li>
              <li><b>Gerador:</b> {imovel.gerador}</li>
              <li><b>Mezanino:</b> {imovel.mezanino}</li>
              <li><b>Ar:</b> {imovel.ar}</li>
              <li><b>Elevador:</b> {imovel.elevador}</li>
              <li><b>Piscina:</b> {imovel.piscina}</li>
              <li><b>Pomar:</b> {imovel.pomar}</li>
              <li><b>Solarium:</b> {imovel.solarium}</li>
              <li><b>Piso L??minado:</b> {imovel.pisolaminado}</li>
              <li><b>Piso Porcelanato:</b> {imovel.pisoporcelanato}</li>
              <li><b>Piso Aquecido:</b> {imovel.pisoaquecido}</li>
            </div>
            <div className="step-container fotos">
              <h3>Fotos</h3>
              <div className="imovel-ingaia-foto">
                {fotos.map((foto, index) => (
                  <a href={foto.urlgrande} target="_blank">
                    <div className="imovel-ingaia-foto-link" style={
                      {
                        backgroundImage: ` url(${foto.urlminiatura})`
                      }}></div>
                  </a>
                ))}
              </div>
            </div>
          </ul >
        </div >
      </div >
    );
  }
}

export default PerfilIngaia;