const AUTH_API = process.evn.AUTHENTICATION_API;

export async function fetchData(requestInfo) {
  const response = await fetch(`${AUTH_API}/Auth/ResetPassword`, requestInfo);
  const result = await response.json();

  return {"response": response, "result": result}
}