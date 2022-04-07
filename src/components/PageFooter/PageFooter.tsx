import * as React from "react";

import "./PageFooter.style.css";

export interface IPageFooterProps {
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

const PageFooter: React.FC<IPageFooterProps> = ({ footerText }) => {
    return (
        <div className="pageFooterWrapper">
            <div className="innerFooterWrapper">
                <img className="logo" src="./logo.png" alt="Haunn Landers & Co." width={250} height={77} />
                <div className="infoWrapper">
                    <div className="head">{footerText.office.name}</div>
                    {footerText.office.description.split("|").map(text => (
                        <p key={text}>{text}</p>
                    ))}
                </div>
                <div className="infoWrapper">
                    <div className="head">{footerText.contacts.name}</div>
                    {footerText.contacts.numbers.map(number => (
                        <p key={number.text}>
                            <a href={number.number}>{number.text}</a>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageFooter;
