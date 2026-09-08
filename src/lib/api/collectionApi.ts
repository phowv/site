import type { AccessModifier } from "../../types/accessModifier";
import { api } from "./axios";

export interface SimpleCollection {
	collection_uuid: string;
	owner_login: string;
	title: string;
	description: string;
	access_level: AccessModifier
}

export interface SmallPhotoInfo {
	photo_uuid: string
	access_key: string
}

export interface Collection extends SimpleCollection {
	photos: SmallPhotoInfo[];
}

export async function fetchCollections(owner_login?: string): Promise<Array<SimpleCollection>> {
	try {
  	const response = await api.get('/collections',
      {params: owner_login ? {owner_login} : undefined }
    )
    return Array.isArray(response.data) ? response.data : []
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error loading collections ${errorText}`)
  }
}

export async function fetchCollection(collection_uuid: string): Promise<Collection> {
	try {
		return (await api.get(`/collection/${collection_uuid}`)).data

	}	catch (error: any) {

    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error loading collection ${errorText}`)
	}
}

export async function uploadCollection(metadata: string) {
  const formData = new FormData()
  formData.append('metadata', metadata)

  try {
    const response = await api.post('/collections', formData)
    return response.data

  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error uploading collection ${errorText}`)
  }
}

export async function deleteCollection(collection_uuid: string) {
	try {
    const response = await api.delete(`/collection/${collection_uuid}`)
    return response.data

  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error removing collection ${errorText}`)
  }	
}

export async function addPhotoToCollection(collection_uuid: string, photo_uuid: string) {	
  const formData = new FormData()
  formData.append('photo_uuid', photo_uuid)

  try {
    const response = await api.post(`/collection/${collection_uuid}/photos`, formData)
    return response.data

  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error adding photo to collection ${errorText}`)
  }
}

export async function removePhotoFromCollection(collection_uuid: string, photo_uuid: string) {	
  try {
    const response = await api.delete(`/collection/${collection_uuid}/photo/${photo_uuid}`)
    return response.data

  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error removing photo from collection ${errorText}`)
  }
}