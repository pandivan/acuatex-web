

/**
 * Constantes para el manejo de CRUD
 */
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR = 500;
const STATUS_UNAUTHORIZED = 203;
const STATUS_NO_CONTENT = 204;
const TOKEN_EXPIRED = 403;


/**
 * Constantes para el manejo de URL API-REST
 */
const BACKEND_URL = "http://192.168.1.8:7788/v1";
// const BACKEND_URL = "https://acuatex-api-rest.herokuapp.com/v1";



export default 
{
  STATUS_OK,
  STATUS_CREATED,
  STATUS_ERROR,
  BACKEND_URL,
  STATUS_UNAUTHORIZED,
  STATUS_NO_CONTENT,
  TOKEN_EXPIRED
};