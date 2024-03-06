import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Atividade(props) {
    function prioridadeLabel(param, color){

        switch(param){
          case '1': 
            return   " Baixa 😄";
          case '2':
            return  " Média 😐";	
          case '3':
            return  " Alta 😦";
          default:
            return "Não informado";
        }
      }
      function corBorda(param){
        switch(param){
          case '1': 
            return   "primary ";
          case '2':
            return  "warning";	
          case '3':
            return  "danger";
          default:
            return "secondary";
        }
      }

    return (
        <div className="card mb-2 shadow-sm" >
            <Card className="card-body " border={corBorda(props.ativ.prioridade)}>
              <Card.Body className="d-flex justify-content-between">
                <Card.Title className="card-title">
                  <span className="badge text-bg-info">
                    {props.ativ.id}
                  </span>
                  - {props.ativ.titulo}
                </Card.Title>
                <h6>
                  Prioridade:
                  <span className="text-black"> 
                    {prioridadeLabel(props.ativ.prioridade)}
                  </span>
                  
                </h6>
              </Card.Body>
              <p
                className="card-text">{props.ativ.descricao}
              </p>
              <div className="d-flex justify-content-end pt-2 m-0 border-top">

                <button className="btn btn-outline-primary me-2 btm-sm" onClick={()=>props.editAtividade(props.ativ.id)}> <FontAwesomeIcon className="me-2" icon={faPen} />Editar</button>
                <button className="btn btn-outline-danger" onClick={()=>props.deleteAtividade(props.ativ.id)}><FontAwesomeIcon className="me-2" icon={faTrash}  />Excluir</button>
              </div>

            </Card>
          </div>
    )
}