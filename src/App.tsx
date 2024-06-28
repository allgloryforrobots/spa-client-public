import React from 'react'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'

import 'app/styles/index.scss'
import {AppRouter} from 'app/router'
import {store} from 'app/store'

function App() {

  return (
      <ChakraProvider>
          <Provider store={store}>
              <BrowserRouter>
                  <AppRouter/>
              </BrowserRouter>
          </Provider>
      </ChakraProvider>
  )
}

export default App
