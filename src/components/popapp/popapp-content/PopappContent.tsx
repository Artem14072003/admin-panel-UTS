import Popapp from "../Popapp.tsx";
import BlockImage from "../../block-image/BlockImage.tsx";
import Input from "../../../UI/input/Input.tsx";
import Button from "../../../UI/button/Button.tsx";
import {IPopappContent} from "../../../assets/type/type.ts";
import Cross from "../../../UI/icon/Cross.tsx";
import {Fragment} from "react";
import Loading from "../../loading/Loading.tsx";

const PopappContent = ({
                           setPopapp,
                           data,
                           resultForm,
                           fields,
                           register,
                           append,
                           setValue,
                           watch,
                           errors,
                           isSpareParts,
                           isLoading,
                           isPending,
                           fetchStatus,
                           getValues,
                           image,
                           idx,
                           remove,
                           resetField,
                           setError,
                           isAlert,
                           required = false
                       }: IPopappContent) =>
    <Popapp setPopapp={setPopapp} className={data.className} name={data.name}
            title={idx && idx !== 0 ? data.update : data.title}>
        {!isLoading && fetchStatus === 'idle' ? (
            <form className={'popapp_form'} onSubmit={resultForm}>
                <div className="popapp_columns">
                    <div className="popapp-one_column column">
                        {data.data.columOne.map((col, index) =>
                            'len' in col ? (
                                <BlockImage
                                    key={index}
                                    watch={watch}
                                    register={register}
                                    setValue={setValue}
                                    title={col.title}
                                    image={image}
                                    errors={errors}
                                    idx={idx}
                                    getValues={getValues}
                                    resetField={resetField}
                                    setError={setError}
                                    len={col.len}
                                    required={required}
                                />
                            ) : (
                                <Input
                                    key={index + col.id}
                                    id={col.id}
                                    title={col.title}
                                    type={col.type}
                                    name={col.name}
                                    placeholder={col.placeholder}
                                    option={col.option}
                                    register={register}
                                    selections={col.selections}
                                    errors={errors[col.name]}
                                />
                            )
                        )}
                    </div>
                    {data.data.columTwo && (
                        <div className="popapp-two_column column">
                            <h2 className={'title'}>Технические характеристики</h2>
                            {data.data.columTwo.map(({title, input}, index) => (
                                <Fragment key={input.id + index}>
                                    <div className={'technical inputs-title_value'}>
                                        <label htmlFor={input.id}>{title}</label>
                                        <Input
                                            id={input.id}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            option={input.option}
                                            register={register}
                                            // errors={errors[input.name]}
                                        />
                                    </div>
                                    {errors[input.name] &&
                                        <p className={'errors'}>{`${errors[input.name]?.message}`}</p>}
                                </Fragment>
                            ))}
                        </div>
                    )}
                    <div className="popapp-three_column column">
                        <Input
                            key={data.data.columThree.id}
                            id={data.data.columThree.id}
                            title={data.data.columThree.title}
                            type={data.data.columThree.type}
                            name={data.data.columThree.name}
                            placeholder={data.data.columThree.placeholder}
                            option={data.data.columThree.option}
                            register={register}
                            errors={errors[data.data.columThree.name]}
                        />
                        <div className="block-title_value">
                            <h2 className={'title'}>Дополнительные характеристики</h2>
                            <div className="inputs-title_value">
                                <ul>
                                    {data.data.articul && (
                                        <li>
                                            <Input
                                                id={data.data.articul.input.id}
                                                title={data.data.articul.title}
                                                type={data.data.articul.input.type}
                                                name={data.data.articul.input.name}
                                                placeholder={data.data.articul.input.placeholder}
                                                option={data.data.articul.input.option}
                                                register={register}
                                                errors={errors[data.data.articul.input.name]}
                                            />
                                        </li>
                                    )}
                                    {fields.map((item, index) => (
                                        <li key={item.id}>
                                            <input {...register(`add.${index}.title`, {
                                                required: true
                                            })} placeholder={'Наименование'}/>
                                            <input {...register(`add.${index}.value`, {
                                                required: true
                                            })} placeholder={'Значение'}/>
                                            <button type="button" onClick={() => remove(index)}><Cross/></button>

                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    type="button"
                                    onClick={() => append({title: "", value: ""})}
                                >
                                    Добавить характеристику
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Button disabled={isPending || isAlert} className={'btn-submit'}>Отправить</Button>
            </form>
        ) : (
            <Loading image={isSpareParts ? 'spare-parts.png' : 'truck.svg'}/>
        )}
    </Popapp>


export default PopappContent;