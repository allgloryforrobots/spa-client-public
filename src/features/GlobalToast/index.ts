import {createStandaloneToast, UseToastOptions} from '@chakra-ui/react'

const { ToastContainer, toast } = createStandaloneToast()

function createToast(params: UseToastOptions | string | undefined): void {

    if (!params || typeof params === 'string') {
        toast({
            title: params || 'Что-то пошло не так',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top'
        })
    } else {
        if (!params.title) params.title = 'Неизвестная ошибка'
        if (!params.status) params.status = 'error'
        if (!params.duration) params.duration = 9000
        if (!params.isClosable) params.isClosable = true
        if (!params.position) params.position = 'top'
        toast(params)
    }

}

export {
    ToastContainer,
    createToast
}