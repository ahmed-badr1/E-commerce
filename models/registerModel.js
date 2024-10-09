const AUTH_API = process.evn.REACT_APP_AUTHENTICATION_API;

export async function fetchData(requestInfo) {
  const response = await fetch(`${AUTH_API}/Auth/Register`, requestInfo);
  const result = await response.json();

  return {"response": response, "result": result}
}