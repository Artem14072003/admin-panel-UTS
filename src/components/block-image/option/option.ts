import {IDelImage, IDragHandler, IDropHandler, IResetImage, ITransformImage, ITransformImages} from "./type.ts";

const resetImage = ({resetField, setBase}: IResetImage) => {
    resetField('image')
    setBase('')
}

export const delImage = ({e, idx, len, base, setValue, getValues, setBase, resetField}: IDelImage) => {
    e.preventDefault()
    if (len > 1 && Array.isArray(base)) {
        if (!setValue) return
        const images: File[] | FileList = getValues('image')

        const newBase = base.filter((_, id) => id !== idx)
        const newImage = Array.isArray(images) ? images.filter((_, id) => id !== idx) :
            Object.assign({}, ...Object.entries(images).filter((_, id) => id !== idx)
                .map(item => ({[item[0]]: item[1]})))

        setBase(newBase)
        return setValue('image', !Object.keys(newImage).length ? null : newImage)
    }

    resetField('image')
    return setBase('')
}

export const transformImage = ({file, resetField, setBase, setError, len}: ITransformImage) => {
    if (!file)
        return resetImage({resetField, setBase})

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        resetField('image')
        return setError('image', {type: 'pattern', message: 'Для типов только image или png.'})
    }

    const read = new FileReader();
    read.onloadend = () => {
        if (len === 1) {
            setBase(read.result as string)
        } else {
            setBase(prev => [...prev, read.result as string])
        }
    }

    read.readAsDataURL(file)
}

export const transformImages = ({files, resetField, setBase, len, setError}: ITransformImages) => {
    if (!files?.length)
        return resetImage({resetField, setBase})

    if (files.length > len) {
        resetField('image');
        return setError('image', {type: 'validate', message: `Не больше ${len} файла`})
    }

    Object.entries(files).map((_, idx) => {
        const file = files[idx];
        if (!file) return

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            resetField('image')
            return setError('image', {type: 'pattern', message: 'Для типов только image или png.'})
        }

        const read = new FileReader();
        read.onloadend = () => {
            setBase(prev => [...prev, read.result as string])
        }

        read.readAsDataURL(file)
    })
}

export const dragStartHandler = ({e, setDrag}: IDragHandler) => {
    if (!setDrag) return
    e.preventDefault()
    setDrag(true)
}

export const dragLeaveHandler = ({e, setDrag}: IDragHandler) => {
    if (!setDrag) return
    e.preventDefault()
    setDrag(false)
}

export const onDropHandler = ({e, setBase, setValue, setDrag, len, setError, resetField}: IDropHandler) => {
    e.preventDefault()
    if (!setValue || !setDrag) return

    setDrag(false)
    const files: File[] = [...e.dataTransfer.files];

    if (len === 1) {
        const file: File = e.dataTransfer.files[0]

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return setError('image', {type: 'pattern', message: 'Для типов только image или png.'})
        }

        return transformImage({file, resetField, setBase, setError, len})
    }

    if (files.length > len) {
        resetField('image');
        return setError('image', {type: 'validate', message: `Не больше ${len} файла`})
    }

    files.map((file) => {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            return setError('image', {type: 'pattern', message: 'Для типов только image или png.'})
        }

        transformImage({file, resetField, setBase, setError, len})
    })
}
