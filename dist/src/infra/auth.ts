import * as jwt from 'jsonwebtoken';
import Configs  from './configs';

class Auth {

    validate(request, response, next) {

        var token = request.headers['x-access-token'];

        if(token) { // se vier o token
            jwt.verify(token, Configs.secret, function(err, decoded) {
                if(err) {
                    return response.status(403).json({
                        success: false,
                        message: '403 - Token inválido'
                    })
                } else {
                    next(); // usuario pode prosseguir
                }
            })
        } else {
            return response.status(401).json({
                success: false,
                message: '401 - Sem autorização'
            })
        };
    }

}

export default new Auth;