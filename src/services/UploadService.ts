// import { IAuth } from "../models/IAuth";
import { IFile } from "../models/IFile";
import UploadStatus from "../models/UploadStatus";

class UploadService {
    private files: IFile[];

    private token: string;

    // private readonly absoluteUrl: string = "https://85458q.sharepoint.com/sites/dev";

    // private readonly documentLibraryTitle: string = "Documents";

    // private readonly folderName: string = "Secure File Upload";

    // private readonly tenantId: string = "19e59194-a213-4d26-8ec1-56db95ec718e";

    // private readonly tenantName: string = "85458q";

    // private readonly clientId: string = "c525257f-aaa1-49dd-a65e-aa2830c761cf";

    // private readonly clientSecret: string = "CAKwcFTqe980ANh5AqU78en154Wlo4hFlCnyN6XWBz4=";

    private readonly absoluteUrl: string = "https://haunnlanders.sharepoint.com/sites/SecureFileUpload";

    private readonly documentLibraryTitle: string = "Documents";

    private readonly folderName: string = "Secure File Upload";

    private readonly tenantId: string = "724aa014-bc2a-408b-91c2-c480d5558ebf";

    private readonly tenantName: string = "haunnlanders";

    private readonly clientId: string = "9fe8a720-f783-44be-b5c2-6c496b05e80f";

    private readonly clientSecret: string = "BNmj/cx05czcH+sAk1bnFJNr31h2GON+cRiV2o2b/d0=";

    constructor() {
        this.token = "";
        this.files = [];
    }

    public async uploadFiles(files: IFile[], callback: (files: IFile[]) => void): Promise<boolean> {
        this.trackFilesState(files);
        const promises = files.map(file => {
            return this.uploadFile(file, callback);
        });

        const result = await Promise.all(promises);

        return result.every(r => r === true);
    }

    private async uploadFile(file: IFile, callback: (files: IFile[]) => void): Promise<boolean> {
        try {
            const options: RequestInit = {
                method: "POST",
                headers: {
                    Accept: "application/json;odata=verbose",
                    Authorization: `Bearer ${this.token}`
                },
                body: file.file
            };

            await this.callWrapper(this.libraryUrlBuiler(file.file.name), options);

            this.sendUpdatesToUI(file, callback, UploadStatus.Uploaded);

            return true;
        } catch (e) {
            console.error(e);

            this.sendUpdatesToUI(file, callback, UploadStatus.Error, "Failed to upload file. Contact administrator or try again.");

            return false;
        }
    }

    private async callWrapper(url: string, options: RequestInit): Promise<void> {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                try {
                    await this.getToken();

                    await fetch(url, { ...options, headers: { Accept: "application/json;odata=verbose", Authorization: `Bearer ${this.token}` } });
                } catch (e) {
                    throw e;
                }
            }
        } catch (e) {
            throw e;
        }
    }

    private async getToken(): Promise<void> {
        try {
            const body = new URLSearchParams({
                grant_type: "client_credentials",
                client_id: `${this.clientId}@${this.tenantId}`,
                client_secret: this.clientSecret,
                resource: `00000003-0000-0ff1-ce00-000000000000/${this.tenantName}.sharepoint.com@${this.tenantId}`
            });

            const options: RequestInit = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body
            };

            const response = await fetch(`https://accounts.accesscontrol.windows.net/${this.tenantId}/tokens/OAuth/2`, options);
            const auth = await response.json();

            this.token = auth.access_token;
        } catch (e) {
            console.error(e);

            throw new Error((e as Error).message);
        }
    }

    private trackFilesState(files: IFile[]) {
        this.files = files;
    }

    private sendUpdatesToUI(file: IFile, callback: (files: IFile[]) => void, status: UploadStatus, error?: string) {
        const files = this.files.map(f => (f.file.name === file.file.name ? { ...f, status, error: error } : { ...f }));

        callback(files);
        this.files = files;
    }

    private libraryUrlBuiler(fileName: string): string {
        return `${this.absoluteUrl}/_api/Web/Lists/getByTitle('${this.documentLibraryTitle}')/RootFolder/Folders('${this.folderName}')/Files/Add(url='${fileName}', overwrite=true)`;
    }
}

export default new UploadService();
