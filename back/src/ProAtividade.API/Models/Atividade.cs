using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace ProAtividade.API.Models
{
    public class Atividade
    {
        public int Id {get;set;}
        public string Titulo {get;set;}
        public string Descricao {get;set;}
        public Prioridade Prioridade {get;set;}
        public Atividade()
        {
            Id = 0;
            Titulo = string.Empty;
            Descricao = string.Empty;
            Prioridade = Prioridade.NaoDefinido;
            
        }
        public Atividade(int id)
        {
            Id = id;
            Titulo = string.Empty;
            Descricao = string.Empty;
            Prioridade = Prioridade.NaoDefinido;
        }

        
    }
}