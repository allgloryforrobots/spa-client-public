import {OutputData} from '@editorjs/editorjs'
import editorJsHtml from 'editorjs-html'
import {FC} from 'react'
const EditorJsToHtml = editorJsHtml()

type EditorPreviewProps = {
  data: OutputData
}

export const EditorPreview: FC<EditorPreviewProps> = ({ data }) => {
  const html = EditorJsToHtml.parse(data)
  return (
    <div className="prose max-w-full" key={data.time}>
      {html.map((item, index) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          )
        }
        return item
      })}
    </div>
  )
}