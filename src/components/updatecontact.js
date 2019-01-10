import React, { Component } from 'react';
import axios from 'axios';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class UpdateContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.contactid,
      contact: {
        firstName: '',
        errors: '',
        lastName: '',
        email: '',
        phone: '',
      },
      errors: {},
      submitTxt: 'Submit',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);


    this.setContact = this.setContact.bind(this);

    const { showSearchInput } = this.props;
    showSearchInput(false);
  }

  componentDidMount() {
    this.setContact();
  }

  setContact() {
    axios({
      method: 'get',
      url: `http://contactsapi.localhost/contact/get/${this.state.id}`,
    })
      .then((response) => {
        this.setState((prevState, props) => {
          return {
            contact: {
              firstName: response.data.contact.firstName,
              lastName: response.data.contact.lastName,
              phone: response.data.contact.phone,
              email: response.data.contact.email,
            },
          };
        });
      });
  }


  handleSubmit(e) {
    e.preventDefault();

    const { id } = this.state;

    const { contact } = this.state;

    let errors = false;

    axios({
      method: 'post',
      url: `http://contactsapi.localhost/contact/update/${id}`,
      data: contact,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    })
      .then((response) => {
        const { history, alert } = this.props;

        if (response.data.success) {
          alert.show('Contact saved', { type: 'success' });

          history.push('/');
        } else {
          errors = response.data;
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
        <h1 className="h2">Update Contact</h1>

        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <input type="text" className="form-control" value={this.state.contact.firstName} name="firstName" aria-describedby="firstNameHelp" placeholder="First Name" onChange={this.updateInput} />
            <small id="firstNameHelp" className="form-text text-muted">{this.state.errors.firstName}</small>
          </div>

          <div className="form-group">
            <input type="lastName" className="form-control" value={this.state.contact.lastName} name="lastName" id="lastName" aria-describedby="lastNameHelp" placeholder="Last Name" onChange={this.updateInput} />
            <small id="lastNameHelp" className="form-text text-muted">{this.state.errors.lastName}</small>
          </div>

          <div className="form-group">
            <input type="text" className="form-control" value={this.state.contact.phone} id="phone" name="phone" aria-describedby="phoneHelp" placeholder="Phone number" onChange={this.updateInput} />
            <small id="phoneHelp" className="form-text text-muted">{this.state.errors.phone}</small>
          </div>

          <div className="form-group">
            <input type="text" className="form-control" value={this.state.contact.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Email address" onChange={this.updateInput} />
            <small id="emailHelp" className="form-text text-muted">{this.state.errors.email}</small>
          </div>

          <button type="submit" className="btn btn-primary">{this.state.submitTxt}</button>
        </form>
      </div>
    );
  }
}

UpdateContact.propTypes = {
  showSearchInput: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};


export default withRouter(withAlert(UpdateContact));
