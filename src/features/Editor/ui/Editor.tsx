import React, { useEffect, useRef } from 'react'
import EditorJS, {OutputData} from '@editorjs/editorjs'
import {EDITOR_TOOLS, i18n} from 'features/Editor/ui/EditorTools'
import {generateRandomString} from 'shared/utils/generate'

type EditorProps = {
    data: OutputData,
    submitData: (data: OutputData) => void
}

export const Editor = ({ data, submitData }: EditorProps) => {

  const editorRef = useRef<EditorJS>()
  const holderRef = useRef<string>(generateRandomString())

  useEffect(() => {

    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holderRef.current,
        // @ts-ignore
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data: OutputData = await api.saver.save()
          submitData(data)
        },
        i18n,
        placeholder: 'Кликните, чтобы начать писать статью!',
        // autofocus: true,
      })

    }

    // add a return function handle cleanup
    return () => {
      editorRef.current?.destroy()
    }

    // массив зависимостей строго пустой
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div id={holderRef.current}/>
}