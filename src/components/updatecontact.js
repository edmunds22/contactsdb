import React, { Component } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';
import { withAlert } from 'react-alert'

class UpdateContact extends Component {

  constructor(props) {

    super(props);

    this.state = {
      id: this.props.contactid,
      firstName: '',
      errors: '',
      lastName: '',
      email: '',
      phone: '',
      redirectToReferrer: false,
      submitTxt: 'Submit'

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);


    this.setContact = this.setContact.bind(this);

    this.props.showSearchInput(false);
  }

  setContact(event) {

    axios({
      method: 'get',
      url: 'http://contactsapi.localhost/contact/get/' + this.state.id
    })
      .then((response) => {

        this.setState((prevState, props) => {
          return {
            firstName: response.data.contact.firstName,
            lastName: response.data.contact.lastName,
            phone: response.data.contact.phone,
            email: response.data.contact.email
          };
        })

      })
      .catch(function (response) {
        //handle error
        //console.log(response);
      });

  }

  componentDidMount() {

    this.setContact();

  }

  handleSubmit(e) {

    e.preventDefault();

    const contact = {
      "id": this.state.id,
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
      url: 'http://contactsapi.localhost/contact/update/' + this.state.id,
      data: contact,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then((response) => {

        if (response.data.success) {

          this.props.alert.show('Contact saved', { type: 'success' });

          this.setState({
            redirectToReferrer: true
          });
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
        <h1 className="h2">Update Contact</h1>

        <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <input type="text" className="form-control" value={this.state.firstName} name="firstName" aria-describedby="firstNameHelp" placeholder="First Name" onChange={this.updateInput} />
            <small id="firstNameHelp" className="form-text text-muted">{this.state.errors.firstName}</small>
          </div>

          <div className="form-group">
            <input type="lastName" className="form-control" value={this.state.lastName} name="lastName" id="lastName" aria-describedby="lastNameHelp" placeholder="Last Name" onChange={this.updateInput} />
            <small id="lastNameHelp" className="form-text text-muted">{this.state.errors.lastName}</small>
          </div>

          <div className="form-group">
            <input type="text" className="form-control" value={this.state.phone} id="phone" name="phone" aria-describedby="phoneHelp" placeholder="Phone number" onChange={this.updateInput} />
            <small id="phoneHelp" className="form-text text-muted">{this.state.errors.phone}</small>
          </div>

          <div className="form-group">
            <input type="text" className="form-control" value={this.state.email} id="email" name="email" aria-describedby="emailHelp" placeholder="Email address" onChange={this.updateInput} />
            <small id="emailHelp" className="form-text text-muted">{this.state.errors.email}</small>
          </div>

          <button type="submit" className="btn btn-primary">{this.state.submitTxt}</button>
        </form>



      </div>
    )
  }


}


export default withAlert(UpdateContact);

