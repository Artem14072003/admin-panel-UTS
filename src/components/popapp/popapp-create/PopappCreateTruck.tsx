import {IPopappCreate} from "../../../assets/type/type.ts";
import {FieldValues, useFieldArray, useForm} from "react-hook-form";
import PopappContent from "../popapp-content/PopappContent.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {trucksServices} from "../../../services/trucks.services.ts";
import {useEffect, useState} from "react";
import Alert from "../../../UI/alert/Alert.tsx";
import {AxiosError} from "axios";

const PopappCreateTruck = ({setPopapp, idx, data}: IPopappCreate) => {

    const {data: truck, isSuccess, fetchStatus, isLoading, isError} = useQuery({
        queryKey: ['update trucks'],
        queryFn: () => idx ? trucksServices.getTruck(idx) : null,
        retry: 0
    })

    const [isAlert, setIsAlert] = useState(false);
    const {
        register,
        formState: {errors},
        getValues,
        setValue,
        watch,
        resetField,
        setError,
        reset,
        control,
        handleSubmit
    } = useForm({
        mode: 'onBlur',
    })

    const {fields, append, remove} = useFieldArray({
        control,
        name: "add"
    });

    const queryClient = useQueryClient();

    const {mutate, isError: isFailTruck, error, isSuccess: isGoodFeatch, isPending} = useMutation({
        mutationKey: ['create-truck'],
        mutationFn: (data: FieldValues) => !idx ? trucksServices.setTruck(data) :
            trucksServices.updateTruck(idx, data),
        onSuccess: () => {
            if (!idx) {
                reset();
                setValue('image', null);
            }
            setIsAlert(true)
            queryClient.refetchQueries({queryKey: ['get trucks']})
        },
        onError: (e) => {
            console.error(e)
            setIsAlert(true)
        }
    })

    const resultForm = handleSubmit(data => {
        mutate(data)
    })

    useEffect(() => {
        if (isError) {
            return setPopapp((prev) => ({...prev, create: false}))
        }
        console.log(truck ? truck : [])
        if (!isLoading && (idx && isSuccess && truck)) {
            setValue('image', truck.swiper)
            setValue('title', truck.cardInfo[0].title)
            setValue("desc", truck.cardInfo[0].desc)
            setValue("model", truck.cardInfo[0].model)
            setValue("price", truck.cardInfo[0].price)
            data.data.columTwo?.map((option) => {
                const specifications = truck.options.find((search: {
                    title: string
                }) => search.title.includes(option.title))
                console.log(truck.options)
                if (!specifications) return
                setValue(option.input.name, specifications.value)
            })
            setValue("add", truck.add)
        }
    }, [idx, isLoading, isSuccess, isError, truck]);

    return (
        <>
            <PopappContent
                resultForm={resultForm}
                fields={fields}
                register={register}
                append={append}
                setValue={setValue}
                isLoading={isLoading}
                fetchStatus={fetchStatus}
                watch={watch}
                errors={errors}
                getValues={getValues}
                resetField={resetField}
                image={isLoading ? '' : idx && truck ? truck.swiper : ''}
                setError={setError}
                remove={remove}
                data={data}
                idx={idx}
                isSpareParts={false}
                setPopapp={setPopapp}
                isAlert={isPending}
                required={true}
                isPending={isPending}
            />
            {isAlert && <Alert
                className={isGoodFeatch ? 'success' : ''}
                text={isGoodFeatch ? `${!idx ? 'Грузовик успешно добавлен' : 'Данные о грузовике успешно изменины'}!` :
                    `${error instanceof AxiosError &&
                    error.response ? error.response.data.message : 'Что-то пошло не так!'}`
                }
                time={200}
                isError={isFailTruck}
                setPopapp={setPopapp}
                name={'create'}
                setIsAlert={setIsAlert}/>
            }
        </>
    );
};

export default PopappCreateTruck;