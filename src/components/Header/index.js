import React from 'react';
import './Header.css';

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
           <div className="header--logo">
               <a href="/">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" alt="Netflix" />
               </a>
           </div>

           <div className="header--menu">
               <ul>
                   <li><a href="/">Inicio </a></li>
                   <li><a href="/">Séries </a></li>
                   <li><a href="/">Filmes </a></li>
                   <li><a href="/">Bombando </a></li>
                   <li><a href="/">Minha Lista </a></li>
               </ul>
           </div>

           <div className="header--user">
                <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"/> 
           </div>
        </header>
    )
}