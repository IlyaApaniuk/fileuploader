import React from "react";
import ReactDOM from "react-dom";

import Uploader from "./components/Uploader/Uploader";
import reportWebVitals from "./reportWebVitals";
import "./utils/icons";

const strings = {
    headerText: "Welcome Haunn Landers Clients!",
    subHeaderText:
        "In an effort to ensure our mutual security and make it easy to work together, we've put together this page to make it easier for you to upload files to us! Please use this page to upload documents to us in a simple and more secure way. Your information will be transmitted to us more securely and confidentially than simply sending the documents by email. At Haunn Landers, we value your security and privacy.  If you have any questions or concerns please let us know and we'll be happy to help.",
    endSceneHeaderText: "Thank you for uploading your file(s) to us!  Your information has been transmitted and we have been alerted so we can take the appropriate action.",
    endSceneSubHeaderText: "If you'd like to upload additional files, simply click the clear button and use the system again. We appreciate your business."
};

ReactDOM.render(
    <React.StrictMode>
        <Uploader
            headerText={strings.headerText}
            subHeaderText={strings.subHeaderText}
            endSceneHeaderText={strings.endSceneHeaderText}
            endSceneSubHeaderText={strings.endSceneSubHeaderText}
        />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
