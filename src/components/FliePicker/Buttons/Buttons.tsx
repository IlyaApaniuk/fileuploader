import * as React from "react";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";

import "./Buttons.style.css";

export interface IButtonsProps {
    openFileSelector: () => void;
    clear: () => void;
}

const Buttons: React.FC<IButtonsProps> = ({ openFileSelector, clear }) => {
    return (
        <div className="buttonsWrapper">
            <PrimaryButton className="button" onClick={() => openFileSelector()}>
                Select file(s)
            </PrimaryButton>
            <DefaultButton className="button" onClick={() => clear()}>
                Clear
            </DefaultButton>
        </div>
    );
};

export default Buttons;
