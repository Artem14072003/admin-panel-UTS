import Cross from "../../UI/icon/Cross.tsx";
import {IComponentPopapp} from "../../assets/type/type.ts";
import {useEffect} from "react";

const Popapp = ({children, title, className = "", setPopapp, name}: IComponentPopapp) => {
    const closePopapp = () => {
        if (setPopapp) {
            return setPopapp(pre => ({...pre, [name]: !pre[name], idx: null, title: ''}))
        } else {
            return null
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, []);

    return (
        <div className={`popapp ${className}`} onClick={() => className !== 'create' ? closePopapp() : null}>
            <div
                onClick={e => e.stopPropagation()}
                className={`popapp-container ${className}-container`}
            >
                <h2 className={'popapp-title'}>{title}</h2>
                <div onClick={closePopapp} className="popapp-cross">
                    <Cross/>
                </div>
                <div className="poppap-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Popapp;