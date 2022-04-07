import * as React from "react";

import "./Header.style.css";

export interface IHeaderProps {
    headerText: {
        welcome: string;
        firstPart: string;
        secondPart: string;
        thanks: string;
    };
}

const Header: React.FC<IHeaderProps> = ({ headerText }) => {
    return (
        <div className="headerWrapper">
            <div className="text">{headerText.welcome}</div>
            <div className="text">{headerText.firstPart}</div>
            <div className="text">{headerText.secondPart}</div>
            <div className="text">{headerText.thanks}</div>
        </div>
    );
};

export default Header;
