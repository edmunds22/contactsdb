import React, { Component, createContext } from 'react';
import ReactDOM from "react-dom";
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import AddContact from './components/addcontact';
import UpdateContact from './components/updatecontact';
import ContactsTable from './components/contactstable';
import Login from './components/login';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import LocaleProvider from './contexts/context';

const options = {
	position: 'bottom center',
	timeout: 5000,
	offset: '30px',
	transition: 'scale'
}

class Index extends Component {

	constructor(props) {

		super(props);

		this.showSearchInput = this.showSearchInput.bind(this);
		this.searchContacts = this.searchContacts.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authed = this.checkAuthed.bind(this);

		this.state = {
			showSearch: true,
			searchValue: false,
			user: {
				authenticated: this.checkAuthed(),
				username: 'tester'
			}
		};

		const UserContext = React.createContext({ authed: this.state.user.authenticated });
		const UserProvider = UserContext.Provider;
		const UserConsumer = UserContext.Consumer;

	}

	showSearchInput(showstatus) {
		this.setState({ showSearch: showstatus });
	}
	searchContacts(value) {
		this.setState({ searchValue: value });
	}
	authenticate(status) {
		this.setState({ user: { authenticated: (status === true ? true : false), username: 'testt' } });
	}
	checkAuthed() {
		return false;
	}

	render() {
		 

		return (

			<div>
				<Router>
					<AlertProvider template={AlertTemplate} {...options}>
						<LocaleProvider authed={this.state.user.authenticated}>
							<div>
								<Navbar showSearch={this.state.showSearch} searchContacts={this.searchContacts} authenticate={this.authenticate} />
								<div className="container-fluid">
									<div className="row">

												{this.state.user.authenticated ? (

													<Sidebar />

												) : (
													<div> </div>
												)}

										<div className="col-md-12">


											<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">

												{this.state.user.authenticated ? (

													<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
														<Switch>
															<Route path="/" exact={true} render={() => <ContactsTable showSearchInput={this.showSearchInput} searchValue={this.state.searchValue} />} />
															<Route path="/add" exact={true} render={() => <AddContact showSearchInput={this.showSearchInput} />} />
															<Route path="/update/:contactid" exact={true} render={({ match }) => <UpdateContact contactid={match.params.contactid} showSearchInput={this.showSearchInput} />} />
														</Switch>
													</div>

												) : (

														<Login showSearchInput={this.showSearchInput} authenticate={this.authenticate} searchValue='' />

												)}

											</main>

										</div>

									</div>
								</div>
							</div>
						</LocaleProvider>
					</AlertProvider>
				</Router>
			</div>)


	}


}

ReactDOM.render(<Index />, document.getElementById("index"));
