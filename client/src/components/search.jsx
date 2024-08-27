import "../style/search.css";
import React from 'react';
import searchSvg from '../assets/search.svg'

const Search = () =>{

    return(
        <>
        <div className="search-container">
            <img src={searchSvg} alt="Lupa" class="search-icon"></img>
            <input type="text" class="search-input" placeholder="Search movie, cinema, genre..."/>
            <div class="header-section">
            <span class="title">Now playing</span>
            <a href="#" class="see_all">See all</a>
            </div>
        </div>
        </>
    )
}

export default Search