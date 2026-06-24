import { api } from "./axios"

export interface Photo {
  photo_uuid: string;
  owner_login: string;
  title: string;
  description: string;
  tags: string;
  created_at: Date;
  took_at: Date;
}

export async function fetchPhotos(): Promise<Array<Photo>> {
	try {
  	const response = await api.get('/photos')
    return Array.isArray(response.data) ? response.data : []
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error loading photos ${errorText}`)
  }
}

export async function uploadPhoto(metadata: string, photo: File) {
  const formData = new FormData()
  formData.append('metadata', metadata)
  formData.append('photo', photo)

  try {
    const response = await api.post('/photos', formData)
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error uploading photo ${errorText}`)
  }
}