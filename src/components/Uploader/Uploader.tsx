import * as React from "react";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";

import { IFile } from "../../models/IFile";
import UploadStatus from "../../models/UploadStatus";
import uploadService from "../../services/UploadService";
import FilePicker from "../FliePicker/Picker/FilePicker";
import Header from "../Header/Header";
import EndScreen from "../EndScreen/EndScreen";
import PageHeader from "../PageHeader/PageHeader";

import "./Uploader.style.css";

export interface IUploaderProps {
    headerText: string;
    subHeaderText: string;
    endSceneHeaderText: string;
    endSceneSubHeaderText: string;
}

const Uploader: React.FC<IUploaderProps> = ({ headerText, subHeaderText, endSceneHeaderText, endSceneSubHeaderText }) => {
    const [files, setFiles] = React.useState<IFile[]>([]);
    const [status, setStatus] = React.useState<UploadStatus>(UploadStatus.Pending);

    const callback = (update: IFile[]) => {
        setFiles([...update]);
    };

    const uploadFiles = async () => {
        setStatus(UploadStatus.Uploading);
        const uploadingFiles = files.map(file => ({ ...file, status: UploadStatus.Uploading }));

        setFiles([...uploadingFiles]);
        const result = await uploadService.uploadFiles(uploadingFiles, callback);

        setStatus(result ? UploadStatus.Uploaded : UploadStatus.Error);
    };

    return (
        <div className="uploaderWrapper">
            <PageHeader />
            <div className="mainSection">
                <Header headerText={headerText} subHeaderText={subHeaderText} />
                <FilePicker files={files} setFiles={setFiles} clearUploads={() => setStatus(UploadStatus.Pending)} />
                {files.length > 0 && (
                    <PrimaryButton className="uploadButton" disabled={status === UploadStatus.Uploading || status === UploadStatus.Uploaded} onClick={() => uploadFiles()}>
                        {status === UploadStatus.Uploading ? <Spinner className="spinner" size={SpinnerSize.medium} /> : "Upload file(s)"}
                    </PrimaryButton>
                )}
                {status === UploadStatus.Uploaded && <EndScreen headerText={endSceneHeaderText} subHeaderText={endSceneSubHeaderText} />}
            </div>
        </div>
    );
};

export default Uploader;
