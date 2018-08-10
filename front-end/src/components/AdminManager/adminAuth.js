import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class adminAuth extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onClick  = this.onClick.bind(this);
    }

  componentDidMount() {

    //Authenticate User, if not login redirect user to login page, if already Login
    //take user to homepage
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/admin/auth', { 'headers': { 'Authorization': localStorage.getItem('jwtToken')} })
      .then(res => {
        //display homepage (App.js)
        // res contains all the information from the back-end
        this.props.history.push("/admin/binpdo/listStory");
      })
      .catch((error) => {
        console.log(error)
        //redirect to login page
      });
  }

  onChange(event, type)
  {
        this.setState({[type]: event.target.value});
  }

  onClick(e)
  {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('/admin/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/admin/binpdo/listStory')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    return (
      <div className="adminauth box">
      <img className="adminauth image" src={require('../Navbar/Picture1.png')}/>
      <form className="adminauth form">
      
          <h3>{this.state.message}</h3>
        <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input 
                type="email" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                value={this.state.username}
                onChange={(e) => {this.onChange(e,'username')}}/>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input 
                type="password" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => {this.onChange(e,'password')}}/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={this.onClick}>Login</button>
      </form>
      </div>
    );
  }
}

export default adminAuth;
