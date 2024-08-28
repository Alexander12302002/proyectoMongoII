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
                    <li><img src={homeSvg}/></li>
                    <li><img src={searchSvg}/></li>
                    <li><img src={ticketsSvg}/></li>
                    <li><img src={userSvg}/></li>
                </ul>
            </footer>
        </>
    )
}

export default Footer