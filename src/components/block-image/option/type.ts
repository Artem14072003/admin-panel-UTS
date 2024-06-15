import React, {Dispatch, SetStateAction} from "react";
import {FieldValues, UseFormGetValues, UseFormResetField, UseFormSetError, UseFormSetValue} from "react-hook-form";

export interface IResetImage {
    resetField: UseFormResetField<FieldValues>;
    setBase: Dispatch<SetStateAction<string | string[]>>;
}

export interface IDelImage extends Omit<IResetImage, ""> {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    idx?: number;
    len: number;
    base: string | string[];
    setValue: UseFormSetValue<FieldValues> | undefined;
    getValues: UseFormGetValues<FieldValues>
}

export interface ITransformImage extends Pick<IDelImage, "resetField" | "setBase" | "len"> {
    file: File | undefined;
    setError: UseFormSetError<FieldValues>;
}

export interface ITransformImages extends Omit<ITransformImage, "file"> {
    files: FileList | undefined;
}

export interface IDragHandler {
    e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLLabelElement>;
    setDrag: Dispatch<SetStateAction<boolean>> | undefined
}

export interface IDropHandler extends Omit<IDelImage, "e" | "base" | "getValues"> {
    e: React.DragEvent<HTMLDivElement>;
    setDrag: Dispatch<SetStateAction<boolean>> | undefined;
    setError: UseFormSetError<FieldValues>;
}

