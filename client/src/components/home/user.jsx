import "../../style/home/user.css";
import React from 'react';
import userSvg from "../../assets/user.svg";
import bellSvg from "../../assets/bell.svg";

const User = () => {
    return (
        <> 
            <div className="container_user">
                <div className="img_user">
                    <img src={userSvg} className="user_svg" />
                </div>
                <div className="message_user">
                    <h4>Hi, Ferrucio Tuccine!</h4>
                    <strong><h4>Let’s watch movie together!</h4></strong>
                </div>
                <div className="noti">
                    <img src={bellSvg} className="bell_svg" />
                </div>
            </div>
        </>
    );
}

export default User;