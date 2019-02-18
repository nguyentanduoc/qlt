const Pageable = {
  page: 0,
  size: 5,
  sort: null
}
export const pageRequestDefault = () => {
  return Pageable;
}
export const pageCustom = (page) => {
  return {...Pageable, page: page - 1};
}