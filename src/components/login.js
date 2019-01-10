import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withAlert } from 'react-alert'
import { withRouter } from 'react-router';
import LocaleProvider, { LocaleContext } from '../contexts/context';

class Login extends Component {

  constructor(props) {

    super(props);

    this.state = {
      errors: {
        userName: '',
        password: ''
      }
    }

    this.props.showSearchInput(false);
    this.login = this.login.bind(this);

  }


  login(e) {
    e.preventDefault();
    this.props.authenticate(true);
    this.props.alert.show('Login ok', { type: 'success' });
  }

  render() {

    return (

      <div>
        <h1 className="h2">Login</h1>

        <LocaleContext.Consumer>
          {context => <div></div>}
        </LocaleContext.Consumer>

        <form method="post" onSubmit={this.login}>

          <div className="form-group">
            <input type="text" className="form-control" name="userName" aria-describedby="userNameHelp" placeholder="First Name" onChange={this.updateInput} />
            <small id="userNameHelp" className="form-text text-muted">{this.state.errors.userName}</small>
          </div>

          <div className="form-group">
            <input type="password" className="form-control" name="password" id="password" aria-describedby="passwordHelp" placeholder="Password" onChange={this.updateInput} />
            <small id="passwordHelp" className="form-text text-muted">{this.state.errors.password}</small>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>



      </div>
    )
  }

}

export default withRouter(withAlert(Login));