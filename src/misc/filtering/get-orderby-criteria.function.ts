export function getOrderByCriteria<Type>(orderBy: string): Type {
  const orderCriteriaElement = {} as Type;

  if (orderBy && orderBy[0] === '-') {
    orderCriteriaElement[orderBy.substring(1, orderBy.length)] = 'desc';
  } else if (orderBy && orderBy[0] !== '-') {
    orderCriteriaElement[orderBy] = 'asc';
  }

  return orderCriteriaElement;
}
