import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Variável de ambiente para a URL da API
const API_URL = process.env.REACT_APP_API_URL;

function EditCliente() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        // GET para carregar os dados atuais do cliente
        axios.get(API_URL + '/clientes/' + id)
            .then(response => {
                setNome(response.data.nome);
                setTelefone(response.data.telefone);
            })
            .catch(function (error) {
                console.error(error);
                setMensagem('❌ Erro ao carregar cliente. Tente novamente mais tarde.');
            })
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();

        const cliente = {
            nome: nome,
            telefone: telefone,
        };

        setMensagem('');

        // POST (ou PUT, dependendo do seu backend) para atualizar o cliente
        axios.post(API_URL + '/clientes/update/' + id, cliente)
            .then(res => {
                setMensagem('✅ Cliente Atualizado com Sucesso!');

                // Navega de volta para a lista após 2 segundos
                setTimeout(() => navigate('/'), 2000);
            })
            .catch(err => {
                console.error('Erro ao atualizar: ', err);
                setMensagem('❌ Erro ao atualizar cliente. Verifique o console.');
            });
    };

    return (
        <div className="container mt-4">
            {/* 🚨 NOVIDADE: Card com sombra para visual profissional */}
            <div className="card shadow-sm p-4">
                <h4 className="text-secondary mb-4">Editar Cliente</h4>

                {/* Mensagem de feedback (carregamento ou atualização) */}
                {mensagem && (
                    <div className={`alert ${mensagem.startsWith('✅') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                        {mensagem}
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="row">
                        {/* Campo Nome */}
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">Nome:</label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Campo Telefone */}
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">Telefone:</label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        {/* 🚨 NOVIDADE: Botão com estilo btn-dark para consistência */}
                        <input type="submit" value="Salvar Alterações" className="btn btn-dark" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCliente;
