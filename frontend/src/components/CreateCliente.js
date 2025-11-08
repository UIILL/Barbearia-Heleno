import React, { useState } from 'react';
import axios from 'axios';

function CreateCliente() {
    
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const cliente = {
            nome: nome,
            telefone: telefone,
        };
        
        setMensagem(''); 

        axios.post('http://localhost:5000/clientes/add', cliente)
            .then(res => {
               
                setMensagem('✅ Cliente Adicionado com Sucesso!'); 
                setNome('');
                setTelefone('');
                
            })
            .catch(err => {
                
                console.error('Erro ao cadastrar: ', err);
                setMensagem('❌ Erro ao cadastrar cliente. Verifique o console. Detalhe: ' + (err.response?.data || err.message));
            });
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Cadastrar Novo Cliente</h3>
            <form onSubmit={onSubmit}>
                
                {}
                <div className="form-group mb-3"> 
                    <label>Nome: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                
                {}
                <div className="form-group mb-3"> 
                    <label>Telefone: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                
                <div className="form-group mb-3"> 
                    <input type="submit" value="Cadastrar Cliente" className="btn btn-primary" />
                </div>
                
                {}
                {mensagem && <div className={`alert ${mensagem.startsWith('✅') ? 'alert-success' : 'alert-danger'} mt-3`}>{mensagem}</div>}
            </form>
        </div>
    );
}

export default CreateCliente;