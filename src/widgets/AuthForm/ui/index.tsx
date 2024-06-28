import React, {FC, useState} from 'react'
import { Link } from 'react-router-dom'
import isEmail from 'validator/es/lib/isEmail'

import styles from './index.module.scss'
import {passwordService} from 'shared/services'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react'
import {copyToBuffer} from "shared/utils/copy"
import {clientDownload} from "shared/utils/download"
import {LOGIN_PAGE_PATH, REGISTER_PAGE_PATH} from 'shared/constants'
import {login, register} from 'features/Auth'
import {LoadingStatusEnum} from 'shared/types'
import {AppDispatch, useAppDispatch, useAppSelector} from 'app/store'
import {createToast} from 'features/GlobalToast'

type AuthFormProps = {
    isLogin: boolean
}

export const AuthForm: FC<AuthFormProps> = ({isLogin}) => {

    const dispatch = useAppDispatch<AppDispatch>()
    const status = useAppSelector((state) => state.auth.status)
    let loading = status === LoadingStatusEnum.LOADING
    const isRegister = !isLogin
    const {isOpen, onOpen, onClose} = useDisclosure()
    let [showPwdInModal, setShowPwdInModal] = useState<boolean>(false)
    let [email, setEmail] = useState<string>('')
    let [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(true)
    let [emailErrorMsg, setEmailErrorMsg] = useState<string>('Заполните поле')
    let [userName, setUserName] = useState<string>('')
    let [userNameIsInvalid, setUserNameIsInvalid] = useState<boolean>(true)
    let [userNameErrorMsg, setUserNameErrorMsg] = useState<string>('Введите имя пользователя')
    let [password, setPassword] = useState<string>('')
    let [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(true)
    let [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('Введите пароль')
    let [passwordRepeat, setPasswordRepeat] = useState<string>('')
    let [passwordRepeatIsInvalid, setPasswordRepeatIsInvalid] = useState<boolean>(true)
    let [passwordRepeatErrorMsg, setPasswordRepeatErrorMsg] = useState<string>('Повторите пароль')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const showPasswordClick = () => setShowPassword(!showPassword)
    const [showPasswordRepeat, setShowPasswordRepeat] = useState<boolean>(false)
    const showPasswordClickRepeat = () => setShowPasswordRepeat(!showPasswordRepeat)

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEmail(value)
        const isValid = isEmail(value)
        setEmailIsInvalid(!isValid)
        if (!isValid) setEmailErrorMsg('Введите корректный email')
        else setEmailErrorMsg('')
    }

    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setUserName(value)

        if (value) {
            setUserNameIsInvalid(false)
            setUserNameErrorMsg('')
        } else {
            setUserNameIsInvalid(true)
            setUserNameErrorMsg('Введите имя пользователя')
        }
    }

    const setPasswordMatch = (p: string, pr: string) => {
        if (p === pr) {
            setPasswordRepeatIsInvalid(false)
            setPasswordRepeatErrorMsg('')
        } else {
            setPasswordRepeatIsInvalid(true)
            setPasswordRepeatErrorMsg('Повторите пароль')
        }
    }

    const onPasswordRepeatChange = (value: string) => {
        setPasswordRepeat(value)
        setPasswordMatch(password, value)
    }

    const onPasswordChange = (value: string) => {
        setPassword(value)
        if (isRegister) {
            if (passwordService.isSecurePassword(value)) {
                setPasswordIsInvalid(false)
                setPasswordErrorMsg('')
            } else {
                setPasswordIsInvalid(true)
                setPasswordErrorMsg(passwordService.passwordTooltip())
            }
            setPasswordMatch(value, passwordRepeat)
        } else {
            if (value) {
                setPasswordIsInvalid(false)
                setPasswordErrorMsg('')
            } else {
                setPasswordIsInvalid(true)
                setPasswordErrorMsg('Введите пароль')
            }
        }
    }

    // разблокируем кнопку Зарегистрироваться
    let registerBlocked = true
    if (!emailIsInvalid && !userNameIsInvalid && !passwordIsInvalid && !passwordRepeatIsInvalid) {
        registerBlocked = false
    }

    let loginBlocked = false

    const onRegistrationClick = async () => {
        if (status === LoadingStatusEnum.LOADING) return
        dispatch(register({userName, password, email}))
    }

    const onLoginClick = async () => {
        if (status === LoadingStatusEnum.LOADING) return
        dispatch(login({email, password}))
    }

    const openGenPwdModal = () => {
        onOpen()
        const generatedPassword = passwordService.generateSavePassword()
        onPasswordChange(generatedPassword)
        onPasswordRepeatChange(generatedPassword)
        setShowPwdInModal(false)
        setPasswordRepeatIsInvalid(false)
        setPasswordRepeatErrorMsg('')
    }

    const clickCopyPwd = async () => {
        await copyToBuffer(password)
        createToast({
            title: 'Пароль скопирован в буфер обмена',
            status: 'info',
            duration: 9000,
            isClosable: true,
            position: 'top'
        })
    }

    return (
        <form className={styles.form}>

            <FormControl isInvalid={emailIsInvalid}>
                <FormLabel>Электронная почта</FormLabel>
                <Input
                    type='email'
                    autoFocus
                    autoComplete="email"
                    value={email}
                    onChange={onEmailChange}
                    size='lg'
                />
                <FormHelperText></FormHelperText>
                <FormErrorMessage>{emailErrorMsg}</FormErrorMessage>
            </FormControl>

            {
                isRegister &&
                <FormControl isInvalid={userNameIsInvalid}>
                    <FormLabel>Имя пользователя</FormLabel>
                    <Input
                        value={userName}
                        autoComplete="username"
                        onChange={onUserNameChange}
                        size='lg'
                    />
                    <FormHelperText></FormHelperText>
                    <FormErrorMessage>
                        {userNameErrorMsg}
                    </FormErrorMessage>
                </FormControl>
            }

            <FormControl isInvalid={passwordIsInvalid}>
                <FormLabel>Пароль</FormLabel>

                <InputGroup size='lg'>
                    <Input
                        pr='4.5rem'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                        size='lg'
                    />
                    <InputRightElement width='9rem'>
                        <Button
                            h='2rem'
                            size='sm'
                            onClick={showPasswordClick}
                        >
                            {showPassword ? 'Скрыть' : 'Показать'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <FormHelperText></FormHelperText>
                <FormErrorMessage>{passwordErrorMsg}</FormErrorMessage>
            </FormControl>

            {
                isRegister &&
                <FormControl>
                    <Button
                        colorScheme='green'
                        variant='outline'
                        onClick={openGenPwdModal}
                    >
                        Сгенерировать надежный пароль
                    </Button>
                </FormControl>
            }

            {
                isRegister &&
                <FormControl isInvalid={passwordRepeatIsInvalid}>
                    <FormLabel>Повторите пароль</FormLabel>

                    <InputGroup size='lg'>
                        <Input
                            pr='4.5rem'
                            type={showPasswordRepeat ? 'text' : 'password'}
                            autoComplete='new-password'
                            value={passwordRepeat}
                            onChange={(e) => onPasswordRepeatChange(e.target.value)}
                            size='lg'
                        />

                        <InputRightElement width='9rem'>
                            <Button
                                h='2rem'
                                size='sm'
                                onClick={showPasswordClickRepeat}
                            >
                                {showPasswordRepeat ? 'Скрыть' : 'Показать'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <FormHelperText></FormHelperText>
                    <FormErrorMessage>
                        {passwordRepeatErrorMsg}
                    </FormErrorMessage>
                </FormControl>
            }

            <div className={styles.buttons}>
                {
                    isLogin &&
                    <Link to={REGISTER_PAGE_PATH}>
                        <Button
                            colorScheme='green'
                            variant='ghost'
                            className={styles.link}
                        >
                            Зарегистрироваться
                        </Button>
                    </Link>
                }

                {
                    isRegister &&
                    <Link to={LOGIN_PAGE_PATH}>
                        <Button
                            colorScheme='green'
                            variant='ghost'
                            className={styles.link}
                        >
                            Войти
                        </Button>
                    </Link>
                }

                {
                    isRegister &&
                    <Button
                        isDisabled={registerBlocked}
                        colorScheme='green'
                        variant='solid'
                        onClick={onRegistrationClick}
                        isLoading={loading}
                    >
                        Зарегистрироваться
                    </Button>
                }

                {
                    isLogin &&
                    <Button
                        colorScheme='green'
                        variant='solid'
                        onClick={onLoginClick}
                        isDisabled={loginBlocked}
                        isLoading={loading}
                    >
                        Войти
                    </Button>
                }

                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Генерация безопасного пароля</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            Пароль сгенерирован и подставлен в форму регистрации.
                            В целях безопасности пароль скрыт.
                            {
                                showPwdInModal &&
                                <FormControl mt={4}>
                                    <Input value={password} readOnly/>
                                </FormControl>
                            }
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                colorScheme='green'
                                variant='outline'
                                mr={3}
                                onClick={clickCopyPwd}
                            >
                                Скопировать
                            </Button>

                            {
                                !showPwdInModal &&
                                <Button colorScheme='green' variant='outline' mr={3}
                                        onClick={() => setShowPwdInModal(true)}>
                                    Показать пароль
                                </Button>
                            }

                            <Button colorScheme='green' variant='outline'
                                    onClick={() => clientDownload.txt('Пароль', password)}>
                                Сохранить в файл
                            </Button>
                        </ModalFooter>

                    </ModalContent>
                </Modal>

            </div>
        </form>

    )

}
