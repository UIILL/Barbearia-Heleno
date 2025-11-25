import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

function ClientesList() {
    const [clientes, setClientes] = useState([]);
    const [mensagem, setMensagem] = useState(''); 

    useEffect(() => {
        axios.get(API_URL + '/clientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar clientes:", error);
                setMensagem('❌ Erro ao carregar a lista de clientes.');
            })
    }, []);

    const deleteCliente = (id) => {
        axios.delete(API_URL + '/clientes/' + id)
            .then(response => {
                console.log("Cliente excluído:", response.data);
                setClientes(clientes.filter(el => el._id !== id));
                setMensagem('✅ Cliente excluído com sucesso!');
                setTimeout(() => setMensagem(''), 3000); 
            })
            .catch((error) => {
                console.error("Erro ao excluir cliente:", error);
                setMensagem('❌ Erro ao excluir cliente.');
                setTimeout(() => setMensagem(''), 3000); 
            });
    };

    const Cliente = props => (
        <tr>
            <td className="text-center">{props.index + 1}</td>
            <td>{props.cliente.nome}</td>
            <td>{props.cliente.telefone}</td>
            <td>{new Date(props.cliente.dataCadastro).toLocaleDateString('pt-BR')}</td>
            
            
            <td className="text-center">
                
                {/* Botões */}
                <Link to={"/edit/"+props.cliente._id} className="btn btn-outline-dark btn-sm me-2">Editar</Link>
                <button className="btn btn-danger btn-sm" onClick={() => { deleteCliente(props.cliente._id) }}>Excluir</button>
            
            </td> {/* 🚨 CORREÇÃO: Fechamento da tag </td> */}
        </tr> // 🚨 CORREÇÃO: Fechamento da tag </tr>
    );

    const clientesList = () => {
        return clientes.map((c, index) => <Cliente cliente={c} key={c._id} index={index} />);
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <h4 className="text-secondary mb-4">
                    Lista de Clientes ({clientes.length} Cadastrados)
                </h4>

                
                {mensagem && (
                    <div className={`alert ${mensagem.startsWith('✅') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                        {mensagem}
                    </div>
                )}
                
                {clientes.length > 0 ? (
                    <table className="table table-striped table-hover mt-3">
                        <thead className="thead-light">
                            <tr>
                                <th className="text-muted fw-normal text-center">#</th>
                                <th className="text-muted fw-normal">Nome</th>
                                <th className="text-muted fw-normal">Telefone</th>
                                <th className="text-muted fw-normal">Cadastro</th>
                                <th className="text-muted fw-normal text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            { clientesList() }
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted text-center mt-4">Nenhum cliente cadastrado ainda. <Link to="/create">Cadastre um novo cliente.</Link></p>
                )}
            </div>
        </div>
    );
}

export default ClientesList;
