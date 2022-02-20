export default async (options) => {
  let res;
  try {
    if (options.body) {
      res = await fetch(
        `${options.id ? options.baseURL + options.id : options.baseURL}`,
        {
          method: options.method,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(options.body),
        }
      );
    } else {
      res = await fetch(
        `${options.id ? options.baseURL + options.id : options.baseURL}`,
        {
          method: options.method,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
    const resJSON = await res.json();
    return resJSON.task ? resJSON.task : resJSON.tasks;
  } catch (error) {
    return res.json(error);
  }
};
