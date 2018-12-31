import React, { Component } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';
import { withAlert } from 'react-alert'
import { withRouter } from 'react-router';

class AddContact extends Component {

  constructor(props) {

    super(props);

    this.state = {
      firstName: '',
      errors: '',
      lastName: '',
      email: '',
      phone: '',
      submitTxt: 'Submit'

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);

    this.props.showSearchInput(false);

  }

  handleSubmit(e) {

    e.preventDefault();

    const contact = {
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "email": this.state.email,
      "phone": this.state.phone
    };

    this.setState({
      firstNameErrors: '',
      lastNameErrors: '',
      emailErrors: '',
      phoneErrors: '',
    }
    );

    var errors = false;

    axios({
      method: 'post',
      url: 'http://contactsapi.localhost/contact/add',
      data: contact,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then((response) => {

        if (response.data.success) {

          this.props.alert.show('Contact saved', { type: 'success' });

          this.props.history.push("/");

        } else {

          errors = response.data.errors;
          this.props.alert.show('Form errors', { type: 'error' });

          this.setState({
            errors: errors
          });

        }

      })
      .catch(function (response) {
        //handle error
        //console.log(response);
      });

  }

  updateInput(event) {

    var name = event.target.name;
    var val = event.target.value;

    this.setState(function (state, props) {
      return {
        [name]: val
      }
    });

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
    )
  }


}

export default withRouter(withAlert(AddContact));

