import React, { Component } from 'react';
import './App.css';
import { Divider, Tab } from 'semantic-ui-react'
const panes = [
	{
	  menuItem: 'Tab 1',
	  render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
	},
	{
	  menuItem: 'Tab 2',
	  render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
	},
	{
	  menuItem: 'Tab 3',
	  render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
	},
]

class App extends Component {
	state = { color: "blue" }

	render () {
		const {color} = this.state;
		return (
			<Tab
				menu={{ color, inverted: true, attached: false, tabular: false }}
				panes={panes}
		  	/>
		);
	}

	componentDidMount() {
		fetch("http://localhost:8000/projects")
			.then(res => res.json())
			.then(projects => {
				console.log(projects["data"]);
			})
			.catch(err => {
				console.log(err);
			})
	}
}

export default App;
