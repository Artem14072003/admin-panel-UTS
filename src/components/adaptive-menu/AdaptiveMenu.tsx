import Button from "../../UI/button/Button.tsx";
import {IAdaptiveMenu} from "../../assets/type/type.ts";
import {memo} from "react";

const AdaptiveMenu = ({setActive, active}: IAdaptiveMenu) => {
    return (
        <>
            <div className="burger_menu">
                <Button
                    onClick={() => setActive(!active)}
                    name={"popappStatement"}
                    className={`btn-header btn-primary burger_menu-btn ${active ? 'active' : ''}`}
                >
                    <span className={'line'}/>
                </Button>
            </div>
        </>
    );
};

export default memo(AdaptiveMenu);