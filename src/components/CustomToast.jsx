import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Portal,
    Box
} from '@chakra-ui/react'

export default function CustomToast({ title, description, status, centered = false }) {
    return (
        <Portal>
            <Box
                position={centered ? "fixed" : "relative"}
                top={centered ? "50%" : "initial"}
                left={centered ? "50%" : "initial"}
                transform={centered ? "translate(-50%, -50%)" : "none"}
                zIndex={centered ? "toast" : "initial"}
            >
                <Alert
                    status={status}
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        {title}
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        {description}
                    </AlertDescription>
                </Alert>
            </Box>
        </Portal>
    )
}
