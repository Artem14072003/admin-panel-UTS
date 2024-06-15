import {useForm} from "react-hook-form";
import Input from "../../UI/input/Input.tsx";
import Button from "../../UI/button/Button.tsx";
import {useLocation} from "react-router-dom";
import {IComponentHeader} from "../../assets/type/type.ts";
import {useEffect} from "react";
import AdaptiveMenu from "../adaptive-menu/AdaptiveMenu.tsx";

const Header = ({setPopapp, search, setActive, active, setSearch, data, setNewData, name}: IComponentHeader) => {

    const {pathname} = useLocation();
    const {
        register,
        handleSubmit,
        watch,
        reset
    } = useForm();

    const searchProduct = handleSubmit((find) => setNewData(data.filter(search => isNaN(+find.search.replaceAll(' ', '')) ?
        search.title.toLowerCase().includes(find.search.toLowerCase()) : search.price <= +find.search.replaceAll(' ', ''))))


    useEffect(() => {
        if (search || watch('search') === "") {
            reset()
            setNewData(null);
            setSearch(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, watch('search')]);


    return (
        <div className={'head'}>
            <div className="container head-container">
                <Input
                    id={'search'}
                    name={'search'}
                    type={'search'}
                    register={register}
                    watch={watch}
                    option={{required: true}}
                    placeholder={'Поиск...'}
                    onSubmit={searchProduct}
                />

                <Button
                    className={'head-container_btn'}
                    onClick={() => setPopapp(prev => ({...prev, [name]: !prev[name]}))}
                >
                    {pathname === '/admin' ? 'Добавить грузовик' : 'Добавить запчасть'}
                </Button>

                <AdaptiveMenu
                    setActive={setActive}
                    active={active}
                />
            </div>
        </div>
    );
};

export default Header;