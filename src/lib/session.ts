/** Session-only TypeSafe key. Never persisted. */
let sessionKey = "";

export function setSessionKey(key: string) {
  sessionKey = key.trim();
}

export function getSessionKey(): string {
  return sessionKey;
}
