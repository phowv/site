import type { AccessModifier } from "../../types/accessModifier";
import type { PhotoTagMetadata, UploadingTagMetadata } from "../../types/tag";
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
  access_level?: AccessModifier;
}

export interface GeneratePhotoAccessSecretProps {
  expires_duration: number; // seconds
}

export interface GeneratePhotoAccessSecretResponse {
  photo_uuid: string;
  access_secret: string;
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

export async function fetchPhoto(photo_uuid: string, access_secret?: string): Promise<Photo> {
	try {
  	const response = await api.get(`/photo/${photo_uuid}`, 
      {params: access_secret ? { photo_access_secret: access_secret } : undefined, }
    )
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error loading photo ${errorText}`)
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
  try {
    const response = await api.patch(`/photo/${photo_uuid}`, patchPhotoProps)
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error patching photo ${errorText}`)
  }
}

export async function generatePhotoAccessSecret(photo_uuid: string, props: GeneratePhotoAccessSecretProps): Promise<GeneratePhotoAccessSecretResponse> {
  try {
    const reqestProps: GeneratePhotoAccessSecretProps = { ...props, expires_duration: props.expires_duration * 1e9};
    const response = await api.post(`/photo/${photo_uuid}/secret`, reqestProps);
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error generate photo access secret ${errorText}`)
  }
}

export async function deletePhotoAccessSecret(photo_uuid: string) {
 try {
    const response = await api.delete(`/photo/${photo_uuid}/secret`);
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error delete photo access secret ${errorText}`)
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
  try {
    const response = await api.post('/tags', metadata)
    return response.data
  } catch (error: any) {
    const errorText = error.response?.data ?? error.message ?? '<unknown error>'

    throw new Error(`[api] Error uploading tag ${errorText}`)
  }
}