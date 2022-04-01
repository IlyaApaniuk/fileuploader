import * as React from "react";

import "./Header.style.css";

export interface IHeaderProps {
    headerText: string;
    subHeaderText: string;
}

const Header: React.FC<IHeaderProps> = ({ headerText, subHeaderText }) => {
    return (
        <div className="headerWrapper">
            <div className="text">{headerText}</div>
            <div className="text">{subHeaderText}</div>
        </div>
    );
};

export default Header;
