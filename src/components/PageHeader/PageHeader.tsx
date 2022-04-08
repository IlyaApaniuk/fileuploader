import * as React from "react";

import "./PageHeader.style.css";

export interface IPageHeaderProps {
    appName: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ appName }) => {
    return (
        <header className="pageHeaderWrapper">
            <div className="innerHeaderWrapper">
                <h1 className="appName">{appName}</h1>
            </div>
        </header>
    );
};

export default PageHeader;
