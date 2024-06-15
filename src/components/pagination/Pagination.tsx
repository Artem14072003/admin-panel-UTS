import {Dispatch, memo, SetStateAction, useMemo, useState} from "react";
import Button from "../../UI/button/Button.tsx";
import ArrowPagination from "../../UI/icon/ArrowPagination.tsx";
import {IPagination} from "../../assets/type/type.ts";

const Pagination = ({len, setPagination}: { len: number, setPagination: Dispatch<SetStateAction<IPagination>>}) => {
    const [active, setActive] = useState(1);

    const getRange = useMemo(() => {
        const maxButtons = len <= 2 ? len : 3;
        let start = Math.max(1, active - Math.floor(maxButtons / 2));
        let end = start + maxButtons - 1;

        if (end > len) {
            end = len;
            start = end - maxButtons + 1;
        }
        return Array.from({length: end - start + 1}, (_, idx) => start + idx);
    }, [active, len]);

    const handleClick = (idx: number) => {
        console.log(idx)
        setActive(idx);
        setPagination({start: idx - 1, end: idx})
    };

    return (
        <div className="pagination">
            <div className="container pagination-container">
                <div className="pagination-wrapper">
                    <Button
                        className={'btn-arrow btn-primary'}
                        onClick={() => handleClick(active - 1)}
                        disabled={active === 1}
                    >
                        <ArrowPagination/>
                    </Button>
                    <div className="pagination-content">
                        {active >= 3 && (
                            <>
                                <button onClick={() => handleClick(1)} disabled={active === 1}>
                                    1
                                </button>
                                <span>...</span>
                            </>
                        )}
                        {getRange.map((idx) => (
                            <button
                                key={idx}
                                className={active === idx ? "active" : ""}
                                onClick={() => handleClick(idx)}
                            >
                                {idx}
                            </button>
                        ))}
                        {len - 2 >= active && (
                            <>
                                <span>...</span>
                                <button onClick={() => handleClick(len)} disabled={active === len}>
                                    {len}
                                </button>
                            </>
                        )}
                    </div>
                    <Button
                        className={'btn-arrow btn-primary'}
                        onClick={() => handleClick(active + 1)}
                        disabled={active === len}
                    >
                        <ArrowPagination/>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default memo(Pagination);