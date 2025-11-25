import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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

        axios.post(API_URL + '/clientes/add', cliente)
            .then(res => {
                setMensagem('✅ Cliente adicionado com sucesso!');
                setNome('');
                setTelefone(''); 
            })
            .catch(err => {
                console.error('Erro ao cadastrar: ', err);
                setMensagem('❌ Erro ao cadastrar cliente: ' + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div className="container mt-4">
           
            <div className="card shadow-sm p-4">
                <h4 className="text-secondary mb-4">Cadastrar Novo Cliente</h4>
                
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <label className="form-label">Nome:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome do cliente" // Adicionado placeholder
                        />
                    </div>

                    <div className="form-group mb-4"> 
                        <label className="form-label">Telefone:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="Ex: 71987654321" // Adicionado placeholder
                        />
                    </div>

                    <div className="form-group">
                        
                        <input type="submit" value="Cadastrar Cliente" className="btn btn-dark" />
                    </div>

                   
                    {mensagem && (
                        <div className={`alert ${mensagem.startsWith('✅') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                            {mensagem}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CreateCliente;
