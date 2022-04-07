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
import PageFooter from "../PageFooter/PageFooter";

import "./Uploader.style.css";

export interface IUploaderProps {
    appName: string;
    headerText: {
        welcome: string;
        firstPart: string;
        secondPart: string;
        thanks: string;
    };
    endSceneHeaderText: string;
    endSceneSubHeaderText: string;
    footerText: {
        office: {
            name: string;
            description: string;
        };
        contacts: {
            name: string;
            numbers: { number: string; text: string }[];
        };
    };
}

const Uploader: React.FC<IUploaderProps> = ({ appName, headerText, endSceneHeaderText, endSceneSubHeaderText, footerText }) => {
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
            <h1 className="appName">{appName}</h1>
            <div className="mainSection">
                <Header headerText={headerText} />
                <FilePicker files={files} setFiles={setFiles} clearUploads={() => setStatus(UploadStatus.Pending)} />
                {files.length > 0 && (
                    <PrimaryButton className="uploadButton" disabled={status === UploadStatus.Uploading || status === UploadStatus.Uploaded} onClick={() => uploadFiles()}>
                        {status === UploadStatus.Uploading ? <Spinner className="spinner" size={SpinnerSize.medium} /> : "Upload file(s)"}
                    </PrimaryButton>
                )}
                {status === UploadStatus.Uploaded && <EndScreen headerText={endSceneHeaderText} subHeaderText={endSceneSubHeaderText} />}
            </div>
            <PageFooter footerText={footerText} />
        </div>
    );
};

export default Uploader;
