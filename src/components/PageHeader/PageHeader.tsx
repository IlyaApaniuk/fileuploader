import * as React from "react";

import "./PageHeader.style.css";

const PageHeader: React.FC = () => {
    return (
        <div className="pageHeaderWrapper">
            <div className="innerHeaderWrapper">
                <a href="https://haunnlanders.ca/" style={{ outline: "none" }}>
                    <img src="./logo.png" alt="Haunn Landers & Co." width={270} height={84} />
                </a>
            </div>
        </div>
    );
};

export default PageHeader;
