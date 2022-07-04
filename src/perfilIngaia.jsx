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
              <h3>Informações do Proprietário</h3>
              <li><b>Nome:</b> {cliente.nome}</li>
              <li><b>Email:</b> {cliente.emails}</li>
              <li><b>Telefone:</b> {cliente.telefones}</li>
              <li><b>Tipo de pessoa:</b> {cliente.tipodepessoa}</li>
              <li><b>CPF:</b> {cliente.cpf}</li>
              <li><b>CNPJ:</b> {cliente.cnpj}</li>
              <li><b>Origem:</b> {cliente.midiaorigem}</li>
              <li><b>Observações:</b> {cliente.observacoes}</li>
            </div>
            <div className="step-container">
              <h3>Informações do Empreendimento</h3>
              <li><b>Nome:</b> {empreendimento.nome}</li>
              <li><b>Tipo:</b> {empreendimento.tipo}</li>
              <li><b>Edifício:</b> {empreendimento.edificio}</li>
              <li><b>Andares:</b> {empreendimento.andares}</li>
              <li><b>Status:</b> {empreendimento.status}</li>
              <li><b>Fase:</b> {empreendimento.fase}</li>
              <li><b>Endereço:</b> {empreendimento.tipologradouro + " " + empreendimento.logradouro}</li>
              <li><b>Número:</b> {empreendimento.nomero}</li>
              <li><b>CEP:</b> {empreendimento.cep}</li>
              <li><b>Bairro:</b> {empreendimento.bairro}</li>
              <li><b>Estado:</b> {empreendimento.estado}</li>
            </div>
            <div className="step-container">
              <h3>Cadastro do Imóvel</h3>
              <li><b>Código:</b> {imovel.referencia}</li>
              <li><b>Status:</b> {imovel.status}</li>
              <li><b>Id usuário:</b> {imovel.usuariocadastro}</li>
              <li><b>Exclusividade:</b> {imovel.exclusividade}</li>
              <li><b>Data de criação:</b> {imovel.datacadastro}</li>
              <li><b>Última atualização:</b> {imovel.dataatualizacao}</li>
              <li><b>Unidade:</b> {imovel.complemento}</li>
              <li><b>Financiado:</b> {imovel.financiado}</li>
              <li><b>Aceita financiamento:</b> {imovel.aceitafinanciamento}</li>
              <li><b>Aceita permuta:</b> {imovel.aceitapermuta}</li>
              <li><b>Tipo:</b> {imovel.tipo}</li>
              <li><b>Finalidade:</b> {imovel.finalidade}</li>
              <li><b>Valor de venda:</b> {parseInt(imovel.valorvenda).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
              <li><b>Valor de locação:</b> {parseInt(imovel.valoravaliadolocacao).toLocaleString('pt-br', {
                style: 'currency', currency: 'BRL'
              })
              }</li >
              <li><b>Valor do Condomínio:</b> {parseInt(imovel.valorcondominio).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
              <li><b>Valor do IPTU:</b> {parseInt(imovel.valoriptu).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</li>
              <li><b>Condição do IPTU:</b> {imovel.condiçãoiptu}</li>
            </div>
            <div className="step-container">
              <h3>Sobre o Imóvel</h3>
              <li><b>Litoral:</b> {imovel.litoral}</li>
              <li><b>Vista Mar:</b> {imovel.vistamar}</li>
              <li><b>Pé na Areia:</b> {imovel.penaareia}</li>
              <li><b>Beira mar:</b> {imovel.beiramar}</li>
              <li><b>Padrão:</b> {imovel.padrao}</li>
              <li><b>Ano de Construção:</b> {imovel.anoconstrucao}</li>
              <li><b>Ocupado:</b> {imovel.ocupacao}</li>
              <li><b>Ocupador:</b> {imovel.ocupador}</li>
              <li><b>Referência:</b> {imovel.pontoreferencia}</li>
              <li><b>Área total:</b> {imovel.areatotal}</li>
              <li><b>Área comum:</b> {imovel.areacomum}</li>
              <li><b>Área construída:</b> {imovel.areautilconstruida}</li>
            </div>
            <div className="step-container end">
              <h3>Endereço</h3>
              <li><b>Endereço:</b> {imovel.tipologradouro + " " + imovel.logradouro}</li>
              <li><b>Número:</b> {imovel.numero}</li>
              <li><b>Complemento:</b> {imovel.complemento}</li>
              <li><b>Andares:</b> {imovel.andares}</li>
              <li><b>Andar:</b> {imovel.andar}</li>
              <li><b>Condomínio Fechado:</b> {imovel.condominiofechado}</li>
              <li><b>Localização:</b> {imovel.localizacao}</li>
              <li><b>Cep:</b> {imovel.cep}</li>
              <li><b>Bairro:</b> {imovel.bairro}</li>
              <li><b>Cidade:</b> {imovel.cidade}</li>
              <li><b>Estado:</b> {imovel.estado}</li>
              <li><b>País:</b> {imovel.pais}</li>
              <Map latI={imovel.dl_latitude} lngI={imovel.dl_longitude} zoomLevel={15} />
            </div>
            <div className="step-container desc">
              <h3>Descrições</h3>
              <li><b>Descrição Geral:</b> {imovel.descricaogeral}</li>
              <li><b>Descrição do site:</b> {imovel.descricaosite}</li>
            </div>
            <div className="step-container">
              <h3>Características</h3>
              <li><b>Banheiros:</b> {imovel.banheiros}</li>
              <li><b>Dormitórios:</b> {imovel.dormitorios}</li>
              <li><b>Garagem:</b> {imovel.garagenscobertas}</li>
              <li><b>Suítes:</b> {imovel.suites}</li>
              <li><b>Salas:</b> {imovel.salas}</li>
              <li><b>Cozinha:</b> {imovel.cozinha}</li>
              <li><b>Lavanderia:</b> {imovel.lavanderia}</li>
              <li><b>Dormitório empregada:</b> {imovel.dormitorioempregada}</li>
              <li><b>Banheiro empregada:</b> {imovel.banheiroempregada}</li>
              <li><b>Dispensa:</b> {imovel.dispensa}</li>
              <li><b>Área de serviço:</b> {imovel.areaserviço}</li>
              <li><b>Edícula:</b> {imovel.edicula}</li>
              <li><b>Caseiro:</b> {imovel.caseiro}</li>
              <li><b>Zelador:</b> {imovel.zelador}</li>
              <li><b>Churrasqueira:</b> {imovel.churrasqueira}</li>
              <li><b>Adega:</b> {imovel.adega}</li>
              <li><b>Quadra Poliesportiva:</b> {imovel.quadrapoliesportiva}</li>
              <li><b>Sauna:</b> {imovel.sauna}</li>
              <li><b>Vestiário:</b> {imovel.vestiario}</li>
              <li><b>Campo de futebol:</b> {imovel.campofutebol}</li>
              <li><b>Lavabo:</b> {imovel.lavabo}</li>
              <li><b>Varanda:</b> {imovel.varanda}</li>
              <li><b>Sacada:</b> {imovel.sacada}</li>
              <li><b>Hidro:</b> {imovel.hidro}</li>
              <li><b>Decorato:</b> {imovel.decorado}</li>
              <li><b>Quintal:</b> {imovel.quintal}</li>
              <li><b>Escritório:</b> {imovel.escritorio}</li>
              <li><b>Alarme:</b> {imovel.alarme}</li>
              <li><b>Depósito:</b> {imovel.deposito}</li>
              <li><b>Terraço:</b> {imovel.terraco}</li>
              <li><b>Jardim de inverno:</b> {imovel.jardiminverno}</li>
              <li><b>Pé direito duplo:</b> {imovel.pedireitoduplo}</li>
              <li><b>Lareira:</b> {imovel.lareira}</li>
              <li><b>Mobiliado:</b> {imovel.mobiliado}</li>
              <li><b>Ôfuro:</b> {imovel.ofuro}</li>
              <li><b>Doca:</b> {imovel.doca}</li>
              <li><b>Aquecimento Solar:</b> {imovel.aquecimentosolar}</li>
              <li><b>Recepção:</b> {imovel.recepcao}</li>
              <li><b>Guarita:</b> {imovel.guarita}</li>
              <li><b>Gerador:</b> {imovel.gerador}</li>
              <li><b>Mezanino:</b> {imovel.mezanino}</li>
              <li><b>Ar:</b> {imovel.ar}</li>
              <li><b>Elevador:</b> {imovel.elevador}</li>
              <li><b>Piscina:</b> {imovel.piscina}</li>
              <li><b>Pomar:</b> {imovel.pomar}</li>
              <li><b>Solarium:</b> {imovel.solarium}</li>
              <li><b>Piso Lâminado:</b> {imovel.pisolaminado}</li>
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