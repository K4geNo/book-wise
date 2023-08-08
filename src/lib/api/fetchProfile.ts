import { api } from '../axios'

export async function fetchProfile(userId: string) {
    const { data } = await api.get(`/profile?userId=${userId}`)

    return data.profile ?? {}
}
