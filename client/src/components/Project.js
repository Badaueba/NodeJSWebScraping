import React from "react";
import {Tab} from "semantic-ui-react";

const ProjectTab = ({project}) => {
    const panes = [
        {
            menuItem: project.titulo,
            render: () => <Tab.Pane attached={false}>
                <h4><strong>Título:</strong>{project["titulo"]}</h4>
                <p><strong>Data: </strong>{project["data"]}</p>
                <p><strong>Situação: </strong>{project["situacao"]}</p>
                <p><strong>Assunto: </strong>{project["assunto"]}</p>
                <p><strong>Autor: </strong>{project["autor"]}</p>
                <p><strong>Ementa: </strong>{project["ementa"]}</p>
            </Tab.Pane>,
          },
          {
            menuItem: 'Trâmite',
            render: () => <Tab.Pane attached={false}>
                {project["tramite"].map(tramite => (
                    <div>
                        <p><strong>Projeto: </strong>{tramite["projeto"]}</p>
                        <p><strong>entrada: </strong>{tramite["entrada"]}</p>
                        <p><strong>prazo: </strong>{tramite["prazo"]}</p>
                        <p><strong>devolucao: </strong>{tramite["devolucao"]}</p>
                        <br/>
                    </div>
                ))}
            </Tab.Pane>,
          },
    ];
    return (
        <Tab
            menu={{ color: "blue", inverted: true, attached: false, tabular: false }}
            panes={panes}
        />
    )
}

export default ProjectTab;