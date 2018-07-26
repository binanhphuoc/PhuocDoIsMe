import React, { Component } from 'react';
import './askbox.css';
import axios from 'axios';

class Askbox extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            question: '',
            qid: '',
            msg: '',
            showForm: true,
            boxname: 'askbox'
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleChange(event)
    {
      this.setState({question: event.target.value});
    }

    handleClick(event)
    {
        
        event.preventDefault();

        //Transition of qid <div>
        this.setState({boxname: 'askbox-change'});

        this.toggle();
        const question = this.state.question;
        axios.post('/questionpd/ask', {question})
            .then((result)=>{
                this.setState({qid: result.data.qid, msg:result.data.msg});
              })
            .catch((error) =>
            {
                console.log(error);
                this.setState({msg: error.response.data.msg}); 
            });
    }

    toggle()
    {
        var name = '';
        if (!this.state.showForm)
            name = 'askbox';
        else
            name = 'askbox-change'
        this.setState({showForm:!this.state.showForm, boxname: name});
    }
  render() {
    return (
        <div>
        <div className={(this.state.boxname==='askbox')?'askbox-show':'askbox-hidden'}>
            <form className="askbox">
            
            <input className="abc" 
            value={this.state.question}
            onChange={this.handleChange}
             id="input-1" type="text" placeholder="Hỏi đi anh chấp" required autofocus />
            <label for="input-1">
                <span class="label-text">Câu hỏi của bạn</span>
                <span class="nav-dot"></span>
                <div class="signup-but-trigger">Sign Up</div>
            </label>
            
            <button className="askbox" type="submit" onClick={this.handleClick}>Send question</button>
            <p class="tip">Press Tab</p>
            <div class="signup-but">Hỏi đi</div>
        </form>
        </div>

        
        <div className={this.state.boxname}>
            <h3>{this.state.msg}. Your question id is {this.state.qid}</h3>
            <button className="custom-1" type="submit" onClick={this.toggle}>Hỏi thêm câu khác</button>
        </div>
        </div>
    );
  }
}

export default Askbox;
