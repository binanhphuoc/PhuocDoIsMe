import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios'
import './adminLogin.css'

 class FileUpload extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
          text: 'Try dropping a file here, or click to select a file to upload.',
            image:null,
            title: '',
            subtitle: '',
            body: ''
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, att)
    {
        if (att === 'title')
        {
            this.setState({title: e.target.value});
        }
        if (att === 'subtitle')
        {
            this.setState({subtitle: e.target.value});
        }
        if (att === 'body')
        {
            this.setState({body: e.target.value});
        }
    }

    onDrop(files) {
      this.setState({image: files[0], text:files[0].name});
    }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload().then((response)=>{
            console.log(response);
            }
        ).catch( (error) => {
            console.log(error.response.data);
        })
    }

    fileUpload(){
        const url = '/admin/binpdo/uploadStory';
        const formData = new FormData();
        formData.append('intro-image',this.state.image);
        formData.append('title', this.state.title);
        formData.append('subtitle', this.state.subtitle);
        formData.append('body', this.state.body);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData,config);
    }

    render(){
      return (
          <div className="adminlogin center">
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div>{this.state.text}</div>
            </Dropzone>
            <form>
                <label className="adminlogin linespace">
                    <h4>Title</h4>
                    <input type="text" class="form-control form-control-lg" placeholder="Title"
                    value={this.state.title}
                    onChange={(e) => this.handleChange(e,'title')}/>
                </label>
                <label className="adminlogin linespace">
                    <h4>Subtitle</h4>
                    <input type="text" class="form-control form-control-lg" placeholder="Subtitle"
                    value={this.state.subtitle}
                    onChange={(e) => this.handleChange(e,'subtitle')}/>
                </label>
                <label className="adminlogin spacing">
                    <h4>Body</h4>
                    <textarea className="adminlogin body form-control form-control-lg" placeholder="Body"
                    value={this.state.body}
                    onChange={(e) => this.handleChange(e,'body')}/>
                </label>
            </form>
            <input class="adminlogin but btn btn-primary" type="submit" value="Submit" onClick={this.onFormSubmit}/>
          </div>
      );
    }
};

export default FileUpload;