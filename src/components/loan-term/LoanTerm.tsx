import Input from "../../UI/input/Input.tsx";
import Button from "../../UI/button/Button.tsx";
import {ILoanTerm} from "../../assets/type/type.ts";
import Cross from "../../UI/icon/Cross.tsx";

const LoanTerm = ({register, errors, resetField, getValues, select, setError, setSelect}: ILoanTerm) => {

    const setData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!select || !setSelect) return

        e.preventDefault()
        const selected = +getValues('selected');

        if (!selected) return setError('selected', {
            type: 'required',
            message: 'Это поле обязательно'
        });
        else if (isNaN(selected)) return setError('selected', {
            type: 'pattern',
            message: 'Это числовое поле'
        }); else if (select.includes(selected)) return setError('selected', {
            type: 'pattern',
            message: 'Такое значение уже есть!'
        });

        setSelect(prev => [...prev, selected])
        resetField('selected')
    }

    const removeChild = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
        if (!select || !setSelect) return
        e.preventDefault()
        const arr = select.filter((item) => item !== idx);
        return setSelect(arr)
    }

    return select && (
        <div className={'loanTerm'}>
            <div className="loanTerm-panel">
                <Input
                    id={'selected'}
                    type={'number'}
                    name={'selected'}
                    title={'Срок кредита'}
                    placeholder={'Введите срок кредита в месяцах'}
                    register={register}
                    errors={errors['selected']}
                />
                <Button
                    className={'btn'}
                    onClick={(e) => setData(e)}
                >
                    Добавить
                </Button>
            </div>
            <div className="loanTerm-buttons">
                {select
                    .sort((a: number, b: number) => a - b)
                    .map((button) => (
                    <Button
                        className={'btn-primary'}
                        onClick={(e) => removeChild(e, button)} key={button}
                    >
                        {button}
                        <Cross />
                    </Button>
                ))}
            </div>

        </div>
    );
};

export default LoanTerm;