using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;
        public AtividadeController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade? Get(int id)
        {
            return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
        }
        [HttpPost]
        public Atividade Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);
            if (_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == atividade.Id);
            else
                throw new Exception("Não foi possivel salvar a atividade");
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id) throw new Exception("Você está tentando atualizar a atividade errada.");
            _context.Update(atividade);
            if (_context.SaveChanges() > 0) // se for true ja é maior que 0
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            else
                return new Atividade();
        }
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            if (atividade == null)
                throw new Exception("Atividade não encontrada");
            
            _context.Remove(atividade);
            return _context.SaveChanges() > 0;
        }
    }

}