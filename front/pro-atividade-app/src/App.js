import { useEffect, useState } from "react"
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";


// let initialState = [
//   {
//     id: 1,
//     prioridade: '1',
//     titulo: 'Atividade 1',
//     descricao: 'primeira Atividade',
    
//   },
//   {
//     id: 2,
//     prioridade: '2',
//     titulo: 'Atividade 2',
//     descricao: 'Segunda Atividade',
    
//   }
// ]
function App() {
  const [index,setIndex] = useState(0);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id:0});

  useEffect(()=>{
    atividades.length <= 0 ? setIndex(1):
    setIndex(Math.max.apply(
      Math, 
      atividades.map((item)=> item.id)
    )+1)
  },[atividades])

  function addAtividade(ativ) {
   
    setAtividades([...atividades,{...ativ, id:index}]);
    // substitui o id após ver as atividades 
  }
    // atividades.push(atividade) igual {...atividade}
  
  // function proximoId(){
  //   if(atividades.length > 0){
  //     return Math.max(...atividades.map(atividade => atividade.id)) + 1
  //   }
  //   return 1
  // }

  function deleteAtividade(id) {
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id);
    // se o id da atividade filtrada for diferente de id
    setAtividades([...atividadesFiltradas]);
  }

  function editAtividade(id){
    const atividade = atividades.filter((atividade)=> atividade.id === id);
    setAtividade(atividade[0]);
  }
  function cancelarAtividade(){
    setAtividade({id: 0});
  }
  function atualizarAtividade(ativ){

    // passa por todas as atividades e ve qual eu to editando, 
    // só vai substituir a atividade velha pela nova se o id que eu to editando for igual da lista
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item));
    setAtividade({id: 0});
  }
  
  return (
    <>
      <AtividadeForm
      // para que o AtividadeForm receba a função addAtividade através de props
      addAtividade={addAtividade}
      atualizarAtividade={atualizarAtividade}
      cancelarAtividade={cancelarAtividade}
      atividades={atividades}
      ativSelecionada = {atividade}
      />
      <AtividadeLista
      
      atividades={atividades}
      deleteAtividade={deleteAtividade}
      editAtividade={editAtividade}
      />
    </>
  );

}

export default App;
