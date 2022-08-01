
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Router from "./routes/Router";

export default function App() {
  return (
    <div>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </div>
  )
}
