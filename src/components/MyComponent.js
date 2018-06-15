import React, { Component } from 'react';
import {postData, getData} from './RequestLib';

const sourceURL = "https://source.com/";
const placeHolders = ["a", "b", "c"];
const postFixTable = {
	a: "a",
	b: "b",
	c: "c"
};

class MyComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// Define some states here
			data: ["a", "b", "c"],
			queries: [] // props.queries
		};

		// bind some methods here
		this.fetchDataByKey = this.fetchDataByKey.bind(this);
	}

	componentDidMount() {
		// Do the data loading or subscription here
		this.fetchData();
	}

	componentDidCatch(error, errorInfo) {
		// Handle some error, maybe show in UI
	}

	fetchData() {
		// Fetch data and re-render the UI
		this.state.queries.map(this.fetchDataByKey);
	}

	fetchDataByKey(key) {
		var url = sourceURL + postFixTable[key];

		const onError = (error, msg) => {
			console.log(error + msg);
			// UI change maybe
		};

		const onSuccess = (data) => {
			// Maybe some data processing?
			this.setState({data: data});
		};

		getData(url, "", onSuccess, onError);
	}

	renderEntry(entry) {
		return (
			<div className="tile is-child box">
				<p class="title has-text-dark">{entry}</p>
			</div>
			);
	}

	render() {
		return (
			<div>
				<section className="hero is-primary is-fullheight">
					<div className="hero-head">
						<p className="is-size-2"><strong>My App</strong></p>
					</div>
					<div className="hero-body">
						<div className="tile is-ancestor">
							<div className="tile is-12 is-vertical is-parent">
							{this.state.data.map(this.renderEntry)}
							</div>
						</div>
					</div>
				</section>
			</div>
			);
	}
}

export default MyComponent;