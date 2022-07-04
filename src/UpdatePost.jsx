import React, { useState, useRef, useMemo, Component } from 'react';
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw } from 'draft-js';
import axios from 'axios';
import { Link } from "react-router-dom";

import './CreatePost.css';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';


class UpdatePost extends React.Component {


  constructor() {
    super();
    this.state = {
      posts: [],
      editorState: EditorState.createEmpty(),
      selectedFile: '',
      title: '',
      url: '',
      status: '',
      sub_title: '',
      abstract: '',
      content: '',
      date: '',
      category: ''
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
    this.loadContent();
  }

  loadContent = async () => {
    const id = location.search.replace('?', '');
    // const postsResponse = fetch('https://sort.vps-kinghost.net/api/blog/select/' + id);
    // const [posts] = await Promise.all([postsResponse]);
    // const postsJson = await posts.json();
    axios.post('https://sort.vps-kinghost.net/api/blog/select/' + id)
      .then(res => {
        this.setState({ posts: res.data[0] });
        this.setState({ selectedFile: res.data[0].media });
        this.setState({ category: res.data[0].category });
        this.setState({ title: res.data[0].title });
        this.setState({ url: res.data[0].url });
        this.setState({ sub_title: res.data[0].sub_title });
        this.setState({ abstract: res.data[0].abstract });
        this.setState({ content: stateFromHTML(res.data[0].content) });
        // this.setState({ editorState: res.data[0].content });
        this.setState({ date: res.data[0].date });
        this.setState({ status: res.data[0].status });
      })

  }

  // componentDidUpdate() {
  //   this.setState({ editorState: content });
  // }

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
    let url = "https://sort.vps-kinghost.net/api/blog/update";
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
            content: this.state.content,
            date: postDate,
            selectedFile: this.state.selectedFile
          }
          axios.put('https://sort.vps-kinghost.net/api/blog/update', totalPost)
            .then(res => {
              alert('Post atualizo com sucesso!')
            })
        } else {
          alert('A atualização do post falhou, tente novamente.')
        }
        window.location.reload();
      })
  }

  render() {
    const { selectedFile, editorState, title, sub_title, abstract, content, date, category, status } = this.state;
    return (
      <div className="create-post">
        <div>

          <form id="form" onSubmit={this.handleSubmit}>
            <div className="step-container">
              <h3>Editar Post</h3>
              <label><span>Categoria</span><select value={category}
                onChange={this.handleChangeCategory}>
                <option value="0">Escolha uma categoria</option>
                <option value="Sort na Mídia">Sort na Mídia</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select></label>
              <label><span>Título</span><input type="text" value={title}
                onChange={this.handleChangeTitle} placeholder="Título da Postagem" maxLength="80" required></input></label>
              <label><span>Sub Título</span><input type="text" value={sub_title}
                onChange={this.handleChangeSubTitle} placeholder="Sub-Título da Postagem" maxLength="80" required></input></label>
              <label><span>Imagem Destaque</span>
                <div className="post-image-update" style={{
                  backgroundImage: `url(https://sort.vps-kinghost.net/media/blog/${selectedFile})`
                }}></div>
                <input type="file" className="form-control" name="upload_file" onChange={this.handleInputImage}></input></label>
              <label><span>Resumo</span><textarea type="text" value={abstract}
                onChange={this.handleChangeAbstract} placeholder="Resumo da Postagem" maxLength="160" required></textarea></label>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <div className="container-button"><button>Atualizar</button></div>
          </form>
        </div>
      </div >
    );
  }
}

export { UpdatePost };