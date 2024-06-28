import {AxiosError} from 'axios';

// 1. Нужно доставать из axios оригинальный текст ошибки с бэкенда, а не обертку
// 2. Сразу учитываем тип unknown из редьюсеров
const extractErrorText = (error: AxiosError | Error | unknown) => {

    if (error instanceof AxiosError) {
        return error?.response?.data?.message || error.message
    }
    if (error instanceof Error) {
        return error.message
    }
    return 'Неизвестная ошибка'

}

export default extractErrorText