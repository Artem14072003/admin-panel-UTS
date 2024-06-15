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
                placeholder: "Описание",
                option: {
                    required: "Это поле обязательно!",
                },
            }, {
                id: "price",
                title: "Цена",
                type: "number",
                name: "price",
                placeholder: "Описание",
                option: {
                    required: "Это поле обязательно!",
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
            title: 'Атрибут',
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