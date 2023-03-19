import Link from 'next/link'
import { useRouter } from 'next/router'

import { HiDocumentMagnifyingGlass } from "react-icons/hi2";

export default function ArticlesTable({ id, article }) {
    const router = useRouter()

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-2 font-medium text-gray-900">
                <div className="w-5">
                    {id}
                </div>
            </th>
            <td className="px-6 py-2 font-medium text-gray-900 dark:text-white">
                <div className="w-[200px]">
                    <p className="line-clamp-2">
                        {article.headline}
                    </p>
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
                <div className="w-36">
                    {article.category}
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="w-26">
                    {article.result}
                </div>
            </td>
            <td className="px-6 py-2">
                <div className="w-10 p-2">
                    <Link href={`/dashboard/factcheck/${article._id}`}>
                        <HiDocumentMagnifyingGlass size="28" className="p-0 text-cyan-600 dark:text-cyan-200 "/>
                    </Link>
                </div>
            </td>
        </tr>
    )
}