import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'

pdfjs.GlobalWorkerOptions.workerSrc = '/worker/pdf.worker.min.js'

function DisplayPDF ({ cid }) {
    const [pdf, setPdf] = useState(null)

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await axios.get(`https://dweb.link/ipfs/${cid}` , {
                    responseType: 'blob',
                })
                setPdf(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPdf()
        console.log(pdf)
    }, [cid])

    return (
        <Document 
            file={pdf}
            renderMode="canvas"
            noData={''}
            onLoadError={(error) => console.log(error)}
            loading={ <Spinner size='lg'/> }
            className={pdf && "border-2 border-gray-400 rounded-md my-5 p-2"}
        >
            <Page 
                pageNumber={1} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
            />
        </Document>
    )
}

export default DisplayPDF