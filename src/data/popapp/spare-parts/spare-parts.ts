import {IDataSpareParts} from "../../../assets/type/type.ts";

export const dataSpareParts: IDataSpareParts = {
    title: 'Добавление запчасти',
    update: 'Изменения запчасти',
    className: "spare-parts",
    name: 'create',
    data: {
        columOne: [
            {
                title: 'Добавить фото',
                len: 1,
            },
            {
                id: "title",
                title: "Наименование",
                type: "text",
                name: "title",
                placeholder: "Введите наименования запчасти",
                option: {
                    required: "Это поле обязательно!",
                },
            }, {
                id: "price",
                title: "Цена",
                type: "number",
                name: "price",
                placeholder: "Введите стоймость запчасти",
                option: {
                    required: "Это поле обязательно!",
                    min: {
                        value: 1000,
                        message: "Введите корректную сумму для запчасти!"
                    },
                    max: {
                        value: 1000000,
                        message: "Слишком большая наценка для запчасти!"
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
        columTwo: null,
        columThree: {
            id: "description",
            title: "Описание",
            type: "textarea",
            name: "description",
            placeholder: "Введите описание",
            option: {
                required: "Это поле обязательно!",
                minLength: {
                    value: 10,
                    message: "Описание должно состоять минимум из 10 символов"
                }
            }
        },
        articul: {
            title: 'Артикул',
            input: {
                id: "articul",
                type: "text",
                name: "articul",
                placeholder: "Введите артикул товара!",
                option: {
                    required: "Это поле обязательно!",
                },
            }
        }
    }
}