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

export interface PatchPhotoProps {
  title?: string;
  description?: string; 
}

export async function fetchPhotos(owner_login?: string): Promise<Array<Photo>> {
	try {
  	const response = await api.get('/photos',
      {params: owner_login ? {owner_login} : undefined }
    )
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

export async function deletePhoto(photo_uuid: string) {
  try {
    const response = await api.delete(`/photo/${photo_uuid}`)
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error deleting photo ${errorText}`)
  }
}

export async function patchPhoto(photo_uuid: string, patchPhotoProps: PatchPhotoProps) {
  const formData = new FormData()
  formData.append('metadata', JSON.stringify(patchPhotoProps)) 
  
  try {
    const response = await api.patch(`/photo/${photo_uuid}`, formData)
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error patching photo ${errorText}`)
  }
}