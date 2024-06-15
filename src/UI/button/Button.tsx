import {Link} from "react-router-dom";
import {Dispatch, memo, ReactNode, SetStateAction} from "react";

interface IButton {
    children: ReactNode;
    type?: 'reset' | 'submit' | 'button' ;
    className?: string;
    isPrimary?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | null | Dispatch<SetStateAction<boolean>>;
    name?: "popappStatement" | "popappNumber" | "popappSpareParts";
    target?: string;
    link?: string;
    message?: string;
    disabled?: boolean
}

const Button = ({children, target,  type, disabled = false, onClick, className = "", isPrimary = false, link}: IButton) => {
    return (
        <>
            {
                link ? (
                    <Link target={target} className={`${isPrimary ? 'btn-primary' : 'btn'} ${className}`} to={link}>{children}</Link>
                ) : (
                    <button
                        className={`btn ${className}`}
                        onClick={e => onClick ? onClick(e) : undefined}
                        type={type ? type : "submit"}
                        disabled={disabled}
                    >
                        {children}
                    </button>
                )
            }
        </>
    )

};

export default memo(Button);