import React, { FC } from "react";
import logo from "../img/logo.png";

interface ILogoBannerProps {}

const LogoBanner: FC<ILogoBannerProps> = () => {
    return(
        <React.Fragment>
            <div id="logoBannerContainer">
                <img src={logo} alt="logoImg"></img>Get A Winner App                
            </div>
        </React.Fragment>
    )
}

export default LogoBanner;