use serde::Serialize;

#[derive(Serialize)]
pub struct RequestFieldError {
    pub field_name: String,
    pub field_error_code: String,
}

#[derive(Serialize)]
pub struct ResponseError {
    pub message: String,
    pub code: String,
    pub fields: Option<Vec<RequestFieldError>>,
}

impl From<RequestError> for ResponseError {
    fn from(error: RequestError) -> Self {
        match error {
            RequestError::NotFound(message, fields) => ResponseError {
                message,
                code: String::from("404"),
                fields,
            },
            RequestError::BadRequest(message, fields) => ResponseError {
                message,
                code: String::from("400"),
                fields,
            },
            RequestError::InternalServerError(message, fields) => ResponseError {
                message,
                code: String::from("500"),
                fields,
            },
            RequestError::Unauthorized(message, fields) => ResponseError {
                message,
                code: String::from("401"),
                fields,
            },
            RequestError::Forbidden(message, fields) => ResponseError {
                message,
                code: String::from("403"),
                fields,
            },
            RequestError::UnprocessableEntity(message, fields) => ResponseError {
                message,
                code: String::from("422"),
                fields,
            },
        }
    }
}

pub enum RequestError {
    NotFound(String, Option<Vec<RequestFieldError>>),
    BadRequest(String, Option<Vec<RequestFieldError>>),
    InternalServerError(String, Option<Vec<RequestFieldError>>),
    Unauthorized(String, Option<Vec<RequestFieldError>>),
    Forbidden(String, Option<Vec<RequestFieldError>>),
    UnprocessableEntity(String, Option<Vec<RequestFieldError>>),
}
