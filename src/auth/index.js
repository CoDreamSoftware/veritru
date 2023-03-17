import { signIn, signOut } from 'next-auth/react'

export const login = async (FormData) => {
    console.log(FormData)
    const { email, password } = FormData

    const status = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
    })
    return status
}

export const logout = async () => {
    const status = await signOut({ 
        redirect: false, 
        callbackUrl: '/' 
    })
    return status
}

export const register = async (FormData) => {
    try {
        const res = await fetch('/api/auth/register', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(FormData),
        })
        const data = res.json()
        return data
    } catch (error) {
        console.log('Error account register => ' + error)
    }
}
