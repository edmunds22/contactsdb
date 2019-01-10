import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router';
import LocaleProvider, { LocaleContext } from '../contexts/context';

class Navbar extends Component {

	constructor(props) {

		super(props);
		this.updateSearchInput = this.updateSearchInput.bind(this);
		this.signout = this.signout.bind(this);

	}

	updateSearchInput(event) {

		var val = event.target.value;

		this.props.searchContacts(val);

	}

	signout() {
		this.props.authenticate(false);
		this.props.alert.show('Logout ok', { type: 'success' });
	}

	render() {

		return (
			<div>
				<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
					<a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Contact db.</a>

					{
						this.props.showSearch === true ?
							<input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" onChange={this.updateSearchInput} /> : ''
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
		)
	}


}


export default withAlert(Navbar);