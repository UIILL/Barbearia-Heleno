import React, { useState } from 'react';
import axios from 'axios';
// Ocultamos a imagem de fundo para uma aparência mais limpa em produção, 
// mas você pode reativá-la ou usar uma imagem mais sutil.

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
                setNome(''); // Limpa o campo nome
                setTelefone(''); // Limpa o campo telefone
            })
            .catch(err => {
                console.error('Erro ao cadastrar: ', err);
                setMensagem('❌ Erro ao cadastrar cliente: ' + (err.response?.data?.message || err.message));
            });
    };

    return (
        <div className="container mt-4">
            {/* 🚨 NOVIDADE: Envolvemos o formulário em um Card para um visual mais profissional */}
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

                    <div className="form-group mb-4"> {/* Aumentei a margem inferior para separar do botão */}
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
                        {/* 🚨 NOVIDADE: Botão com estilo btn-dark para consistência com o tema */}
                        <input type="submit" value="Cadastrar Cliente" className="btn btn-dark" />
                    </div>

                    {/* Mensagem de feedback */}
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
