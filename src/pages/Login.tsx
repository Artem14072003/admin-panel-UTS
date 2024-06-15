import {FieldValues, useForm} from "react-hook-form";
import Input from "../UI/input/Input.tsx";
import {memo, useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {ILogin} from "../assets/type/type.ts";
import {AxiosError} from "axios";
import {authServices} from "../services/auth.services.ts";
import Alert from "../UI/alert/Alert.tsx";
import Button from "../UI/button/Button.tsx";
import useAuth from "../hook/useAuth.tsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        mode: "onBlur"
    })

    const [isAlert, setIsAlert] = useState(false);
    const {admin, setAdmin} = useAuth();
    const nav = useNavigate();

    const {
        mutate,
        data,
        isSuccess,
        isPending,
        error
    } = useMutation({
        mutationKey: ['get login'],
        mutationFn: (data: FieldValues) => authServices.authAdmin(data),
        onSuccess: (data: ILogin) => {
            if (setAdmin) {
                setIsAlert(true)
                localStorage.setItem('auth', JSON.stringify({login: data.login, image: data.image === '/storage/' ? null : data.image}))
                nav('/admin')
                setAdmin(localStorage.getItem('auth'))
            }
        },
        onError: (e: AxiosError<{ message: string }>) => {
            console.error(e)
            setIsAlert(true)
        }
    })

    useEffect(() => {
        if (admin !== null) {
            return nav('/admin')
        }
    }, []);

    const checkLogin = handleSubmit(data => {
        mutate(data)
    })

    return (
        <div className="login">
            <div className="container login-container">
                <h1 className={'title login-title'}>Вход в систему</h1>
                <form className={'login-form'} onSubmit={checkLogin}>
                    <Input
                        id={'login'}
                        name={'login'}
                        title={'Логин'}
                        placeholder={'Введите логин'}
                        register={register}
                        option={{required: 'Это обязательное поле!'}}
                        errors={errors['login']}
                    />
                    <Input
                        id={'password'}
                        name={'password'}
                        type={'password'}
                        title={'Пароль'}
                        placeholder={'Введите пароль'}
                        register={register}
                        option={{required: 'Это обязательное поле!'}}
                        errors={errors['password']}
                    />
                    <Button disabled={isPending || isAlert}>Войти</Button>
                </form>
            </div>
            {isAlert &&
                <Alert
                    setIsAlert={setIsAlert}
                    className={isSuccess ? 'success' : ''}
                    text={isSuccess ? `С возвращением ${data ? data.login : ''}` : error && error.response ? error?.response?.data.message : ''}
                />}
        </div>
    );
};

export default memo(Login);