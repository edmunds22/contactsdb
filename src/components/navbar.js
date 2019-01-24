import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import PropTypes from 'prop-types';
import LocaleProvider, { LocaleContext } from '../contexts/context';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.signout = this.signout.bind(this);
  }

  updateSearchInput(event) {
    const val = event.target.value;
    const { searchContacts } = this.props;
    searchContacts(val);
  }

  signout() {
    const { authenticate, alert } = this.props;
    authenticate(false);
    alert.show('Logout ok', { type: 'success' });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Contact db.</a>

          {
            this.props.showSearch === true
              ? <input className="form-control form-control-dark search-input" type="text" placeholder="Search" aria-label="Search" onChange={this.updateSearchInput} /> : ''
          }

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">

              <LocaleContext.Consumer>
                {contextvalues => (contextvalues.authenticated == true ?
                  <a className="nav-link" href="#" onClick={this.signout}>Logout</a>
                  :
                  <a className="nav-link" href="#" onClick={
                    (event) => {
                      //multiple function calls in here.
                    }
                  }>Login</a>
                )}
              </LocaleContext.Consumer>

            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  searchContacts: PropTypes.bool.isRequired,
  alert: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
};

export default withAlert(Navbar);
