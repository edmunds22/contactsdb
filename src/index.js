import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import AddContact from './components/addcontact';
import UpdateContact from './components/updatecontact';
import ContactsTable from './components/contactstable';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
	position: 'bottom center',
	timeout: 5000,
	offset: '30px',
	transition: 'scale'
}

class Index extends Component {

	constructor(props) {

		super(props);

		this.state = {
			showSearch: true,
			searchValue: false
		};

		this.showSearchInput = this.showSearchInput.bind(this);
		this.searchContacts = this.searchContacts.bind(this);

	}

	showSearchInput(showstatus) {
		this.setState({ showSearch: showstatus });
	}

	searchContacts(value) {
		this.setState({ searchValue: value });
	}

	render() {


		return (

			<div>
				<Router>
					<div>
						<Navbar showSearch={this.state.showSearch} searchContacts={this.searchContacts} />
						<div className="container-fluid">
							<div className="row">

								<Sidebar />

								<div className="col-md-12">

									<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
										<AlertProvider template={AlertTemplate} {...options}>
											<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
												<Switch>
													<Route path="/" exact={true} render={() => <ContactsTable showSearchInput={this.showSearchInput} searchValue={this.state.searchValue} />} />
													<Route path="/add" exact={true} render={() => <AddContact showSearchInput={this.showSearchInput} />} />
													<Route path="/update/:contactid" exact={true} render={({ match }) => <UpdateContact contactid={match.params.contactid} showSearchInput={this.showSearchInput} />} />
												</Switch>
											</div>
										</AlertProvider>
									</main>

								</div>

							</div>
						</div>
					</div>
				</Router>
			</div>)


	}


}

ReactDOM.render(<Index />, document.getElementById("index"));
