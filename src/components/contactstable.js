import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ContactsTable extends Component {

  constructor(props) {

    super(props);

    this.state = {
      contacts: [],
      searchValue: this.props.searchValue,
      token: this.props.token,
    }

    this.setTable = this.setTable.bind(this);
    this.props.showSearchInput(true);


  }

  setTable(event, searchValue) {

    var contacts = [];
    let token = this.state.token;

    axios({
      method: 'get',
      url: 'http://contactsapi.localhost/contact/getall?token=' + token + '&search=' + (searchValue != '' && searchValue ? searchValue : '')
    })
      .then((response) => {

        this.setState((prevState, props) => {
          return { contacts: response.data.contacts };
        })

      })
      .catch(function (response) {
        //handle error
        //console.log(response);
      });

  }

  componentDidMount() {
    this.setTable();
  }

  componentWillReceiveProps(props) {
    if (this.state.searchValue !== props.searchValue) {
      this.setTable(null, props.searchValue);
    }
  }

  render() {

    return (
      <div className="col-md-12">

        <h1 className="h2">Contacts</h1>

        <div className="btn-toolbar mb-2 mb-md-0" style={{ float: 'right' }}>
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.setTable}>Refresh List</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
        </div>

        <h2 className="h5">All Contact</h2>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts ? (

                this.state.contacts.map((contact, i) => {
                  return (
                    <tr key={i}>
                      <td>{contact.id}</td>
                      <td>{contact.firstName}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>

                        <Link to={`/update/${contact.id}`} className="nav-link active">

                          <button type="button" className="btn btn-secondary btn-sm">Edit</button>

                        </Link>

                      </td>
                    </tr>
                  );
                })
              ) : (
                  <tr>
                    <td colSpan="5">loading</td>
                  </tr>
                )}

            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default ContactsTable;
