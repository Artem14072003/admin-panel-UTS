import {useMutation, useQuery} from "@tanstack/react-query";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hook/useAuth.tsx";
import {authServices} from "../../services/auth.services.ts";
import data from '../../data/nav.json'
import {INavigation} from "../../assets/type/type.ts";
import Cross from "../../UI/icon/Cross.tsx";
import Button from "../../UI/button/Button.tsx";

const navigations = data.nav

const Navigation = ({active, setPopapp, setActive}: INavigation) => {
    const {setAdmin} = useAuth();
    const {pathname} = useLocation();
    const nav = useNavigate();

    const {data: admin, isLoading} = useQuery({
        queryKey: ['navigation'],
        queryFn: () => authServices.getUser(),
    })

    const {mutate} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authServices.logout(),
        onSuccess: () => {
            if (!setAdmin) return
            localStorage.removeItem('auth')
            setAdmin(null)
            nav('/')
        }
    })

    const openPopapp = () => {
        if (pathname === '/admin/spare-parts') setActive(false)
        return setPopapp ? setPopapp(prev => ({...prev, create: true})) : null
    }

    return (
        <nav className={`navigation ${active ? 'active' : ''}`}>
            <Button
                onClick={() => setActive(false)}
                className={'btn-primary close'}
            >
                <Cross/>
            </Button>
            <div className="navigation-content">
                <div className="logo">
                    {!isLoading ? (
                        <img
                            src={admin.image ? 'http://localhost:8000' + admin.image : '/image/no_image.jpeg'}
                            alt={admin.login} draggable={false}/>
                    ) : <div className={'isLoading'}/>}
                </div>
                <ul className={'nav-links'}>
                    {navigations.map(nav => (
                        <li className={'nav-link'} key={nav.to}>
                            <Link className={`link ${pathname === nav.to ? 'active' : ''}`}
                                  to={nav.to}>{nav.name}</Link>
                        </li>
                    ))}
                    <li className={'nav-link nav-wrapper_btn'}>
                        {(pathname === '/admin' || pathname === '/admin/spare-parts') && (
                            <Button
                                className={'head-container_btn nav-btn'}
                                onClick={openPopapp}
                            >
                                {pathname === '/admin' ? 'Добавить грузовик' : 'Добавить запчасть'}
                            </Button>
                        )}
                    </li>
                </ul>
            </div>
            <button onClick={() => mutate()}>Выход</button>
        </nav>
    );
};

export default Navigation;