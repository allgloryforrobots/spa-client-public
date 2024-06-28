import {Layout} from 'features/Layout'
import {Editor} from 'features/Editor'
import React, {useCallback, useEffect} from 'react'
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from '@chakra-ui/react'
import styles from './index.module.scss'
import {OutputData} from '@editorjs/editorjs'
import {AppDispatch, useAppDispatch, useAppSelector} from 'app/store'
import {LoadingStatusEnum} from 'shared/types'
import {articleActions, getArticle, submitArticle} from 'entities/Article'
import {useParams} from 'react-router-dom'
import {LoadingError} from 'features/LoadingError/ui'

export const ArticleEditPage = () => {

    const dispatch = useAppDispatch<AppDispatch>()
    const {status, data} = useAppSelector((state) => state.article)
    const {title,published,content} = data
    const loading = status === LoadingStatusEnum.LOADING

    const {id} = useParams()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const isArticleNameValid = Boolean(title)
    let articleNameErrorMsg = ''
    if (!isArticleNameValid) {
        articleNameErrorMsg = 'Введите название статьи'
    }

    const submitData = useCallback((data: OutputData) => {
        dispatch(articleActions.setContent(data))
    }, [dispatch])

    const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(articleActions.setTitle(e.target.value))
    }

    const submit = () => {
        dispatch(submitArticle())
    }

    const onPublishChange = () => {
        dispatch(articleActions.setPublished(!published))
    }

    const deleteArticle = () => {

    }

    useEffect(() => {
        if (id) {
            dispatch(getArticle(+id))
        }
    }, [dispatch, id])

    if (status === LoadingStatusEnum.ERROR) {
        return <LoadingError message='Ошибка загрузки статьи' />
    }

    return (
        <Layout>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Удаление статьи</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Это действие необратимо. Необходимо подтверждение
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='red'
                            onClick={deleteArticle}
                            isLoading={loading}
                        >
                            Удалить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div className={styles.articleContainer}>
                <form>
                    <FormControl isInvalid={!isArticleNameValid} mb={5}>
                        <FormLabel>Название статьи </FormLabel>
                        <Input
                            type='text'
                            autoFocus
                            value={title}
                            onChange={setTitle}
                            size='lg'
                        />
                        <FormHelperText></FormHelperText>
                        <FormErrorMessage>
                            {articleNameErrorMsg}
                        </FormErrorMessage>
                    </FormControl>
                </form>

                <Divider mb={5}/>
                <Editor data={content} submitData={submitData}/>

                <div className={styles.saveBlock}>
                    <Button
                        isDisabled={!isArticleNameValid}
                        colorScheme='green'
                        variant='solid'
                        onClick={submit}
                        isLoading={loading}
                        className={styles.leftEdgeButton}
                    >
                        Сохранить
                    </Button>

                    <Checkbox
                        isChecked={published}
                        colorScheme={'green'}
                        onChange={onPublishChange}
                    >
                        Опубликовать
                    </Checkbox>

                    <Button
                        isDisabled={loading}
                        colorScheme='red'
                        variant='solid'
                        onClick={onOpen}
                        className={styles.rightEdgeButton}
                    >
                        Удалить
                    </Button>
                </div>

            </div>
        </Layout>
    )
}
