import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

pdfjs.GlobalWorkerOptions.workerSrc = '/worker/pdf.worker.min.js'

export default function DisplayPDF ({ cid }) {
    const [loading, setLoading] = useState(false)
    const [pdf, setPdf] = useState(null)
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        setLoading(true)
        async function fetchPdf() {
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
        setLoading(false)
        console.log(pdf)
    }, [cid])

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        setPageNumber(1)
    }

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset)
    }

    const previousPage = () => {
        changePage(-1)
    }

    const nextPage = () => {
        changePage(1)
    }
    
    if (loading) return <p>Loading pdf preview. Please wait...</p>

    return (
        <Document 
            file={pdf}
            renderMode="canvas"
            noData={''}
            onLoadError={(error) => console.log(error)}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={ <Spinner size='lg'/> }
            className={pdf && "border-2 border-gray-400 rounded-md my-5 p-2"}
        >
            <Page
                pageNumber={pageNumber} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
                className="max-w-[635]"
            />
            <div className="w-full">
                <p className="text-sm text-gray-400">Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</p>
            </div>
            <div className="flex justify-center align-middle">
                <button 
                    type="button" 
                    hidden={pageNumber <= 1} 
                    onClick={previousPage}
                    className="text-cyan-800 border border-cyan-700 hover:bg-cyan-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                > <HiArrowLongLeft />
                </button>
                <button 
                    type="button" 
                    hidden={pageNumber >= numPages} 
                    onClick={nextPage}
                    className="text-cyan-800 border border-cyan-700 hover:bg-cyan-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                > <HiArrowLongRight />
                </button>
            </div>
        </Document>
    )
}