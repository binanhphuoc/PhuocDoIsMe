import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Intropanel from './components/IntroPanel/intropanel';
import AskPanel from './components/AskPanel/askPanel';
import AnswerPanel from './components/AnswerPanel/answerPanel';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminLogin from './components/AdminManager/adminLogin';
import GetStory from './components/AdminManager/getStory';
import ListStory from './components/AdminManager/storyList';

class App extends Component {
  render() {
    return (
      <div>
      <Navbar/>
      <Router>
    <div>
     
      <Route exact path='/' component={Intropanel} />
      <Route exact path='/questionpd/retrieve' component={AnswerPanel} />
      <Route exact path='/questionpd/ask' component={AskPanel} />
      <Route exact path='/admin/binpdo' component={AdminLogin} />
      <Route exact path='/admin/binpdo/getstory' component={GetStory} />
      <Route exact path='/admin/binpdo/liststory' component={ListStory} />
      {/*
      <Route path='/register' component={Register} />
      <Route path='/reset-password' component={ResetPassword} />
      <Route path='/api/auth/reset/:token' component={UpdatePassword} />*/}
    </div>
  </Router>
  </div>
      
    );
  }
}

export default App;
