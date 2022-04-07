import React from "react";
import ReactDOM from "react-dom";

import Uploader from "./components/Uploader/Uploader";
import reportWebVitals from "./reportWebVitals";
import "./utils/icons";

const strings = {
    appName: "FILE UPLOAD",
    headerText: {
        welcome: "Welcome!",
        firstPart:
            "To protect your personal information and make it easier to work together, we've put together this page to make it easier to share documents with us. Please use this page to upload documents to us in a simple and more secure way. Your information will be transmitted to us more securely and confidentially than simply sending the documents by email. At Haunn Landers & Co, we value your security and privacy. If you have any questions or concerns, please let us know and we'll be happy to help.",
        secondPart:
            "Click “select file” below to find the file to upload from your computer.  You are able to select multiple files at the same time if you need to upload multiple documents.  If you have selected the wrong file, please feel free to click “clear” to remove and start over.",
        thanks: "Thanks"
    },
    endSceneHeaderText: "Thank you for uploading your file(s) to us!  Your information has been transmitted and we have been alerted so we can take the appropriate action.",
    endSceneSubHeaderText: "If you'd like to upload additional files, simply click the clear button and use the system again. We appreciate your business.",
    footerText: {
        office: {
            name: "OUR OFFICE",
            description: "Haunn Landers & Co.|6645 Kitimat Road, Unit 15|Mississauga ON L5N 6J3"
        },
        contacts: {
            name: "PHONE NUMBER",
            numbers: [
                {
                    number: "tel:+905-821-8224",
                    text: "Tel: 905-821-8224"
                },
                {
                    number: "tel:+1-877-523-4437",
                    text: "Toll Free: 1-877-523-4437"
                }
            ]
        }
    }
};

ReactDOM.render(
    <React.StrictMode>
        <Uploader
            appName={strings.appName}
            headerText={strings.headerText}
            endSceneHeaderText={strings.endSceneHeaderText}
            endSceneSubHeaderText={strings.endSceneSubHeaderText}
            footerText={strings.footerText}
        />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
