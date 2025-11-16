import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL;

function ClientesList() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        
        axios.get(API_URL + '/clientes')
            .then(response => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log("Erro ao carregar clientes:", error);
            })
    }, []);

    const deleteCliente = (id) => {
        
        axios.delete(API_URL + '/clientes/' + id)
            .then(response => {
                console.log("Cliente excluído:", response.data);
                // Atualiza a lista localmente
                setClientes(clientes.filter(el => el._id !== id));
            })
            .catch((error) => {
                console.log("Erro ao excluir cliente:", error);
            });
    };

    const Cliente = props => (
        <tr>
            <td className="text-center">{props.index + 1}</td>

            <td className="text-center">{props.cliente.nome}</td>
            <td className="text-start">{props.cliente.telefone}</td>
            <td>{new Date(props.cliente.dataCadastro).toLocaleDateString()}</td>
            <td className="text-center">

                <Link to={"/edit/"+props.cliente._id} className="btn btn-sm btn-info me-2">Editar</Link>

                {/* Este botão já estava corrigido na última interação para evitar o erro de acessibilidade (href="#") */}
                <button className="btn btn-sm btn-danger" onClick={() => { deleteCliente(props.cliente._id) }}>Excluir</button>
            </td>
        </tr>
    );

    const clientesList = () => {
        
        return clientes.map((c, index) => <Cliente cliente={c} key={c._id} index={index} />);
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Lista de Clientes ({clientes.length} Cadastrados)</h3>
            <table className="table table-striped table-hover mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Nome</th>
                        <th className="text-start">Telefone</th>
                        <th>Cadastro</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { clientesList() }
                </tbody>
            </table>
        </div>
    );
}

export default ClientesList;
