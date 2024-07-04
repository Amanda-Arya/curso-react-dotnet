import { useEffect, useState } from "react"
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";
import api from "./api/atividade";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [showConfirmModal, setShowConfimrModal] = useState(false);

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    }
    else{
      setAtividade({id: 0});
    }
    setShowConfimrModal(!showConfirmModal);
  }

  const selecionarTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  // antes do axios 
  // useEffect(()=>{
  //   atividades.length <= 0 ? setIndex(1):
  //   setIndex(Math.max.apply(
  //     Math, 
  //     atividades.map((item)=> item.id)
  //   )+1)
  // },[atividades])

  useEffect(() => {
    const getAtividades = async () => {
      const data = await selecionarTodasAtividades();
      setAtividades(data);
    };
    getAtividades();
  }, []);


  const addAtividade = async (ativ) => {
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
    handleAtividadeModal();

  }

  const deleteAtividade = async (id) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {

      const response = atividades.filter(atividade => atividade.id !== id);
      // se o id da atividade filtrada for diferente de id
      setAtividades([...response]);
    }
    console.log("Passei por aqui");
  }
  function editAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();

  }
  function cancelarAtividade() {
    setAtividade({ id: 0 });
    handleAtividadeModal();
  }
  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);

    // passa por todas as atividades e ve qual eu to editando, 
    // só vai substituir a atividade velha pela nova se o id que eu to editando for igual da lista
    setAtividades(atividades.map((item) => (item.id === ativ.id ? response.data : item))
    );
    setAtividade({ id: 0 });
    handleAtividadeModal();
  }

  const novaAtividade = () => {
    setAtividade({ id: 0 });
    handleAtividadeModal();
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-dark">
        <h1 className="m-0 p-0">Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <FontAwesomeIcon icon={faPlus} className='me-2' />
          Atividade
        </Button>
      </div>

      <AtividadeLista

        atividades={atividades}
        // deleteAtividade={deleteAtividade} 
        editAtividade={editAtividade}
        handleConfirmModal={handleConfirmModal}
      />
      <Modal show={showAtividadeModal} onHide={handleAtividadeModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Atividade {atividade.id !== 0 ? atividade.id : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            // para que o AtividadeForm receba a função addAtividade através de props
            addAtividade={addAtividade}
            atualizarAtividade={atualizarAtividade}
            cancelarAtividade={cancelarAtividade}
            atividades={atividades}
            ativSelecionada={atividade}
          />
        </Modal.Body>

      </Modal>
      <Modal size="lg" show={showConfirmModal} onHide={handleConfirmModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Excluindo Atividade  {atividade.id !== 0 ? atividade.id : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja excluir a Atividade {atividade.id}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success me-2" onClick={() => deleteAtividade(atividade.id)}>
            Sim
          </button>
          <button className="btn btn-danger" onClick={() => handleConfirmModal(0)}>
            Não
          </button>
        </Modal.Footer>
      </Modal >
    </>
  );

}

export default App;
