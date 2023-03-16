import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'

function AuthPage() {
    const router = useRouter()

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.push('/user')
            } else {
                router.push('/')
            }
        })
    }, [router])
}

export default AuthPage