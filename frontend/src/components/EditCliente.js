import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

function EditCliente() {
    
    const { id } = useParams(); 
   
    const navigate = useNavigate(); 
    
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/clientes/' + id)
            .then(response => {
                
                setNome(response.data.nome);
                setTelefone(response.data.telefone);
            })
            .catch(function (error) {
                console.log(error);
                setMensagem('❌ Erro ao carregar cliente: ' + error.message);
            })
    }, [id]); 

    const onSubmit = (e) => {
        e.preventDefault();

        const cliente = {
            nome: nome,
            telefone: telefone,
        };

        setMensagem('');

        
        axios.post('http://localhost:5000/clientes/update/' + id, cliente)
            .then(res => {
                setMensagem('✅ Cliente Atualizado com Sucesso!');
                
                setTimeout(() => navigate('/'), 2000); 
            })
            .catch(err => {
                console.error('Erro ao atualizar: ', err);
                setMensagem('❌ Erro ao atualizar cliente. Verifique o console.');
            });
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Editar Cliente</h3>
            
            <form onSubmit={onSubmit}>
                
                {}
                <div className="row">
                    
                    <div className="col-md-6">
                        <div className="form-group mb-3"> 
                            <label>Nome: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="form-group mb-3"> 
                            <label>Telefone: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group mb-3"> 
                    <input type="submit" value="Salvar Alterações" className="btn btn-warning" />
                </div>
                
                {mensagem && <div className={`alert ${mensagem.startsWith('✅') ? 'alert-success' : 'alert-danger'} mt-3`}>{mensagem}</div>}
            </form>
        </div>
    );
}

export default EditCliente;