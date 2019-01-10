import React, { Component } from 'react';
import axios from 'axios';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class AddContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      errors: '',
      submitTxt: 'Submit',
      token: this.props.token
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    const { showSearchInput } = this.props;
    showSearchInput(false);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { contact } = this.state;

    axios({
      method: 'post',
      url: 'http://contactsapi.localhost/contact/add?token=' + this.state.token,
      data: contact,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {

        const { history, alert } = this.props;

        if (response.data.success) {
          history.push('/');
          alert.show('Contact saved', { type: 'success' });
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

    this.setState(Object.assign(this.state.contact, { [name]: value }));
  }

  render() {
    return (

      <div>
        <h1 className="h2">Add Contact</h1>

        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <input type="text" className="form-control" name="firstName" aria-describedby="firstNameHelp" placeholder="First Name" onChange={this.updateInput} />
            <small id="firstNameHelp" className="form-text text-muted">{this.state.errors.firstName}</small>
          </div>

          <div className="form-group">
            <input type="lastName" className="form-control" name="lastName" id="lastName" aria-describedby="lastNameHelp" placeholder="Last Name" onChange={this.updateInput} />
            <small id="lastNameHelp" className="form-text text-muted">{this.state.errors.lastName}</small>
          </div>

          <div className="form-group">
            <input type="text" className="form-control" id="phone" name="phone" aria-describedby="phoneHelp" placeholder="Phone number" onChange={this.updateInput} />
            <small id="phoneHelp" className="form-text text-muted">{this.state.errors.phone}</small>
          </div>

          <div className="form-group">
            <input type="text" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Email address" onChange={this.updateInput} />
            <small id="emailHelp" className="form-text text-muted">{this.state.errors.email}</small>
          </div>

          <button type="submit" className="btn btn-primary">{this.state.submitTxt}</button>
        </form>
      </div>
    );
  }
}

AddContact.propTypes = {
  showSearchInput: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default withRouter(withAlert(AddContact));
