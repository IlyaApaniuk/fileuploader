import * as React from "react";
import { FileError } from "use-file-picker/dist/interfaces";

import "./Errors.style.css";

export interface IErrorsProps {
    errors: FileError[];
}

const Errors: React.FC<IErrorsProps> = ({ errors }) => {
    return <div className="errorsWrapper">{errors.length > 0 && <div className="errorMessage">{errors[0].fileSizeToolarge && "File(s) size is too large"}</div>}</div>;
};

export default Errors;
