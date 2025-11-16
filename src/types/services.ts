export type ResponseService<R> = {
  data: R
  success: boolean
}

export type ResponsePaginatedService<R> = {
  items: R[]
  page_size: number
  current_page: number
  success: boolean
}
