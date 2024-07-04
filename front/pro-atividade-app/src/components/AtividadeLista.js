import React from 'react';
import Atividade from './Atividade';

export default function AtividadeLista(props) {
  return (
    <div className="container mt-3 ">
      {props.atividades.map(ativ => (

        <Atividade
          key={ativ.id}
          ativ={ativ}
          deleteAtividade={props.deleteAtividade}
          editAtividade={props.editAtividade}
          handleConfirmModal={props.handleConfirmModal}
        />
      ))}
    </div>
  )
}
