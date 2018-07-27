import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios'
import './adminLogin.css'

 class editStory extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            hidden:true,
            fileName: 'Try dropping a file here, or click to select a file to upload.',
            id:null,
            file:null,
            title: '',
            subtitle: '',
            body: '',
            selected: '',
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
        if (att === 'selected')
        {  
            this.setState({selected: e.target.value});
        }
    }

    onDrop(files) {
      this.setState({file: files[0]});
      console.log(files[0]);
      this.setState({fileName: files[0].name});
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
        const url = '/admin/binpdo/saveStory';
        const formData = new FormData();
        if (this.state.id)
            formData.append('id', this.state.id);
        if (this.state.image)
            formData.append('intro-image',this.state.file);
        if (this.state.title)
            formData.append('title', this.state.title);
        if (this.state.subtitle)
            formData.append('subtitle', this.state.subtitle);
        if (this.state.body)
            formData.append('body', this.state.body);
        if (this.state.selected)
            formData.append('selected', this.state.selected);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post(url, formData,config);
    }

    /*
    getSnapshotBeforeUpdate(prevProps)
    {
        if (prevProps.hidden)
            this.state.prevHidden = prevProps.hidden;
        return null;
    }
    */

    static getDerivedStateFromProps(props, state)
    {
        if (state.hidden === true && props.hidden === false)
        {
            console.log(props.onShowData);
            return {
                hidden:props.hidden,
                id: props.onShowData.id,
                file: props.onShowData.file,
                fileName: props.onShowData.fileName,
                title: props.onShowData.title,
                subtitle: props.onShowData.subtitle,
                body: props.onShowData.body,
                selected: props.onShowData.selected
            }
        }
        return {
            hidden:props.hidden
        }
    }

    shouldComponentUpdate(nextProps)
    {
        if (nextProps.hidden==true && this.props.hidden == true)
            return false;
        return true;
    }

    render(){
      return (
          <div className={this.state.hidden?"adminlogin hide": "adminlogin center"}>
            <Dropzone onDrop={this.onDrop} multiple={false}>
              {
                  ()=>{
                      if (this.state.file === null)
                        return <div>{this.state.fileName}</div>;
                    else
                        return <img style={{height:195+"px",width:195+"px"}} 
                        src={this.state.file.preview?this.state.file.preview:this.state.file}/>;
                    }
              }
            </Dropzone>
            <form>
                <label className="adminlogin linespace">
                    <h4>Title</h4>
                    <input type="text" className="form-control form-control-lg" placeholder="Title"
                    value={this.state.title}
                    onChange={(e) => this.handleChange(e,'title')}/>
                </label>
                <label className="adminlogin linespace">
                    <h4>Subtitle</h4>
                    <input type="text" className="form-control form-control-lg" placeholder="Subtitle"
                    value={this.state.subtitle}
                    onChange={(e) => this.handleChange(e,'subtitle')}/>
                </label>
                <label className="adminlogin spacing">
                    <h4>Body</h4>
                    <textarea className="adminlogin body form-control form-control-lg" placeholder="Body"
                    value={this.state.body}
                    onChange={(e) => this.handleChange(e,'body')}/>
                </label>
                <label> 
                    <input type="checkbox"
                    value={this.state.selected}
                    onChange={(e) => this.handleChange(e,'selected')}/>
                    <h4 style={{display:"inline-block", marginLeft: 10+"px", marginBottom: 0}}>Selected</h4>
                </label>
            </form>
            <div>
                <input className="adminlogin but btn btn-primary left-align" type="submit" value="SAVE" onClick={this.onFormSubmit}/>
                <input className="adminlogin but btn btn-danger right-align" type="submit" value="Cancel" onClick={this.props.onCancelClick}/>
            </div>
          </div>
      );
    }
};

export default editStory;