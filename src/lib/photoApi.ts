import type { AccessModifier } from "../types/accessModifier";
import type { PhotoTagMetadata, UploadingTagMetadata } from "../types/tag";
import { api } from "./axios"

export interface Photo {
  photo_uuid: string;
  owner_login: string;
  title: string;
  access_key: string;
  description: string;
  tags: PhotoTagMetadata[];
  created_at: Date;
  took_at: Date;
  access_level: AccessModifier;
}

export interface Tag {
  tag_uuid: string;
  tag_name: string;
  tag_description: string;
}

export interface PatchPhotoProps {
  title?: string;
  description?: string;
  tag_uuids?: string[];
  access_level: AccessModifier;
}

export const PhotoSize = {
  small: "small",
  medium: "medium",
  raw: "raw",
} as const;

export type PhotoSize = (typeof PhotoSize)[keyof typeof PhotoSize];

export function toPhotoSize(s: string): PhotoSize | undefined {
  if (s === PhotoSize.small) return PhotoSize.small;
  if (s === PhotoSize.medium) return PhotoSize.medium;
  if (s === PhotoSize.raw) return PhotoSize.raw;
  return undefined;
}

export async function getPhotoUrl(photo_uuid: string, access_key: string, photo_size?: string): Promise<string> {
  const res = await api.get(`/photo/${photo_uuid}/file`, {
    responseType: "blob",
    params: {
      access_key: access_key,
      photo_size: photo_size
    }
  })
  
  return URL.createObjectURL(res.data);
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

export async function fetchTags(photo_uuid?: string): Promise<Array<Tag>> {
	try {
  	const response = await api.get('/tags',
      {params: photo_uuid ? {photo_uuid} : undefined }
    )
    return Array.isArray(response.data) ? response.data : []
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error loading tags ${errorText}`)
  }
}

export async function uploadTag(metadata: UploadingTagMetadata) {
  const formData = new FormData()
  formData.append('metadata', JSON.stringify(metadata))

  try {
    const response = await api.post('/tags', formData)
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error uploading tag ${errorText}`)
  }
}