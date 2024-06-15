import {IPopappCreate} from "../../../assets/type/type.ts";
import {FieldValues, useFieldArray, useForm} from "react-hook-form";
import PopappContent from "../popapp-content/PopappContent.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {sparePartsServices} from "../../../services/spare_parts.services.ts";
import {useEffect, useState} from "react";
import Alert from "../../../UI/alert/Alert.tsx";
import {AxiosError} from "axios";

const PopappCreateSpareParts = ({setPopapp, idx, data}: IPopappCreate) => {

    const {data: sparePart, isSuccess, fetchStatus, isLoading, isError} = useQuery({
        queryKey: ['get spare-part'],
        queryFn: () => idx ? sparePartsServices.getSparePart(idx) : null,
        retry: 0,
        enabled: !!idx,
    })

    const [isAlert, setIsAlert] = useState(false);
    const {
        register,
        formState: {errors},
        getValues,
        setValue,
        resetField,
        setError,
        watch,
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
    useEffect(() => {
        if (isError) {
            return setPopapp((prev) => ({...prev, create: false, idx: null}))
        }

        if (!isLoading && (idx && isSuccess && sparePart)) {
            setValue('image', sparePart.image)
            setValue('description', sparePart.description)
            setValue('title', sparePart.title)
            setValue('model', sparePart.model)
            setValue('price', sparePart.price)
            setValue('articul', sparePart.articul)
            setValue('add', sparePart.option)
        }

    }, [idx, isLoading, isSuccess, isError, sparePart]);

    const {mutate, isPending, isError: isFailSparePart, error, isSuccess: isGoodFeatch} = useMutation({
        mutationKey: ['update spare-part'],
        mutationFn: (data: FieldValues) => !idx ? sparePartsServices.setSparePart(data) :
            sparePartsServices.updateSparePart(idx, data),
        onSuccess: () => {
            if (!idx) {
                reset();
                setValue('image', null);
            }
            setIsAlert(true)
            queryClient.refetchQueries({queryKey: ['get spare-parts']})
        },
        onError: (e) => {
            setIsAlert(true)
            console.error(e)
        }
    })

    const resultForm = handleSubmit(data => {
        mutate(data)
    })

    return (
        <>
            <PopappContent
                resultForm={resultForm}
                fields={fields}
                isPending={isPending}
                register={register}
                append={append}
                watch={watch}
                setValue={setValue}
                image={isLoading ? '' : idx && sparePart ? sparePart.image : ''}
                errors={errors}
                isLoading={isLoading}
                fetchStatus={fetchStatus}
                getValues={getValues}
                resetField={resetField}
                setError={setError}
                remove={remove}
                isSpareParts={true}
                data={data}
                isAlert={isAlert}
                idx={idx}
                setPopapp={setPopapp}
                required={true}
            />
            {isAlert && <Alert
                className={isGoodFeatch ? 'success' : ''}
                text={isGoodFeatch ? `${!idx ? 'Запчасть успешно добавлена' : 'Данные о запчасти успешно изменины'}!` :
                    `${error instanceof AxiosError &&
                    error.response ? error.response.data.message : 'Что-то пошло не так!'}`
                }
                time={200}
                isError={isFailSparePart}
                setPopapp={setPopapp}
                name={'create'}
                setIsAlert={setIsAlert}/>
            }
        </>
    );
};

export default PopappCreateSpareParts;