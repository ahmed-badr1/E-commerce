const AUTH_API =  import.meta.env.VITE_AUTHENTICATION_API;

export async function fetchData(requestInfo) {
  const response = await fetch(`${AUTH_API}/Auth/Login`, requestInfo);
  const result = await response.json();

  return {"response": response, "result": result}
}