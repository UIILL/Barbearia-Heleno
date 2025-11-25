import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

function ClientesList() {
    const [clientes, setClientes] = useState([]);
    const [mensagem, setMensagem] = useState(''); // Para feedback na exclusão

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
                setTimeout(() => setMensagem(''), 3000); // Limpa a mensagem após 3 segundos
            })
            .catch((error) => {
                console.error("Erro ao excluir cliente:", error);
                setMensagem('❌ Erro ao excluir cliente.');
                setTimeout(() => setMensagem(''), 3000); // Limpa a mensagem após 3 segundos
            });
    };

    const Cliente = props => (
        <tr>
            <td className="text-center">{props.index + 1}</td>
            <td>{props.cliente.nome}</td> {/* Alinhei à esquerda para nome */}
            <td>{props.cliente.telefone}</td>
            <td>{new Date(props.cliente.dataCadastro).toLocaleDateString('pt-BR')}</td> {/* Formato BR */}
            <td className="text-center">
                {/* 🚨 NOVIDADE: Botão Editar com estilo btn-outline-dark para harmonia */}
                <Link to={"/edit/"+props.cliente._id} className="btn btn-outline-dark btn-sm me-2">Editar</Link>
                {/* Botão Excluir com btn-danger para ação de risco */}
                <button className="btn btn-danger btn-sm" onClick={() => { deleteCliente(props.cliente._id) }}>Excluir</button>
