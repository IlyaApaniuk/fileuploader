// import { IAuth } from "../models/IAuth";
import { IFile } from "../models/IFile";
import UploadStatus from "../models/UploadStatus";

class UploadService {
    private files: IFile[];

    private token: string;

    private readonly absoluteUrl: string = "https://85458q.sharepoint.com/sites/dev";

    private readonly documentLibraryTitle: string = "Documents";

    private readonly tenantId: string = "19e59194-a213-4d26-8ec1-56db95ec718e";

    private readonly tenantName: string = "85458q";

    private readonly clientId: string = "793e6828-b07d-443b-ac8a-be49bfd32388";

    private readonly clientSecret: string = "B2ZRidv1a73idJU44NvvWPWuVRWwNBA9wigB5mS0szc=";

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
        return `${this.absoluteUrl}/_api/Web/Lists/getByTitle('${this.documentLibraryTitle}')/RootFolder/Files/Add(url='${fileName}', overwrite=true)`;
    }
}

export default new UploadService();
