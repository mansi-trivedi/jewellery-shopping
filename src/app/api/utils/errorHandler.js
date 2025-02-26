import { response, errorType, defaultMessage } from "./constants";

export const errorHandler = (Response, error) => {
    if (error.name == errorType.ValidationError) {
        return Response.json({
            status: response.error,
            errors: {
                type: error.name,
                messages: JSON.parse(error.message)
            }
        });
    } else if (error.name == errorType.SyntaxError) {
        return Response.json({
            status: response.error,
            errors: {
                type: error.name,
                messages: defaultMessage.SyntaxError
            }
        });
    }
    else {
        return Response.json({
            status: response.error,
            errors: {
                type: errorType.InternalServerError,
                message: defaultMessage.InternalServerError
            }
        });
    }
};
