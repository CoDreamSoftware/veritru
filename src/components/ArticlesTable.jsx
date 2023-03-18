import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ArticlesTable({ article }) {
    const router = useRouter()

    return (
        <div className="relative overflow-x-auto shadow-lg shadow-gray-300/50 sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Headline
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <Link href={`/${article._id}`}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {article.headline}
                            </th>
                        </Link>
                        <td className="px-6 py-4">
                            {article.ipfs_cid}
                        </td>
                        <td className="px-6 py-4">
                            {article.category}
                        </td>
                        <td className="px-6 py-4">
                            {article.short_desc}
                        </td>
                        <td className="px-6 py-4">
                            {article.result}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Edit
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}