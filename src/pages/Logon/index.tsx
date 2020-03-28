import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import './styles.css'

const Logon: React.FC = () => {
  const [id, setId] = useState('');
  const history = useHistory()

  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      const response = await api.post('/session', { id });

      console.log(response.data.name)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (err) {
      alert("Falha no login, tente novamente1")
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input 
            placeholder="Faça seu Logon"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02042"/> Faça seu cadastro
          </Link>
        </form>
       
        
      </section>

      <img src={heroesImg} alt="Be The Hero"/>
    </div>
  );
}

export default Logon;