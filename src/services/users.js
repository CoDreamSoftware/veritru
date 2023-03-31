import { assetPrefix } from '@/next/next.config'

// Grant access of user
export async function grantAccess(userId) {
    try {
        const res = await fetch(`${assetPrefix}/api/users/grant?id=${userId}`, {
            method: 'PUT',
        })

        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${await res.text()}`)
        }

        const data = res.json()
        return data
    } catch (error) {
        console.log('Error granting access => ' + error)
    }
}

// Revoke access of user
export async function revokeAccess(userId) {
    try {
        const res = await fetch(`${assetPrefix}/api/users/revoke?id=${userId}`, {
            method: 'PUT',
        })

        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${await res.text()}`)
        }

        const data = res.json()
        return data
    } catch (error) {
        console.log('Error revoking access => ' + error)
    }
}

// GET method that fetches all entries from mongodb
export async function getUsers() {
    const res = await fetch(`${assetPrefix}/api/users/get`)
    if (!res.ok) {
        throw new Error(`An error occurred: ${res.statusText}`)
    }
    const data = await res.json()
    return data
}