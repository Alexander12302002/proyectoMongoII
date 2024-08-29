import "../../style/home/footer.css";
import React from 'react';
import searchSvg from '../../assets/search.svg'
import userSvg from "../../assets/user.svg";
import homeSvg from "../../assets/home.svg";
import ticketsSvg from "../../assets/tickets.svg";

const Footer = () => {
    return (
        <>
            <footer className="container-footer">
                <ul className="items">
                    <li><a href="/"><img src={homeSvg}/></a></li>
                    <li><a href="/"><img src={searchSvg}/></a></li>
                    <li><a href="/tickets"><img src={ticketsSvg}/></a></li>
                    <li><a href="../../#"><img src={userSvg}/></a></li>
                </ul>
            </footer>
        </>
    )
}

export default Footer