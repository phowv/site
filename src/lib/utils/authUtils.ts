export const AUTH_LOGOUT_EVENT = "auth_logout_event"

export const triggerLogout = () => {
	window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT))
}

export const subscribeToLogout = (callback: () => void) => {
	window.addEventListener(AUTH_LOGOUT_EVENT, callback)
	return () => window.removeEventListener(AUTH_LOGOUT_EVENT, callback)
}