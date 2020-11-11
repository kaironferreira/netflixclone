import userEvent from '@testing-library/user-event';
import './App.css';
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null);
    const [balckHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            let originals = list.filter(i=> i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

            setFeatureData(chosenInfo);
        }

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true);
            }else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }

    }, []);

    return(
        <div className="page">

            <Header black={balckHeader} />

            {featureData && 
                <FeatureMovie item={featureData} /> 
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}  />
                ))}
            </section>

            <footer>
                Desenvolvido por Kairon Ferreira <br/>
                Direitos de imagem para Netflix <br/>
                Dados pego do site Themoviedb.org
            </footer>

            {movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif"></img>
                </div>
            }
        </div>
    )
}