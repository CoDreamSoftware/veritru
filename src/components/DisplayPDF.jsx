import axios from 'axios'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2"
import { Document, Page, pdfjs } from 'react-pdf'
import useResizeObserver from '@react-hook/resize-observer'

pdfjs.GlobalWorkerOptions.workerSrc = '/worker/pdf.worker.min.js'

function useWidth(target) {
    const [width, setWidth] = useState(null)

    useLayoutEffect(() => {
        setWidth(target.current.getBoundingClientRect().width)
    }, [target])

    useResizeObserver(target, (entry) => setWidth(entry.contentRect.width))
    return width
}

export default function DisplayPDF ({ cid }) {
    const [loading, setLoading] = useState(false)
    const [pdf, setPdf] = useState(null)

    const wrapperDiv = useRef(null)
    const width = useWidth(wrapperDiv)

    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    // const [pageScale, setPageScale] = useState(1)

    useEffect(() => {
        setLoading(true)
        async function fetchPdf() {
            try {
                const res = await axios.get(`https://dweb.link/ipfs/${cid}`, {
                    responseType: 'blob',
                })
                setPdf(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPdf()
        setLoading(false)
        console.log(pdf)
    }, [cid])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
        setPageNumber(1)
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset)
    }

    function previousPage() {
        changePage(-1)
    }

    function nextPage() {
        changePage(1)
    }

    // function zoomIn() {
    //     if (pageScale < 3) {
    //         setPageScale(pageScale + 0.2)
    //     }
    // }

    // function zoomOut() {
    //     if (pageScale > 0.3) {
    //         setPageScale(pageScale - 0.2)
    //     }
    // }
    
    if (loading) return <p>Loading pdf preview. Please wait...</p>

    return (
        <div className="wrapper border-2 border-gray-400 rounded-md my-5 p-2" ref={wrapperDiv}>
            <Document 
                file={pdf}
                renderMode="canvas"
                noData={''}
                onLoadError={(error) => console.log(error)}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={ <Spinner size='lg'/> }
            >
                <Page
                    pageNumber={pageNumber} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false}
                    width={width}
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

                {/* <div className="button-container">
                    <button onClick={zoomIn} disabled={pageScale >= 3}>
                        Zoom +
                    </button>
                    <button onClick={zoomOut} disabled={pageScale <= 0.3}>
                        Zoom -
                    </button>
                </div> */}
            </Document>
        </div>
    )
}