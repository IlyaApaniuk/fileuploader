import * as React from "react";
import classNames from "classnames";

import "./EndScreen.style.css";

export interface IEndScreenProps {
    headerText: string;
    subHeaderText: string;
}

const EndScreen: React.FC<IEndScreenProps> = ({ headerText, subHeaderText }) => {
    return (
        <div className={classNames("endScreenWrapper", "rollOut")}>
            <div className="text">{headerText}</div>
            <div className="text">{subHeaderText}</div>
        </div>
    );
};

export default EndScreen;
