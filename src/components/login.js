import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LocaleProvider, { LocaleContext } from '../contexts/context';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {
        username: '',
        password: '',
      },
      errors: {
        username: '',
        password: '',
      },
    };

    const { showSearchInput } = this.props;
    showSearchInput(false);
    this.login = this.login.bind(this);
    this.updateInput = this.updateInput.bind(this);

    this.checkAuthed = this.checkAuthed.bind(this);

    this.checkAuthed();
  }


  checkAuthed() {
    const token = localStorage.getItem('token');
    const { authenticate, alert } = this.props;

    if (token && typeof token !== 'undefined') {
      authenticate(true, token);
      alert.show('Auto login', { type: 'success' });
      return true;
    }
  }

  login(e) {
    e.preventDefault();
    const { history, authenticate, alert } = this.props;

    const { details } = this.state;

    axios({
      method: 'post',
      url: 'http://contactsapi.wpedmunds.uk/login',
      data: details,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {
        if (response.data.success) {
          authenticate(true, response.data.token);
          alert.show('Login ok', { type: 'success' });
          history.push('/');
        } else {
          const { errors } = response.data;
          alert.show('Form errors', { type: 'error' });

          this.setState({
            errors,
          });
        }
      });
  }

  updateInput(event) {
    const { name } = event.target;
    const { value } = event.target;

    this.setState(Object.assign(this.state.details, { [name]: value }));
  }

  render() {
    return (

      <div>
        <h1 className="h2">Login</h1>

        <LocaleContext.Consumer>
          {() => <div>&nbsp;</div>}
        </LocaleContext.Consumer>

        <form method="post" onSubmit={this.login}>

          <div className="form-group">
            <input type="text" className="form-control" name="username" aria-describedby="userNameHelp" placeholder="Username" onChange={this.updateInput} />
            <small id="userNameHelp" className="form-text text-muted">{this.state.errors.username}</small>
          </div>

          <div className="form-group">
            <input type="password" className="form-control" name="password" id="password" aria-describedby="passwordHelp" placeholder="Password" onChange={this.updateInput} />
            <small id="passwordHelp" className="form-text text-muted">{this.state.errors.password}</small>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>

          <br />


          <Link to={`/create-account`} className="nav-link">

            <a className="">Create account</a>

          </Link>


        </form>
      </div>
    );
  }
}

Login.propTypes = {
  showSearchInput: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
  authenticate: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
};

export default withRouter(withAlert(Login));
