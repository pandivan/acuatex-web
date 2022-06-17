

/**
 * Constantes para el manejo de CRUD
 */
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const STATUS_UNAUTHORIZED = 203;
const STATUS_NO_CONTENT = 204;
const STATUS_ACCESO_DENEGADO = 403;
const STATUS_SERVICE_UNAVAILABLE = 503;


/**
 * Constantes para el manejo de URL API-REST
 */
// const BACKEND_URL = "http://192.168.1.8:7788/v1";
const BACKEND_URL = "https://acuatex-api-rest.herokuapp.com/v1";

const BACKEND_QLIK_URL = "https://83n21dw79d3imcg.us.qlikcloud.com/api/v1/users/me";

const WEBINTEGRATIONID = "uOc5HfBzK4KyF5--fxWe8tVufT-LxWtf";


export default 
{
  STATUS_OK,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  BACKEND_URL,
  STATUS_UNAUTHORIZED,
  STATUS_NO_CONTENT,
  STATUS_ACCESO_DENEGADO,
  STATUS_SERVICE_UNAVAILABLE,
  BACKEND_QLIK_URL,
  WEBINTEGRATIONID
};