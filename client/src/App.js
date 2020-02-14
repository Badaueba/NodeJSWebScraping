import React, { Component } from 'react';
import './App.css';
import { Container, Header, Divider, Grid, Button, Dimmer, Loader} from 'semantic-ui-react'
import ProjectTab from "./components/Project";

class App extends Component {
	state = { fetching: false, projects: []}

	render () {
		const {color} = this.state;
		console.log(this.state.fetching);
		return (
			<Container>
				<Header size="large">
					Projetos
				</Header>

				<Header sub>
					scrapped from: <a href="http://www.legislador.com.br/LegisladorWEB.ASP?WCI=ProjetoTramite&ID=20" target="_blank">Câmara municipal de chapecó</a>
				</Header>

				<Divider></Divider>

				{ this.state.fetching == true && 
					<Dimmer active={this.state.fetching}>
					 	<Loader />
				   </Dimmer>
				}

				{ this.state.projects.length < 1 && 
					<Button  positive onClick={this.runScraper}>Rodar Scraper</Button>
				}
	
				{ this.state.projects.length > 0 && 
					<Grid>			
						{this.state.projects.map(project =>(
							<Grid.Column  key={Math.random() * 100} mobile={16} tablet={16} computer={8}>
								<ProjectTab project={project}></ProjectTab>
								<Divider></Divider>
								<Button  negative onClick={this.remove.bind(this, project)}>Remover</Button>
								<Divider></Divider>
							</Grid.Column>
						))}
					</Grid>
				}
				
			</Container>
		);
	}

	componentDidMount() {
		this.fetchProjects();
	}

	runScraper = () => {
		this.setState({fetching: true});
		fetch("http://localhost:8000/projects/create", {
			method: "POST"
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			this.fetchProjects();
		})
		.catch(err => {
			console.log(err);
		})
	}

	fetchProjects = () => {
		this.setState({fetching: true});
		fetch("http://localhost:8000/projects")
			.then(res => res.json())
			.then(projects => {
				console.log(projects["data"]);
				this.setState({
					projects : projects["data"],
					fetching: false
				});
				
			})
			.catch(err => {
				console.log(err);
			})
	}

	remove = (project) =>{
		console.log("project", project)
		fetch(`http://localhost:8000/projects/${project._id}`, {
			method: "DELETE"
		})
		.then(res => res.json())
		.then(data => {
			console.log("projects", data);
			this.fetchProjects()
		})
		.catch(err => {
			console.log(err);
		})
	}
}

export default App;
