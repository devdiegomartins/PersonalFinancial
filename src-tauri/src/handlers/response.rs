use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct Response<R> {
    data: R,
    success: bool,
}

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct ResponsePagination<R> {
    items: Vec<R>,
    success: bool,
    page_size: u32,
    current_page: u32,
}
pub trait DefaultResponseTrait<R> {
    fn new(data: R, success: bool) -> Self;
}

impl<R> DefaultResponseTrait<R> for Response<R> {
    fn new(data: R, success: bool) -> Self {
        Self { data, success }
    }
}

pub trait DefaultResponsePaginationTrait<R> {
    fn new(data: Vec<R>, success: bool, page_size: u32, current_page: u32) -> Self;
}

impl<R> DefaultResponsePaginationTrait<R> for ResponsePagination<R> {
    fn new(data: Vec<R>, success: bool, page_size: u32, current_page: u32) -> Self {
        Self {
            items: data,
            success,
            page_size,
            current_page,
        }
    }
}
