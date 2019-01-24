import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ContactsTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      searchValue: this.props.searchValue,
      token: this.props.token,
    };
    this.setTable = this.setTable.bind(this);

    this.props.showSearchInput(true);
  }

  componentDidMount() {
    this.setTable();
  }

  componentWillReceiveProps(props) {
    if (this.state.searchValue !== props.searchValue) {
      this.setTable(null, props.searchValue);
    }
  }

  setTable(event, searchValue) {
    const { token } = this.state;

    axios({
      method: 'get',
      url: 'http://contactsapi.wpedmunds.uk/contact/getall?token=' + token + '&search=' + (searchValue != '' && searchValue ? searchValue : '')
    })
      .then((response) => {
        this.setState(() => {
          return { contacts: response.data.contacts };
        });
      });
  }

  render() {
    return (
      <div className="col-md-12">

        <h1 className="h2">Contacts</h1>

        <div className="btn-toolbar mb-2 mb-md-0" style={{ float: 'right' }}>
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.setTable}>Refresh List</button>
          </div>
        </div>

        <h2 className="h5">All Contacts</h2>

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
              {this.state.contacts && this.state.contacts.length > 0 ? (

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
                    <td colSpan="6">No contacts</td>
                  </tr>
                )}

            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

ContactsTable.propTypes = {
  searchValue: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default ContactsTable;
