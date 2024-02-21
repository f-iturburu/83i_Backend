export const setToken = (key,token) =>{
    localStorage.setItem(key, JSON.stringify(token))
}