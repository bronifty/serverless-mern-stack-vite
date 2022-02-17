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
      return res.json();
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
      return res.json();
    }
  } catch (error) {
    console.log({ error });
    return res.json(error);
  }
};
