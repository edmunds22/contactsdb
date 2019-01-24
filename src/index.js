import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import { withRouter } from 'react-router';
import AlertTemplate from 'react-alert-template-basic';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import AddContact from './components/addcontact';
import UpdateContact from './components/updatecontact';
import ContactsTable from './components/contactstable';
import Login from './components/login';
import Register from './components/register';
import LocaleProvider from './contexts/context';

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale',
};

class Index extends Component {
  constructor(props) {
    super(props);

    this.showSearchInput = this.showSearchInput.bind(this);
    this.searchContacts = this.searchContacts.bind(this);
    this.authenticate = this.authenticate.bind(this);

    this.state = {
      showSearch: true,
      searchValue: false,
      user: {
        authenticated: false,
        username: 'tester',
        token: null,
      },
    };

  }

  showSearchInput(showstatus) {
    this.setState({ showSearch: showstatus });
  }

  searchContacts(value) {
    this.setState({ searchValue: value });
  }

  authenticate(status, token) {
    const storagetoken = localStorage.getItem('token');

    if (token !== storagetoken) {
      localStorage.setItem('token', JSON.stringify(token));
    }

    if (status == false) {
      localStorage.removeItem('token');
      this.setState({
        user: { authenticated: (status === true), username: 'testt', 'token': false },
      });
      return true;
    }

    this.setState({
      user: { authenticated: (status === true), username: 'testt', token },
    });
  }

  render() {
    return (
      <div>
        <Router>
          <AlertProvider template={AlertTemplate} {...options}>
            <LocaleProvider authed={this.state.user.authenticated}>
              <div>
                <Navbar
                  showSearch={this.state.showSearch}
                  searchContacts={this.searchContacts}
                  authenticate={this.authenticate}
                />
                <div className="container-fluid">
                  <div className="row">

                    <nav className="col-sm-2 col-md-2 d-md-block bg-light sidebar">

                      {this.state.user.authenticated ? (

                        <Sidebar />

                      )
                        :
                        (
                          <div />
                        )
                      }

                    </nav>

                    <main role="main" className="col-sm-10 col-md-9 ml-sm-auto col-lg-10 px-4">
                      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

                        {this.state.user.authenticated ? (

                          <Switch>
                            <Route path="/" exact={true} render={() => <ContactsTable showSearchInput={this.showSearchInput} searchValue={this.state.searchValue} token={this.state.user.token} />} />
                            <Route path="/add" exact={true} render={() => <AddContact showSearchInput={this.showSearchInput} token={this.state.user.token} />} />
                            <Route path="/update/:contactid" exact={true} render={({ match }) => <UpdateContact contactid={match.params.contactid} showSearchInput={this.showSearchInput} token={this.state.user.token} />} />
                          </Switch>


                        )
                          :
                          (
                            <Switch>
                              <Route path="/create-account" exact={true} render={() => <Register showSearchInput={this.showSearchInput} authenticate={this.authenticate} searchValue={null} />} />
                              <Route path="/" exact={true} render={() => <Login showSearchInput={this.showSearchInput} authenticate={this.authenticate} searchValue={null} />} />
                            </Switch>

                          )
                        }
                      </div>
                    </main>


                  </div>
                </div>
              </div>
            </LocaleProvider>
          </AlertProvider>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('index'));
