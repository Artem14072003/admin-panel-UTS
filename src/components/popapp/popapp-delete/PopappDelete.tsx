import Popapp from "../Popapp.tsx";
import {IPopappDelete} from "../../../assets/type/type.ts";
import Button from "../../../UI/button/Button.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {trucksServices} from "../../../services/trucks.services.ts";
import {useLocation} from "react-router-dom";
import {sparePartsServices} from "../../../services/spare_parts.services.ts";
import {useState} from "react";
import Alert from "../../../UI/alert/Alert.tsx";
import {AxiosError} from "axios";


const PopappDelete = ({setPopapp, popapp}: IPopappDelete) => {

    const closeDelete = () => setPopapp(prev => ({...prev, delete: false, idx: null, title: ''}))
    const {pathname} = useLocation();
    const [isAlert, setIsAlert] = useState(false);
    const queryClient = useQueryClient()

    const {mutate, isPending, isSuccess, error} = useMutation({
        mutationKey: ['del truck'],
        mutationFn: () => pathname === '/admin' ?
            trucksServices.delTruck(popapp.idx as number) :
            sparePartsServices.delSparePart(popapp.idx as number),
        onSuccess: () => {
            pathname === '/admin' ? queryClient.refetchQueries({queryKey: ['get trucks']}) :
                queryClient.refetchQueries({queryKey: ['get spare-parts']});
            setIsAlert(true)
        },
        onError: (e) => {
            console.error(e)
            setIsAlert(true)
        }
    })

    return (
        <>
            <Popapp setPopapp={setPopapp} className={'delete'} name={'delete'}
                    title={`Вы точно хотите удалить товар: ${popapp.title}?`}>
                <Button disabled={isPending || isAlert} onClick={() => mutate()}>Удалить</Button>
                <Button onClick={closeDelete} className={'btn-primary'}>Отменить</Button>
            </Popapp>
            {isAlert && <Alert
                className={isSuccess ? 'success' : ''}
                text={isSuccess ? `Данные о ${pathname === '/admin' ? 'грузовике' : 'запчасти'} успешно удалены!` :
                    `${error instanceof AxiosError &&
                    error.response ? error.response.data.message : 'Что-то пошло не так!'}`
                }
                time={200}
                isError={!isSuccess}
                setPopapp={setPopapp}
                name={'delete'}
                setIsAlert={setIsAlert}/>
            }
        </>
    );
};

export default PopappDelete;