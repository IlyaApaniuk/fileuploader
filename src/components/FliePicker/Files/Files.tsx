import * as React from "react";

import { IFile } from "../../../models/IFile";

import File from "./File/File";
import "./Files.style.css";

export interface IFilesProps {
    files: IFile[];
}

const Files: React.FC<IFilesProps> = ({ files }) => {
    return (
        <div className="filesWrapper">
            {files.map(file => (
                <File key={file.file.lastModified} file={file} />
            ))}
        </div>
    );
};

export default Files;
