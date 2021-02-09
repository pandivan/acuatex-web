import autenticacionServices from "../services/AutenticacionServices"; 


const autenticacionHeader = () =>
{
  let token = autenticacionServices.getToken();

  if (token) 
  {
    return { Authorization: 'Bearer ' + token };
  } 
  else 
  {
    return {};
  }
}




export default 
{
  autenticacionHeader
};