import React, { useState, useRef, useMemo, Component } from 'react';
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw } from 'draft-js';
import axios from 'axios';
import { Link } from "react-router-dom";

import './CreatePost.css';

import { stateToHTML } from 'draft-js-export-html';


class CreatePost extends React.Component {


  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      selectedFile: '',
      title: '',
      url: '',
      status: '',
      sub_title: '',
      abstract: '',
      content: '',
      date: '',
      category: '',
      categories: []
    }

    this.handleInputImage = this.handleInputImage.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeSubTitle = this.handleChangeSubTitle.bind(this);
    this.handleChangeAbstract = this.handleChangeAbstract.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    document.querySelectorAll('.status-selector-button')[0].click();
    document.querySelectorAll('.status-selector-button')[0].click();

    axios.get('https://sort.vps-kinghost.net/api/blog/category')
      .then(response => {
        this.setState({ categories: response.data })
      })
  }

  handleChangeStatus(event) { this.setState({ status: event.target.value }); }
  handleChangeTitle(event) { this.setState({ title: event.target.value }); }
  handleChangeSubTitle(event) { this.setState({ sub_title: event.target.value }); }
  handleChangeAbstract(event) { this.setState({ abstract: event.target.value }); }
  handleChangeContent(event) { this.setState({ content: event.target.value }); }
  handleChangeCategory(event) { this.setState({ category: event.target.value }); }
  handleInputImage(event) {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
    console.log(this.state.editorState.getCurrentContent());
  };

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

  handleSubmit() {
    event.preventDefault()
    const form = document.getElementById('form');
    const data = new FormData(form)
    data.append('file', this.state.selectedFile)
    // console.warn(this.state.selectedFile);
    let url = "https://sort.vps-kinghost.net/api/blog/create";
    const dataUrl = this.state.title.toLowerCase().replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const postDate = new Date();

    axios.post(url, data, {
    })
      .then(res => {
        console.warn(res);
        if (res.data.success === 'true') {
          const totalPost = {
            id: res.data.data,
            status: this.state.status,
            title: this.state.title,
            url: dataUrl,
            sub_title: this.state.sub_title,
            category: this.state.category,
            abstract: this.state.abstract,
            content: stateToHTML(this.state.editorState.getCurrentContent()),
            date: postDate,
            selectedFile: this.state.selectedFile
          }
          axios.put('https://sort.vps-kinghost.net/api/blog/update', totalPost)
            .then(res => {
              alert('Post criado com sucesso!');
              window.location.reload()
            })
        } else {
          alert('O envio do post falhou, tente novamente.');
          window.location.reload();
        }

      })
  }

  render() {
    const { selectedFile, categories, editorState, title, sub_title, abstract, content, date, category, status } = this.state;
    return (
      <div className="create-post">
        <div>

          <form id="form" onSubmit={this.handleSubmit}>
            <div className="step-container">
              <h3>Criar Novo Post</h3>
              <label><span>Categoria</span><select value={category}
                onChange={this.handleChangeCategory}>
                <option value="0">Escolha uma categoria</option>
                {categories.map((categoria, index) => (
                  <option key={index} value={categoria?.name}>{categoria?.name}</option>
                ))}
              </select></label>
              <label><span>Título</span><input type="text" value={title}
                onChange={this.handleChangeTitle} placeholder="Título da Postagem" maxLength="80" required></input></label>
              <label><span>Sub Título</span><input type="text" value={sub_title}
                onChange={this.handleChangeSubTitle} placeholder="Sub-Título da Postagem" maxLength="80" required></input></label>
              <label><span>Imagem Destaque</span><input type="file" className="form-control" name="upload_file" onChange={this.handleInputImage} required></input></label>
              <label><span>Resumo</span><textarea type="text" value={abstract}
                onChange={this.handleChangeAbstract} placeholder="Resumo da Postagem" maxLength="160" required></textarea></label>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
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
            <div className="container-button"><button>Postar</button></div>
          </form>
        </div>
      </div >
    );
  }
}

export { CreatePost };