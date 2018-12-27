import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddContact from './addcontact';
import ContactsTable from './contactstable';

class Sidebar extends Component {

	constructor(props) {

		super(props);

	}

	render() {

		return (
			<div>

				<nav className="col-md-2 d-none d-md-block bg-light sidebar">
					<div className="sidebar-sticky">
						<ul className="nav flex-column">

							<li className="nav-item">
								<Link to={'/'} className="nav-link active">

									<span data-feather="home"></span>
									Contacts <span className="sr-only">(current)</span>

								</Link>

								<Link to={'/add'} className="nav-link active">

									<span data-feather="home"></span>
									Add Contact <span className="sr-only">(current)</span>

								</Link>

							</li>

						</ul>

					</div>
				</nav>
			</div>
		)
	}

}

export default Sidebar;