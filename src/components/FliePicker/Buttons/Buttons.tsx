import * as React from "react";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";

import UploadStatus from "../../../models/UploadStatus";

import "./Buttons.style.css";

export interface IButtonsProps {
    status: UploadStatus;
    openFileSelector: () => void;
    clear: () => void;
}

const Buttons: React.FC<IButtonsProps> = ({ openFileSelector, clear, status }) => {
    return (
        <div className="buttonsWrapper">
            <PrimaryButton className="button" disabled={status === UploadStatus.Uploading} onClick={() => openFileSelector()}>
                Select file(s)
            </PrimaryButton>
            <DefaultButton className="button" disabled={status === UploadStatus.Uploading} onClick={() => clear()}>
                Clear
            </DefaultButton>
        </div>
    );
};

export default Buttons;
