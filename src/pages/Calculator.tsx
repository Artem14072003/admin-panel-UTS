import {useEffect, useState} from "react";
import AdminLayout from "../layout/AdminLayout.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {calculator} from "../data/calculator/calculator.ts";
import CalcAndSettings from "../components/form/calc-and-settings/CalcAndSettings.tsx";
import Alert from "../UI/alert/Alert.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {calcServices} from "../services/calc.services.ts";
import Loading from "../components/loading/Loading.tsx";
import AdaptiveMenu from "../components/adaptive-menu/AdaptiveMenu.tsx";

const Calculator = () => {

    const {data, isLoading} = useQuery({
        queryKey: ['get_calc'],
        queryFn: () => calcServices.getCalc()
    });

    const queryClient = useQueryClient()
    const [active, setActive] = useState(false);

    const {mutate, isSuccess, isPending} = useMutation({
        mutationKey: ['set_calc'],
        mutationFn: (data: FieldValues) => calcServices.setTruck(data),
        onSuccess: () => {
            queryClient.refetchQueries({queryKey: ['get_calc']})
            setIsAlert(true)
        },
        onError: (e) => {
            setIsAlert(true)
            console.error(e)
        }
    })

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        getValues,
        resetField,
        formState: {
            errors,
        },
    } = useForm({
        mode: "onBlur"
    })


    const [select, setSelect] = useState<number[]>([]);

    const [isAlert, setIsAlert] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setValue('max_lizing', data?.data[0].maxlizing)
            setValue('min_lizing', data?.data[0].minlizing)
            setValue('percent', data?.data[0].percent)
            setSelect(data?.data[0].term)
        }
    }, [isLoading, data]);

    const setSettingsCalc = handleSubmit((data) => {
        if (!select.length) return setError('selected', {type: 'required', message: 'Это поле обязательно'})
        console.log({...data, term: JSON.stringify(select)})
        mutate({...data, term: JSON.stringify(select)})
    })

    return (
        <AdminLayout setActive={setActive} active={active} className={'calculator'}>
            <AdaptiveMenu setActive={setActive} active={active}/>
            <div className="container calculator-container">
                <h1 className="title calculator-title">
                    {calculator.title}
                </h1>
                {isLoading ? (
                    <Loading image={'calc.svg'}/>
                ) : (
                    <CalcAndSettings
                        data={calculator.data}
                        setSettingsCalc={setSettingsCalc}
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        select={select}
                        isPending={isPending}
                        resetField={resetField}
                        setError={setError}
                        setSelect={setSelect}
                    />
                )}
            </div>
            {isAlert && <Alert
                className={isSuccess ? 'success' : ''}
                text={isSuccess ? 'Лизинг обнавлён!' : `Что-то пошло не так!`}
                time={200}
                setIsAlert={setIsAlert}/>
            }
        </AdminLayout>
    );
};

export default Calculator;