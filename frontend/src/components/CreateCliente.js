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

                setMensagem('✅ Cliente Adicionado com Sucesso!');
                setNome('');
                setTelefone('');

            })
            .catch(err => {

                console.error('Erro ao cadastrar: ', err);
               
                setMensagem('❌ Erro ao cadastrar cliente. Verifique o console. Detalhe: ' + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Cadastrar Novo Cliente</h3>
            {/* Exibição da imagem que mostra o erro de cadastro no Front-end */}
            
            <form onSubmit={onSubmit}>

                {/* Campo Nome */}
                <div className="form-group mb-3">
                    <label>Nome: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                {/* Campo Telefone */}
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

                {/* Exibe a mensagem de sucesso ou erro */}
                {mensagem && <div className={`alert ${mensagem.startsWith('✅') ? 'alert-success' : 'alert-danger'} mt-3`}>{mensagem}</div>}
            </form>
        </div>
    );
}

export default CreateCliente;
