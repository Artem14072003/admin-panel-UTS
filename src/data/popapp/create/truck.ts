import {IDataTruck} from "../../../assets/type/type.ts";

export const dataTruck: IDataTruck = {
    title: 'Добавления грузовика',
    update: 'Изменения грузовика',
    className: "create",
    name: 'create',
    data: {
        columOne: [
            {
                title: 'Добавить фото',
                len: 10,
            },
            {
                id: "title",
                title: "Наименование",
                type: "text",
                name: "title",
                placeholder: "Введите наименование грузовика",
                option: {
                    required: "Это поле обязательно!",
                },
            }, {
                id: "price",
                title: "Цена",
                type: "number",
                name: "price",
                placeholder: "Стоймость грузовика",
                option: {
                    required: "Это поле обязательно!",
                    min: {
                        value: 1000000,
                        message: "Стоимость грузового автомобиля должна быть больше 1 000 000 рублей!"
                    },
                    max:  {
                        value: 100000000,
                        message: "Слишком большая наценка грузового автомобиля!"
                    },
                },
            }, {
                id: "model",
                title: "Модель",
                type: "select",
                name: "model",
                selections: [
                    {
                        name: "",
                        value: "Выберите модель"
                    },
                    {
                        name: "FAW",
                        value: "FAW"
                    },
                    {
                        name: "SITRAK",
                        value: "SITRAK"
                    }, {
                        name: "FOTON",
                        value: "FOTON"
                    }, {
                        name: "SHACMAN",
                        value: "SHACMAN"
                    }, {
                        name: "DONGFENG",
                        value: "DONGFENG"
                    }, {
                        name: "DAEWOO",
                        value: "DAEWOO"
                    },
                ],
                option: {
                    required: "Это поле обязательно!",
                }
            }
        ],
        columTwo: [
            {
                title: 'Год выпуска',
                input: {
                    id: "year_release",
                    type: "text",
                    name: "year_release",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Колесная формула',
                input: {
                    id: "wheel_formula",
                    type: "text",
                    name: "wheel_formula",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Мощность двигателя (л.с.)',
                input: {
                    id: "engine_power",
                    type: "text",
                    name: "engine_power",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Коробка передач',
                input: {
                    id: "transmission",
                    type: "text",
                    name: "transmission",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Топливный бак 1 (л.)',
                input: {
                    id: "fuel",
                    title: "ФИО",
                    type: "text",
                    name: "fuel",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Допустимая полная масса (кг.)',
                input: {
                    id: "weight",
                    title: "ФИО",
                    type: "text",
                    name: "weight",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Грузоподъемность (кг.)',
                input: {
                    id: "load_capacity",
                    title: "ФИО",
                    type: "text",
                    name: "load_capacity",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Модель двигателя',
                input: {
                    id: "engine_model",
                    title: "ФИО",
                    type: "text",
                    name: "engine_model",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Колесная база (мм)',
                input: {
                    id: "wheels",
                    title: "ФИО",
                    type: "text",
                    name: "wheels",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            }, {
                title: 'Гарантия',
                input: {
                    id: "guarantee",
                    title: "ФИО",
                    type: "text",
                    name: "guarantee",
                    placeholder: "Описание",
                    option: {
                        required: "Это поле обязательно!",
                    },
                }
            },
        ],
        columThree: {
            id: "description",
            title: "Описание",
            type: "textarea",
            name: "desc",
            placeholder: "Введите описание",
            option: {
                required: "Это поле обязательно!",
                minLength: {
                    value: 10,
                    message: "Описание должно состоять минимум из 10 символов"
                }
            }
        }
    }
}