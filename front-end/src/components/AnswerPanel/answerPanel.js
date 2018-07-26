import React, { Component } from 'react';
import DisplayAnswer from './displayAnswer';
import './answerPanel.css';
import axios from 'axios';

class AnswerPanel extends Component{

  constructor(props) {
      super(props);
      this.state = {
        qid: '',
        question: '',
        answer: '',
        done: false,
        message: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event)
    {
      this.setState({qid: event.target.value});
    }

    handleClick(event)
    {
      event.preventDefault();
      const qid = this.state.qid;
      if (qid === '')
      {
        this.setState({message :'', question:'', answer:'', done:false});
          return;
      }
      axios.post('/questionpd/retrieve', {qid})
      .then((result)=>{
        this.setState({question: result.data.obj.question});
        if (result.data.obj.done)
        {
          this.setState({answer: result.data.obj.answer, message: ''});
      }
        else
        {
          this.setState({ message: 'Chưa rảnh để trả lời. Mai vô check lại đê! ._.', answer: ''});
        }
      })
      .catch((error) => {
          if(error.response.status === 400 && error.response.data.code === 2) {
            this.setState({ message: 'Mày hỏi tao chưa mà đòi tao trả lời ._.', question:'', answer:'' });
          }
          console.log(error.response);
        });
    }

  render() {
    return(
      <div className="div-bg answerpanel">   
        <h1>Hông biết anh Phước iu vấu trả lời chưa nhỉ?</h1>
        <div class="answerPanel spacing form-inline justify-content-center">
          <div style={{width: 50 + "vw"}} class="form-group">
            <input style={{width: 95 + "%"}} type="text" class="form-control form-control-lg" placeholder="Question ID"
            value={this.state.qid}
            onChange={this.handleChange}/>
          </div>

          <input class="btn btn-primary" type="submit" value="Submit" onClick={this.handleClick}/>
        </div>
        <div className="spacing">
          <h4>{this.state.message}</h4>
        </div>
        <DisplayAnswer question={this.state.question} answer={this.state.answer}/>
      </div>
    );
  };
}

export default AnswerPanel;