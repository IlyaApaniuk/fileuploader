import * as React from "react";
import { useFilePicker } from "use-file-picker";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";

import Buttons from "../Buttons/Buttons";
import Errors from "../Errors/Errors";
import Files from "../Files/Files";
import UploadStatus from "../../../models/UploadStatus";
import { IFile } from "../../../models/IFile";
import extensions from "../../../utils/extensions";

import "./FilePicker.style.css";

export interface IFilePickerProps {
    files: IFile[];
    setFiles: (files: IFile[]) => void;
    clearUploads: () => void;
}

const FilePicker: React.FC<IFilePickerProps> = ({ files, setFiles, clearUploads }) => {
    const [openFileSelector, { plainFiles, loading, errors, clear }] = useFilePicker({
        accept: extensions,
        multiple: true,
        maxFileSize: 50
    });

    const clearUploadsHandler = () => {
        clearUploads();
        clear();
    };

    React.useEffect(() => {
        setFiles(plainFiles.map(file => ({ file, status: UploadStatus.Pending })));
        clearUploads();
    }, [plainFiles, setFiles]);

    return (
        <div className="filePickerWrapper">
            <Buttons openFileSelector={openFileSelector} clear={clearUploadsHandler} />
            {loading ? <Spinner size={SpinnerSize.large} /> : <Files files={files} />}
            <Errors errors={errors} />
        </div>
    );
};

export default FilePicker;
