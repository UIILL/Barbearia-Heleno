import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function ClientesList() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get('https://barbearia-heleno.onrender.com')
            .then(response => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const deleteCliente = (id) => {
        axios.delete('https://barbearia-heleno.onrender.com' + id)
            .then(response => { console.log(response.data)});

        setClientes(clientes.filter(el => el._id !== id));
    };

    const Cliente = props => (
        <tr>
            {}
            <td className="text-center">{props.index + 1}</td> 

            <td className="text-center">{props.cliente.nome}</td> 
            <td className="text-start">{props.cliente.telefone}</td> 
            <td>{new Date(props.cliente.dataCadastro).toLocaleDateString()}</td>
            <td className="text-center"> 
               
                <Link to={"/edit/"+props.cliente._id} className="btn btn-sm btn-info me-2">Editar</Link>
                
                {}
                <a href="#" className="btn btn-sm btn-danger" onClick={() => { deleteCliente(props.cliente._id) }}>Excluir</a>
            </td>
        </tr>
    );

    const clientesList = () => {
        // 🎯 MUDANÇA: Passando o index como segundo argumento na função map
        return clientes.map((c, index) => <Cliente cliente={c} key={c._id} index={index} />);
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Lista de Clientes ({clientes.length} Cadastrados)</h3> {}
            <table className="table table-striped table-hover mt-3">
                <thead className="thead-dark">
                    <tr>
                        {}
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