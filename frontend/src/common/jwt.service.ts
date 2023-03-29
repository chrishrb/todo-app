const ID_TOKEN_KEY = "id_token";

export function deleteToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

export function saveToken(token: string) {
  localStorage.setItem(ID_TOKEN_KEY, token)
}

export const getToken = () => {
  return localStorage.getItem(ID_TOKEN_KEY)
};
