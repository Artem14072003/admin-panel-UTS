export const settings = {
    title: "Редактировать профиль",
    data: [
        {
            id: 'login',
            name: 'login',
            type: 'text',
            title: 'Изменить логин',
            placeholder: 'Введите новый логин',
            option: {
                required: 'Это поле обзятельно',
            }
        },
        {
            id: 'oldPassword',
            name: 'oldPassword',
            type: 'password',
            title: 'Введите старый пароль',
            placeholder: 'Введите старый парольг',
            option: {
                required: 'Это поле обзятельно',
            }
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            title: 'Введите новый пароль',
            placeholder: 'Введите новый пароль',
            option: {
                required: 'Это поле обзятельно',
                minLength: {
                    value: 6,
                    message: "Минимум 6 символов"
                }
            }
        }
    ]
}