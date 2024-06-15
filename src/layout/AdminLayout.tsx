import Navigation from "../components/navigation/Navigation.tsx";
import {useEffect} from "react";
import useAuth from "../hook/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {IAdminLayout} from "../assets/type/type.ts";

const AdminLayout = ({children, className, setPopapp, active, setActive}: IAdminLayout) => {
    const {admin} = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        if (!admin) return nav('/');
    }, []);

    useEffect(() => {
        console.log(window.innerWidth);
        if (active && window.innerWidth <= 768)
            document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [active]);

    return (
        <>
            <Navigation setPopapp={setPopapp} setActive={setActive} active={active}/>
            <main className={className}>
                {children}
            </main>
        </>
    );
};

export default AdminLayout;