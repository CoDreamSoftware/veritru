import { extendTheme } from '@chakra-ui/react'
import { Poppins } from "@fontsource/poppins"

const theme = extendTheme({
    fonts: {
        heading: Poppins,
    },
})

export default theme
