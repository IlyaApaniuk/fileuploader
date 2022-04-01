import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Icon } from "office-ui-fabric-react";
import * as React from "react";

import { IFile } from "../../../../models/IFile";
import UploadStatus from "../../../../models/UploadStatus";
import extensions from "../../../../utils/extensions";

import "./File.style.css";

export interface IFileProps {
    file: IFile;
}

const File: React.FC<IFileProps> = ({ file }) => {
    const fileIcon = (): JSX.Element => {
        const extension = file.file.name.split(".").pop();

        if (extensions.includes(`.${extension}`)) {
            return <img src={`https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${extension}.svg`} alt="logo" width={20} height={20} />;
        }

        return <Icon iconName="Document" style={{ fontSize: 20 }} />;
    };

    return (
        <div className="fileWrapper">
            {fileIcon()}
            <div className="info">
                <span className="name" title={file.file.name}>
                    {file.file.name}
                </span>
                {file.error && (
                    <span className="errorMessage" title={file.error}>
                        {file.error}
                    </span>
                )}
            </div>
            {file.status === UploadStatus.Uploading && <Spinner size={SpinnerSize.medium} />}
            {file.status === UploadStatus.Uploaded && <Icon className="uploaded" iconName="Accept" />}
            {file.status === UploadStatus.Error && <Icon className="errorIcon" iconName="Cancel" />}
        </div>
    );
};

export default File;
