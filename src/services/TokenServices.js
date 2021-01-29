import autenticacionServices from "../services/AutenticacionServices"; 


const autenticacionHeader = () =>
{
  let cliente = autenticacionServices.getClienteActual();

  if (cliente && cliente.token) 
  {
    return { Authorization: 'Bearer ' + cliente.token };
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