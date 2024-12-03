import React, { FC } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";


interface IButtonProps {
    BVariant: string;
    text: string, 
    onClick: (param: any) => void;
    className?: any;

}

const CButton: FC<IButtonProps> = ({BVariant, text, onClick, className}) => {

    return (
        <React.Fragment>
            <Button className={className} variant={BVariant} onClick={onClick}>{text}</Button>
        </React.Fragment>
    )
}

export default CButton;