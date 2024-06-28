import Code from '@editorjs/code'
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import SimpleImage from '@editorjs/simple-image'
import NestedList from '@editorjs/nested-list'
import Checklist from '@editorjs/checklist'
import LinkTool from '@editorjs/link'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Delimiter from '@editorjs/delimiter'
// import Warning from '@editorjs/warning'
// import RawTool from '@editorjs/raw'
// import AttachesTool from '@editorjs/attaches'
// import Marker from '@editorjs/marker'

export const EDITOR_TOOLS = {
    code: Code,
    header: Header,
    paragraph: Paragraph,
    quote: Quote,
    image: SimpleImage,
    list: {
        class: NestedList,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        },
    },
    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },
    linkTool: {
        class: LinkTool,
        // config: {
        //   endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
        // }
    },
    embed: Embed,
    table: Table,
    delimiter: Delimiter,
    // warning: Warning,
    // raw: RawTool,
    //   attaches: {
    //     class: AttachesTool,
    //     config: {
    //       endpoint: 'http://localhost:8008/uploadFile'
    //     }
    //   }
}

export const i18n = {

    messages: {
        /**
         * Other below: translation of different UI components of the editor.js core
         */
        ui: {
            "blockTunes": {
                "toggler": {
                    "Click to tune": "Нажмите, чтобы настроить",
                    "or drag to move": "или перетащите"
                },
            },
            "inlineToolbar": {
                "converter": {
                    "Convert to": "Конвертировать в"
                }
            },
            "toolbar": {
                "toolbox": {
                    "Add": "Добавить"
                }
            }
        },

        /**
         * Section for translation Tool Names: both block and inline tools
         */
        toolNames: {
            "Text": "Параграф",
            "Heading": "Заголовок",
            "List": "Список",
            "Warning": "Примечание",
            "Checklist": "Чеклист",
            "Quote": "Цитата",
            "Code": "Код",
            "Delimiter": "Разделитель",
            "Raw HTML": "HTML-фрагмент",
            "Table": "Таблица",
            "Link": "Ссылка",
            "Marker": "Маркер",
            "Bold": "Полужирный",
            "Italic": "Курсив",
            "InlineCode": "Моноширинный",
        },

        /**
         * Section for passing translations to the external tools classes
         */
        tools: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
             * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
             */
            "warning": { // <-- 'Warning' tool will accept this dictionary section
                "Title": "Название",
                "Message": "Сообщение",
            },

            /**
             * Link is the internal Inline Tool
             */
            "link": {
                "Add a link": "Вставьте ссылку"
            },
            /**
             * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
             */
            "stub": {
                'The block can not be displayed correctly.': 'Блок не может быть отображен'
            }
        },

        /**
         * Section allows to translate Block Tunes
         */
        blockTunes: {
            /**
             * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
             * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
             *
             * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
             */
            "delete": {
                "Delete": "Удалить"
            },
            "moveUp": {
                "Move up": "Переместить вверх"
            },
            "moveDown": {
                "Move down": "Переместить вниз"
            }
        },
    }
}