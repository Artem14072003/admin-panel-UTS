import {useEffect, useState} from "react";
import {IBlockImage} from "../../assets/type/type.ts";
import {
    delImage,
    dragLeaveHandler,
    dragStartHandler,
    onDropHandler,
    transformImage,
    transformImages
} from "./option/option.ts";
import Dell from "../../UI/icon/Dell.tsx";

const BlockImage = ({
                        len = 1,
                        setValue,
                        title = "Выберете изображение",
                        setError,
                        resetField,
                        getValues,
                        idx,
                        errors,
                        watch,
                        image,
                        register,
                        required = false
                    }: IBlockImage) => {

    const [base, setBase] = useState<string | string[]>('');
    const [drag, setDrag] = useState(false)
    const [mouse, setMouse] = useState<null | number>(null)

    useEffect(() => {
        if (Array.isArray(image)) {
            const newImage = image.map(item => item.image.toString())
            return setBase(newImage)
        }

        if (getValues('image')) {
            return setBase(getValues('image'))
        }

        if (image)
            return setBase(image)

        return () => {
            if (idx) {
                setBase('')
            }
        }
    }, [getValues, image, idx, setValue]);

    useEffect(() => {
        if (watch && watch('image') === null) {
            setBase('')
        }
        if (!setValue) return
        setValue('image', Array.isArray(base) ? [...base] : base)
    }, [base, watch && watch('image')]);

    return (
        <div
            className={`block-image ${typeof base === 'string' && base !== '' || Array.isArray(base) && base.length ? 'active' : ''}`}
        >
            {base && base.length ? (
                <>
                    {len > 1 && Array.isArray(base) ? (
                        (base.map((image, idx) => (
                            <div
                                onMouseEnter={() => setMouse(idx)}
                                onMouseLeave={() => setMouse(null)}
                                className={`block-image_wrapper block-image_del ${mouse === idx ? 'active' : ''}`}
                                key={image + idx}>
                                <img className={'block-image_img'} src={image} alt="avatar"/>
                                <div className="wrapper_del">
                                    <button onClick={(e) =>
                                        delImage({
                                            e,
                                            idx,
                                            len,
                                            base,
                                            setValue,
                                            getValues,
                                            setBase,
                                            resetField
                                        })}><Dell/>
                                    </button>
                                </div>
                            </div>
                        )))
                    ) : (
                        <div
                            onMouseEnter={() => setMouse(1)}
                            onMouseLeave={() => setMouse(null)}
                            className={`block-image_wrapper block-image_del ${mouse ? 'active' : ''}`}
                        >
                            <img className={'block-image_img'} src={base as string} alt="avatar"/>
                            <div className="wrapper_del">
                                <button onClick={(e) => delImage({
                                    e,
                                    len,
                                    base,
                                    setValue,
                                    getValues,
                                    setBase,
                                    resetField
                                })}><Dell/>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : drag ? (
                <>
                    <div
                        className={'block-image_wrapper'}
                        onDragStart={e => dragStartHandler({e, setDrag})}
                        onDragLeave={e => dragLeaveHandler({e, setDrag})}
                        onDragOver={e => dragStartHandler({e, setDrag})}
                        onDrop={e => onDropHandler({
                            e,
                            setBase,
                            setValue,
                            setDrag,
                            len,
                            setError,
                            resetField
                        })}
                    >Отпустите файлы что бы увидеть их
                    </div>
                    {errors['image'] &&
                        <p className={'errors'}>{`${errors['image'].message}`}</p>
                    }
                </>
            ) : (
                <>
                    <label
                        className={'block-image_wrapper'}
                        onDragStart={e => dragStartHandler({e, setDrag})}
                        onDragLeave={e => dragLeaveHandler({e, setDrag})}
                        onDragOver={e => dragStartHandler({e, setDrag})}
                    >
                        {title}
                        {len > 1 && <span>Можно добавить от 1 до {len} фото</span>}
                        <input type="file" {...register('image', {
                            required: required ? 'Это поле обязательно!' : required,
                            validate: (data: File[]) => data === null || data.length === 0 ? true : data.length > len ? `Не больше ${len} файлов` :
                                (data[0].type !== 'image/png' && data[0].type !== 'image/jpeg') ?
                                    'Для типов только image или png.' : true,
                            onChange: (e) => len === 1 ? transformImage({
                                file: e.target.files[0],
                                resetField,
                                setBase,
                                setError,
                                len
                            }) : transformImages({
                                files: e.target.files,
                                resetField,
                                setBase,
                                len,
                                setError
                            })
                        })} multiple={len > 1}/>
                    </label>
                    {errors['image'] &&
                        <p className={'errors'}>{`${errors['image'].message}`}</p>
                    }
                </>
            )
            }
        </div>
    );
};

export default BlockImage;