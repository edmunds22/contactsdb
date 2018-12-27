import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class Navbar extends Component {

	constructor(props) {

		super(props);
		this.updateSearchInput = this.updateSearchInput.bind(this);

	}

	updateSearchInput(event) {

		var val = event.target.value;

		this.props.searchContacts(val);

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
							<a className="nav-link" href="#">Sign out</a>
						</li>
					</ul>
				</nav>
			</div>
		)
	}


}


export default Navbar;