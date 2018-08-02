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
            id: '',
            file: {value: '', changed: false},
            title: {value: '', changed: false},
            subtitle: {value: '', changed: false},
            body: {value: '', changed: false},
            selected: {value: false, changed: false},
            msg: {value: '', changed: false},
            changed: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onDrop = this.onDrop.bind(this)
        //this.fileUpload = this.fileUpload.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.showResponse = this.showResponse.bind(this);
    }

    handleChange(e, att)
    {
        console.log(typeof(e.target.checked));
        this.setState({changed : true});
        if (att === 'selected')
            return this.setState({[att]: {value: e.target.checked, changed: true}});
        this.setState({[att]: {value: e.target.value, changed: true}});
    }

    onDrop(files) {
        this.setState({changed : true});
        this.setState({file: {value: files[0], changed: true}});
        console.log(files[0]);
        this.setState({fileName: {value: files[0].name, changed: true}});
    }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        var data = {};
        for (var key in this.state)
        {
            if (!this.state.hasOwnProperty(key) || key === 'hidden' || key === 'changed') 
                continue;
            if (key === 'id')
            {
                if (this.state[key] !== '')
                    data.id = this.state.id;
            }
            else if (this.state[key].changed)
            {
                data[key] = this.state[key].value;
            }
        }
        console.log(data);
        this.props.onSaveClick(data, this.showResponse)
    }

    onDeleteClick() {
        this.props.onDeleteClick(this.showResponse);
    }

    showResponse(err, res) {
        if (err)
            {
                console.log(err);
                this.setState({msg: err});
            }
            else
                this.setState({msg: res.msg});
    }

    static getDerivedStateFromProps(props, state)
    {
        if (state.hidden === true && props.hidden === false)
        {
            console.log(props.onShowData);
            document.getElementById("editStory-save").disabled = true;
            if (props.onShowData === undefined)
            {
                
                return {
                    hidden:props.hidden,
                    fileName: {value: 'Try dropping a file here, or click to select a file to upload.', changed: false},
                    id: '',
                    file: {value: '', changed: false},
                    title: {value: '', changed: false},
                    subtitle: {value: '', changed: true},
                    body: {value: '', changed: true},
                    selected: {value: false, changed: true},
                    changed: false  
                }
            }

            return {
                hidden: props.hidden,
                id: props.onShowData.id,
                file: {value: props.onShowData.file, changed: false},
                fileName: {value: props.onShowData.fileName, changed: false},
                title: {value:props.onShowData.title, changed:false},
                subtitle: {value:props.onShowData.subtitle, changed: false},
                body: {value: props.onShowData.body,changed: false},
                selected: {value:props.onShowData.selected, changed: false},
                changed: false
            }
        }
        return {
            hidden:props.hidden
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {  
        if (nextState.id !== '' && nextState.changed)
            document.getElementById("editStory-save").disabled = false;
        else if (nextState.id === '' && nextState.title.changed && nextState.file.changed)
            document.getElementById("editStory-save").disabled = false;
        console.log(nextState.id + ' ' + nextState.title.changed + ' ' + nextState.file.changed); 
        if (nextProps.hidden==true && this.props.hidden == true)
            return false;
        return true;
    }

    render(){
        console.log(this.state);
      return (
          <div className={this.state.hidden?"adminlogin hide": "adminlogin center"}>
            <Dropzone onDrop={this.onDrop} multiple={false}>
              {
                  ()=>{
                      if (this.state.file.value === '')
                        return <div>{this.state.fileName.value}</div>;
                      else
                        return <img style={{height:195+"px",width:195+"px"}} 
                        src={this.state.file.value.preview?this.state.file.value.preview:this.state.file.value}/>;
                    }
              }
            </Dropzone>
            <form>
                <label className="adminlogin linespace">
                    <h4>Title</h4>
                    <input type="text" className="form-control form-control-lg" placeholder="Title"
                    value={this.state.title.value}
                    onChange={(e) => this.handleChange(e,'title')}/>
                </label>
                <label className="adminlogin linespace">
                    <h4>Subtitle</h4>
                    <input type="text" className="form-control form-control-lg" placeholder="Subtitle"
                    value={this.state.subtitle.value}
                    onChange={(e) => this.handleChange(e,'subtitle')}/>
                </label>
                <label className="adminlogin spacing">
                    <h4>Body</h4>
                    <textarea className="adminlogin body form-control form-control-lg" placeholder="Body"
                    value={this.state.body.value}
                    onChange={(e) => this.handleChange(e,'body')}/>
                </label>
                <label> 
                    <input type="checkbox"
                    checked={this.state.selected.value}
                    onChange={(e) => this.handleChange(e,'selected')}/>
                    <h4 style={{display:"inline-block", marginLeft: 10+"px", marginBottom: 0}}>Selected</h4>
                </label>
            </form>
            <div>
                <input id="editStory-save" className="adminlogin but btn btn-primary left-align" type="submit" value="SAVE" onClick={this.onFormSubmit}/>
                <input className="adminlogin but btn center-align" type="submit" value="Cancel" onClick={this.props.onCancelClick}/>
                <input className="adminlogin but btn btn-danger right-align" type="submit" value="Delete" onClick={this.onDeleteClick}/>
            </div>
          </div>
      );
    }
};

export default editStory;