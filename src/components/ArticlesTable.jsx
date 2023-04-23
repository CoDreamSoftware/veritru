import Link from 'next/link'

import { HiDocumentMagnifyingGlass } from 'react-icons/hi2'
import { RiCloseCircleFill } from "react-icons/ri"
import { BsFillQuestionCircleFill, BsCheckCircleFill } from "react-icons/bs"

export default function ArticlesTable({ id, article }) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-2 font-medium text-gray-900">
                <div className="w-5">
                    {id}
                </div>
            </th>
            <td className="px-6 py-2 font-medium text-gray-900 dark:text-white">
                <div className="w-[200px]">
                    <Link href={`/dashboard/factcheck/${article._id}`} 
                        className="line-clamp-2 hover:text-cyan-500"
                    >
                        {article.headline}
                    </Link>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="w-[180px]">
                    <p className="line-clamp-2">
                        {article.ipfs_cid}
                    </p>
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="w-20">
                    {article.category}
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="w-26 flex flex-row">
                    {article.result === 'Undetermined' && <BsFillQuestionCircleFill className="mr-2 text-gray-500" size="24" />}
                    {article.result === 'True' && <BsCheckCircleFill className="mr-2 text-green-500" size="24" />}
                    {article.result === 'False' && <RiCloseCircleFill className="mr-2 text-red-500" size="26" />}
                    {article.result}
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="w-10 p-2">
                    <Link href={`/dashboard/factcheck/${article._id}`}>
                        <HiDocumentMagnifyingGlass size="28" className="p-0 text-cyan-600 hover:text-cyan-700 dark:text-cyan-200 "/>
                    </Link>
                </div>
            </td>
        </tr>
    )
}