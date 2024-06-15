import { useEffect, useRef} from "react";
import {IAlert} from "../../assets/type/type.ts";


const Alert = ({text, setIsAlert, setPopapp, isError, name, className = "", time = 400}: IAlert) => {
    const refLine = useRef<HTMLDivElement>(null);
    const refParent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentTime = 0;
        const opacityTime = 10;
        const intervalId = setInterval(() => {
            currentTime++;
            if (refLine.current && refParent.current) {
                const percentageLeft = 100 - (currentTime / time) * 100;
                refLine.current.style.transform = `translateX(${percentageLeft}%)`;
                if(percentageLeft <= opacityTime) {
                    refParent.current.style.opacity = `${percentageLeft / opacityTime}`
                }
            }
            if (currentTime >= time) {
                if (setPopapp && name && !isError) {
                    setPopapp(prev => ({...prev, [name]: !prev[name], idx: null}))
                }
                setIsAlert(false)
                clearInterval(intervalId);
            }
        }, 10);

        return () => clearInterval(intervalId);
    }, [setIsAlert, time])

    return (
        <div ref={refParent} className={`alert alert-${className}`}>
            <div className={`alert-container`}>
                <p>{text}</p>
            </div>
            <div ref={refLine} className={`alert-line alert-line_${className}`}/>
        </div>
    );
};

export default Alert;