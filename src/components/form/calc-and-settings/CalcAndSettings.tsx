import Input from "../../../UI/input/Input.tsx";
import LoanTerm from "../../loan-term/LoanTerm.tsx";
import Button from "../../../UI/button/Button.tsx";
import {useLocation} from "react-router-dom";
import {ICalcAndSettings} from "../../../assets/type/type.ts";
import BlockImage from "../../block-image/BlockImage.tsx";

const CalcAndSettings = ({
                             setSettingsCalc,
                             data,
                             register,
                             errors,
                             getValues,
                             select,
                             setValue,
                             drag,
                             isPending,
                             setDrag,
                             watch,
                             setError,
                             resetField,
                             setSelect
                         }: ICalcAndSettings) => {
    const {pathname} = useLocation();

    return (
        <form
            encType="multipart/form-data"
            className={`${pathname === '/admin/calculators' ? 'calculator-form' : 'settings-form'} form-calc_setting`}
            onSubmit={setSettingsCalc}
        >
            {data.map((item) => (
                <Input
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    title={item.title}
                    placeholder={item.placeholder}
                    register={register}
                    errors={errors[item.name]}
                    option={item.option}
                />
            ))}
            {pathname === '/admin/calculators' ? (
                <LoanTerm
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    select={select}
                    setError={setError}
                    resetField={resetField}
                    setSelect={setSelect}
                />
            ) : (
                <BlockImage
                    watch={watch}
                    drag={drag}
                    register={register}
                    setValue={setValue}
                    setDrag={setDrag}
                    errors={errors}
                    resetField={resetField}
                    getValues={getValues}
                    setError={setError}
                />
            )
            }
            <Button disabled={isPending} className={'btn-submit'}>Сохранить</Button>
        </form>
    )
        ;
};

export default CalcAndSettings;