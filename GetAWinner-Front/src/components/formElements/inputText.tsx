import React, { FC } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


interface IInputTextProps {
    label: string,
    idInput: string,
    type: string,
    placeholder: string,
    value: string,
    onChange: (text: string) => void;
    variant: string,
    className?: any
}

const InputText: FC<IInputTextProps> = ({ label, idInput, type, placeholder, value, onChange, variant, className}) => {
    return (
        <React.Fragment>
            <InputGroup className="mb-3">
                <Button className={className} tabIndex={-1} variant={variant} id={"idbtn"+label}>
                    <label htmlFor={idInput}>{label}</label>
                </Button>
                <FormControl    
                    className={className}                
                    id={idInput}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
            </InputGroup>
        </React.Fragment>
    )
}

export default InputText;



