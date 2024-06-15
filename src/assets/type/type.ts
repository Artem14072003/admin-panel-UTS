import {
    FieldArrayWithId,
    FieldError,
    FieldErrors,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    RegisterOptions, UseFieldArrayAppend, UseFieldArrayRemove, UseFormGetValues,
    UseFormRegister, UseFormResetField, UseFormSetError, UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import {BaseSyntheticEvent, Dispatch, ReactNode, SetStateAction} from "react";

export interface DateStatements {
    fullname: string;
    tel: string;
    services: string;
    desc: string;
}

type TNameStaments = "fullname" | "tel" | "services" | "desc";

export interface IAdminLayout {
    children: ReactNode;
    className?: string;
    setPopapp?: Dispatch<SetStateAction<IDataPopapp>>
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>
}

export interface ISelections {
    name: string,
    value: string
}

export interface INavigation extends Pick<IAdminLayout, "setPopapp">{
    setActive: Dispatch<SetStateAction<boolean>>;
    active: boolean
}

export interface IInputStatement {
    id: string;
    title?: string;
    type?: "textarea" | 'select' | 'calc' | 'search' | string;
    name: TNameStaments;
    option?: RegisterOptions;
    optionRang?: RegisterOptions;
    selections?: ISelections[];
    selectionsNum?: number[];
    onSubmit?: (e?: (BaseSyntheticEvent | undefined)) => Promise<void>;
    placeholder?: string;
    max?: number;
    min?: number;
    watch?: UseFormWatch<FieldValues>;
    register?: UseFormRegister<FieldValues>;
    errors?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>> | undefined
}

export interface IInput extends Omit<IInputStatement, "name"> {
    name: string;
}

export interface ILogin {
    login: string,
    image: string,
    password: string
}

export interface IDataTable {
    id: number;
    image: string;
    title: string;
    price: number
}

export interface IPagination {
    start: number;
    end: number
}

export interface ITable extends Pick<IComponentPopapp, 'setPopapp'> {
    data: IDataTable[];
    nameTable?: 'truck' | 'parts';
    isLoading: boolean;
    isNewData: boolean;
    setSearch: Dispatch<SetStateAction<boolean>>;
    pagination: IPagination;
}

export interface ILoanTerm {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    getValues: UseFormGetValues<FieldValues>,
    select?: number[],
    resetField: UseFormResetField<FieldValues>,
    setError: UseFormSetError<FieldValues>,
    setSelect?: Dispatch<SetStateAction<number[]>>
}

interface IDataCalcAndSet {
    id: string;
    name: string;
    type: string;
    title: string;
    placeholder: string;
    option: RegisterOptions
}

// interface IDataAdmin {
//
// }

export interface IDataCalc {
    maxlizing: number
    minlizing: number
    percent: number
    term: number[]
}

export interface ICalcAndSettings extends Omit<ILoanTerm, ""> {
    data: IDataCalcAndSet[];
    setSettingsCalc: (e?: (BaseSyntheticEvent<object, FieldValues, FieldValues> | undefined)) => Promise<void>
    drag?: boolean;
    watch?: UseFormWatch<FieldValues>;
    isPending: boolean;
    setValue?: UseFormSetValue<FieldValues>;
    setDrag?: Dispatch<SetStateAction<boolean>>
}

interface IDataImage {
    image: string
}

export interface ILoading {
    image?: 'truck.svg' | 'spare-parts.png' | 'calc.svg'
}

export interface IBlockImage extends Omit<ICalcAndSettings,
    'data' | 'setSettingsCalc' | 'select' | 'setSelect' | "isPending"> {
    title?: string;
    len?: number;
    watch: UseFormWatch<FieldValues> | undefined;
    idx?: number | undefined | null;
    image?: string | IDataImage[];
    required?: boolean;
}

export interface IDataPopapp {
    create: boolean;
    idx: undefined | null | number;
    title: string;
    delete: boolean
}

export interface IComponentPopapp {
    children: ReactNode;
    title: string;
    className?: string;
    setPopapp: Dispatch<SetStateAction<IDataPopapp>>;
    name: 'create' | 'delete'
}

export interface IImage extends Pick<IComponentPopapp, "title"> {
    len: number
}

export interface IColumnTwo extends Pick<IImage, "title"> {
    input: IInput
}

type ColumnItem = IImage | IInput;

export interface IColumnData {
    columOne: ColumnItem[],
    columTwo: null | IColumnTwo[];
    columThree: IInput
    articul?: IColumnTwo
}

export interface IDataTruck extends Pick<IComponentPopapp, "title" | "name"> {
    data: IColumnData;
    update: string;
    className: string;
}

export interface IDataSpareParts extends Omit<IDataTruck, ''> {
}

export interface IPopappCreate extends Pick<IComponentPopapp, "setPopapp"> {
    data: IDataTruck;
    idx?: number | null
}

export interface IPopappDelete extends Pick<IComponentPopapp, "setPopapp"> {
    popapp: IDataPopapp;
}


export interface IComponentHeader extends Pick<IComponentPopapp, "setPopapp" | "name"> {
    setNewData: Dispatch<SetStateAction<IDataTable[] | null>>
    data: IDataTable[];
    search: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    active: boolean;
    setSearch: Dispatch<SetStateAction<boolean>>
}

export interface IAdaptiveMenu {
    setActive: Dispatch<SetStateAction<boolean>>;
    active: boolean;
}

export interface IDataPopappSpareParts {
    add: { title: string; value: string }[];
    // другие свойства, если есть
}

export interface IAlert {
    time?: number;
    className?: "success" | "";
    text: string;
    isError?: boolean;
    name?: "create" | "delete";
    setPopapp?: Dispatch<SetStateAction<IDataPopapp>>;
    setIsAlert: Dispatch<SetStateAction<boolean>>
}


export interface IPopappContent extends Omit<IPopappCreate, ''> {
    resultForm: (e?: BaseSyntheticEvent<object, FieldValues, FieldValues> | undefined) => Promise<void>;
    fields: FieldArrayWithId<FieldValues, string, "id">[]
    register: UseFormRegister<FieldValues>;
    append: UseFieldArrayAppend<FieldValues, 'add'>;
    setValue: UseFormSetValue<FieldValues>;
    errors: FieldErrors<FieldValues>;
    isLoading?: boolean,
    fetchStatus?: 'fetching' | 'idle' | 'paused'
    getValues: UseFormGetValues<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    image: string | IDataImage[];
    resetField: UseFormResetField<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    isAlert: boolean;
    remove: UseFieldArrayRemove;
    isSpareParts?: boolean;
    required?: boolean;
    isPending: boolean;
}