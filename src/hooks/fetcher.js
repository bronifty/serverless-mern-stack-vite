export default async (options) => {
  // console.log('in the fetcher; options: \n', { options });
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
          // body: JSON.stringify(options.body),
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
    return await resJSON.tasks;
  } catch (error) {
    console.log({ error });
    return res.json(error);
  }
};
