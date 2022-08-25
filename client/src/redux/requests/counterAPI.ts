// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve, reject) =>
    setTimeout(() => reject('Ha ocurrido un error'), 3000)
  );
}

export function otherFetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve, reject) =>
    setTimeout(() => resolve({ data: amount }), 3000)
  );
}