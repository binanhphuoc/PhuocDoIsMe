import React from 'react';
import axios from 'axios';
import base64 from 'base64-arraybuffer';
import './adminLogin.css'

 class getFile extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
          key: '',
          file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, att)
    {
        if (att === 'key')
        {
            this.setState({key: e.target.value});
        }
        
    }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        axios.post('/admin/binpdo/getStory', {key:this.state.key})
        .then((result) =>
        {
            console.log(result);
            this.setState({file: 'data:image/png;base64,'+base64.encode(result.data.data.Body.data)});
        }).catch( (error) => {
            console.log(error.response.data);
        })
    }

    render(){
      return (
          <div className="adminlogin center">
            
            <form>
                <label className="adminlogin linespace">
                    <h4>Key</h4>
                    <input type="text" class="form-control form-control-lg" placeholder="Key"
                    value={this.state.title}
                    onChange={(e) => this.handleChange(e,'key')}/>
                </label>
            </form>
            <input class="adminlogin but btn btn-primary" type="submit" value="Submit" onClick={this.onFormSubmit}/>
            <img src={this.state.file}/>
          </div>
      );
    }
};

export default getFile;