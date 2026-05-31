export const API_BASE = 'http://localhost:2244'

export async function fetchPhotos() {
	const url = `${API_BASE}/photos`
	
	console.debug(`[api] request url = ${url}`)

	const response = await fetch(url)

	console.debug(`[api] response status = ${response.status}`)

	if (!response.ok) {
		const errorText = await response.text().catch(() => '<failed to load body>')
		console.error(`[api] response is not OK, body = ${errorText}`)
		throw new Error(`[api] Error loading photos ${errorText}`)
	}

	const payload = await response.json()

	console.debug(`[api] raw payload = ${payload}`)

	return Array.isArray(payload) ? payload : []
}