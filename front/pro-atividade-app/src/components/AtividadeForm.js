import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ativInicial = {
  id: 0,
  prioridade: '0',
  titulo: '',
  descricao: ''
}
export default function AtividadeForm(props) {

  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.ativSelecionada.id !== 0) {
      setAtividade(props.ativSelecionada);
      
    }
  }, [props.ativSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setAtividade({ ...atividade, [name]: value });
  }
  function atividadeAtual() {
    if (props.ativSelecionada.id !== 0) {
      return props.ativSelecionada;
    }
    else {
      return ativInicial;
    }
  }

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade();
    setAtividade(ativInicial);

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(props.ativSelecionada.id !== 0)
    {
      props.atualizarAtividade(atividade);
    }
    else{
      props.addAtividade(atividade);
    }
    setAtividade(ativInicial);
  }

  return (
    <>
      <h1>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
      <form className="container row g-3" onSubmit={handleSubmit}>

        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            className="form-control"
            onChange={inputTextHandler}
            value={atividade.titulo}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            name='prioridade'
            className="form-select"
            onChange={inputTextHandler}
            value={atividade.prioridade}
          >
            <option value="0">Selecione...</option>
            <option value="1">Baixa</option>
            <option value="2">Média</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">descrição</label>
          <textarea
            id="descricao"
            name='descricao'
            type="text"
            className="form-control"
            onChange={inputTextHandler}
            value={atividade.descricao}
          />
        </div>
        <hr />
        <div className="col-12 mt-0">
          {atividade.id === 0 ? (

            <button className="btn btn-outline-secondary"
              type='submit'>
                <FontAwesomeIcon icon={faPlus} className='me-2' />
              Atividade

            </button>
          ) : (
            <>
              <button
                className="btn btn-outline-success "
                type="submit"
              >
                Atualizar
              </button>
              <button
                className="btn btn-outline-danger ms-2"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  )
}
