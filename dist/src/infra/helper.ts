

class Helper {

    //METODO GENERICO PARA RESPONSE
    sendResponse = function(response, statusCode, data) {
        response.status(statusCode).json({result: data});
    };

}export default new Helper;