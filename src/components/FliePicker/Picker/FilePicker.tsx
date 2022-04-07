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
    status: UploadStatus;
    setFiles: (files: IFile[]) => void;
    clearUploads: () => void;
}

const FilePicker: React.FC<IFilePickerProps> = ({ files, status, setFiles, clearUploads }) => {
    const [openFileSelector, { plainFiles, loading, errors, clear }] = useFilePicker({
        accept: extensions,
        multiple: true,
        maxFileSize: 50
    });

    const clearUploadsHandler = () => {
        clearUploads();
        clear();
        setFiles([]);
    };

    React.useEffect(() => {
        if (status === UploadStatus.Uploaded) {
            setFiles(plainFiles.map(file => ({ file, status: UploadStatus.Pending })));
            clearUploads();
        } else {
            setFiles([...files, ...plainFiles.map(file => ({ file, status: UploadStatus.Pending }))]);
        }
    }, [plainFiles, setFiles]);

    return (
        <div className="filePickerWrapper">
            <Buttons openFileSelector={openFileSelector} clear={clearUploadsHandler} status={status} />
            {loading ? <Spinner size={SpinnerSize.large} /> : <Files files={files} />}
            <Errors errors={errors} />
        </div>
    );
};

export default FilePicker;
