import UploadStatus from "./UploadStatus";

export interface IFile {
    file: File;
    status: UploadStatus;
    error?: string;
}
