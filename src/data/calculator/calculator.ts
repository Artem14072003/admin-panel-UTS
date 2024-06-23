export const calculator = {
    title: "Настройка кредитного калькулятора",
    data: [
        {
            id: 'maxlizing',
            name: 'max_lizing',
            type: 'number',
            title: 'Максимальный лизинг',
            placeholder: 'Введите минимальный лизинг',
            option: {
                max: {
                    value: 50000000,
                    message: 'Максимальный лизинг в 50 000 000 руб.'
                },
                required: 'Это поле обзятельно',
                valueAsNumber: true,
                validate: (value: number) => !isNaN(value) || 'Только для чисел!',
            }
        },
        {
            id: 'minlizing',
            name: 'min_lizing',
            type: 'number',
            title: 'Минимальный лизинг',
            placeholder: 'Введите минимальный лизинг',
            option: {
                min: {
                    value: 1000000,
                    message: `Минимальный лизинг в 1 000 000 руб.`
                },
                required: 'Это поле обзятельно',
                valueAsNumber: true,
                validate: (value: number) => !isNaN(value) || 'Только для чисел!',
            }
        },
        {
            id: 'percent',
            type: 'number',
            name: 'percent',
            title: 'Процент для лизинга',
            placeholder: 'Процент для лизинга',
            option: {
                max: {
                    value: 30,
                    message: 'Максимальная процентная ставка 30%'
                },
                min: {
                    value: 5,
                    message: `Минимальная процентная ставка 5%.`
                },
                required: 'Это поле обзятельно',
                valueAsNumber: true,
                validate: (value: number) => !isNaN(value) || 'Только для чисел!',
            }
        }
    ]
}