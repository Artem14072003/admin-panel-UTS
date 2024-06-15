import AdminLayout from "../layout/AdminLayout.tsx";
import CalcAndSettings from "../components/form/calc-and-settings/CalcAndSettings.tsx";
import {FieldValues, useForm} from "react-hook-form";
import {settings} from "../data/settings/settings.ts";
import {useEffect, useState} from "react";
import {authServices} from "../services/auth.services.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Alert from "../UI/alert/Alert.tsx";
import {AxiosError} from "axios";
import AdaptiveMenu from "../components/adaptive-menu/AdaptiveMenu.tsx";

const Settings = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        getValues,
        resetField,
        setValue,
        formState: {
            errors,
        },
    } = useForm({
        mode: "onBlur"
    })

    const queryClient = useQueryClient();
    const [isAlert, setIsAlert] = useState(false);
    const [active, setActive] = useState(false);

    const {mutate, error, isSuccess, isPending} = useMutation({
        mutationKey: ['set_calc'],
        mutationFn: (data: FieldValues) => authServices.update(data),
        onSuccess: (data: FieldValues) => {
            if (!isAlert) {
                queryClient.refetchQueries({queryKey: ['navigation']})
            }
            setIsAlert(true)
            localStorage.setItem('auth', JSON.stringify({login: data.login, image: data.image}))
        },
        onError: (e) => {
            console.error(e)
            setIsAlert(true)
        }
    })

    console.log()

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('auth') as string)
        setValue('login', data.login)
        if (data.image) {
            setValue('image', 'http://localhost:8000' + data.image)
        }
    }, []);

    const [drag, onDrag] = useState(false)

    const setSettingsCalc = handleSubmit((data) => {
        if (data.image === '') setValue('image', null)
        mutate({...data, image: getValues('image')})
    })

    return (
        <AdminLayout active={active} setActive={setActive} className={'settings'}>
            <div className="container settings-container">
                <AdaptiveMenu setActive={setActive} active={active}/>
                <h1 className="title settings-title">
                    {settings.title}
                </h1>
                <CalcAndSettings
                    data={settings.data}
                    setSettingsCalc={setSettingsCalc}
                    register={register}
                    errors={errors}
                    isPending={isPending}
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    drag={drag}
                    setDrag={onDrag}
                    resetField={resetField}
                    setError={setError}
                />
                {isAlert && <Alert
                    className={isSuccess ? 'success' : ''}
                    text={isSuccess ? 'Данные об админе обновлены!' :
                        `${error instanceof AxiosError &&
                        error.response ? error.response.data.message : 'Что-то пошло не так!'}`
                    }
                    time={200}
                    setIsAlert={setIsAlert}/>
                }
            </div>
        </AdminLayout>
    );
};

export default Settings;