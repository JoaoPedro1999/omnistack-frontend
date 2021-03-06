import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

type Incident = {
  id: number;
  title: string,
  description: string;
  value: number;
}

const Profile: React.FC = () => {
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function loadProfle() {
      const response =await api.get('/profile', {
        headers: {
          Authorization: ongId,
        }
      })
      setIncidents(response.data)
    } 

    loadProfle();
  }, [ongId])

  async function handleDeleteIncident({ id }: any) {
    try {
      api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {

    }
  }

  function handlelogOut() {
    localStorage.clear();
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem-vindo, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
        <button type="button" onClick={() => handlelogOut()}><FiPower size={18} color="#e02041" /></button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident?.id}>
            <strong>CASO</strong>
            <p>{incident?.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident?.description}</p>

            <strong>VALOR</strong>
            <p>
              {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'})
                .format(incident?.value)}
              </p>

            <button type="button" onClick={() => handleDeleteIncident(incident?.id)}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;