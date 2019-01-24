import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LocaleProvider, { LocaleContext } from '../contexts/context';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {
        username: '',
        password: '',
      },
      errors: {
        username: [],
        password: '',
      },
    };

    const { showSearchInput } = this.props;
    showSearchInput(false);
    this.goregister = this.goregister.bind(this);
    this.updateInput = this.updateInput.bind(this);

  }

  goregister(e) {
    e.preventDefault();
    const { history, authenticate, alert } = this.props;

    const { details } = this.state;

    axios({
      method: 'post',
      url: 'http://contactsapi.wpedmunds.uk/register',
      data: details,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {
        if (response.data.success) {
          authenticate(true, response.data.token);
          alert.show('Registration ok', { type: 'success' });
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
        <h1 className="h2">Register</h1>

        <LocaleContext.Consumer>
          {() => <div>&nbsp;</div>}
        </LocaleContext.Consumer>

        <form method="post" onSubmit={this.goregister}>

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

          <Link to={'/'} className="nav-link">

            <a className="">Login</a>

          </Link>

        </form>
      </div>
    );
  }
}

Register.propTypes = {
  showSearchInput: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
  authenticate: PropTypes.shape.isRequired,
};

export default withRouter(withAlert(Register));
