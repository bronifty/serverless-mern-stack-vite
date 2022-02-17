import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetcher from './fetcher';
const baseURL = '/api/v1/tasks/';
const options = {
  baseURL,
};

export const getAllTasks = async () => {
  // const options = { method: 'GET' };
  options.method = 'GET';
  return await fetcher(options);

  // const request = await fetch('/api/v1/tasks', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // });
  // const data = await request.json();
  // console.log({ data });
  // return data;
};
export const useGetAllTasks = (onSuccess, onError) => {
  return useQuery('fetchAll', getAllTasks);
};

export const addItem = async (name) => {
  // throw new Error('not implemented');
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('in the post request for addOne');
  return fetch('/api/v1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json)
    .then((res) => res.task);
  // return axios
  //   .post('http://localhost:3000/api/v1/tasks', { name })
  //   .then((res) => res.data);
};
export const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onMutate: async (item) => {
      await queryClient.cancelQueries('fetchAll');
      const prevData = queryClient.setQueryData('fetchAll', (prevState) => {
        return {
          ...prevState,
          data: [
            ...prevState.tasks,
            { _id: prevState?.tasks?.length + 1, ...item },
          ],
        };
      });
      return { prevData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('fetchAll', context.prevData);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries('fetchAll');
    },
  });
};

export const deleteItem = (id) => {
  return axios
    .delete(`http://localhost:3000/api/v1/tasks/${id}`)
    .then((res) => res.data);
};
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteItem, {
    onMutate: async (item) => {
      await queryClient.cancelQueries('fetchAll');
      const prevData = queryClient.setQueryData('fetchAll', (prevState) => {
        return {
          ...prevState,
          data: [
            ...prevState.tasks,
            { id: prevState?.tasks?.length + 1, ...item },
          ],
        };
      });
      return { prevData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('fetchAll', context.prevData);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries('fetchAll');
    },
  });
};

export const getTask = (id) => {
  return axios
    .get(`http://localhost:3000/api/v1/tasks/${id}`)
    .then((res) => res.data);
};

export const fetchItem = (id) => {
  return axios
    .get(`http://localhost:3000/api/v1/tasks/${id}`)
    .then((res) => res.data);
};
export const useFetchItem = (id) => {
  const queryClient = useQueryClient();
  return useQuery(['fetchItem', id], () => fetchItem(id), {
    initialData: () => {
      const adminItem = queryClient
        .getQueryData('fetchAll')
        ?.data?.find((item) => item.id == id);
      if (adminItem) {
        return {
          data: adminItem,
        };
      } else {
        return undefined;
      }
    },
  });
};

export const updateItem = (task) => {
  // throw new Error('Not implemented');
  return axios
    .patch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      name: task.name,
      completed: task.completed,
    })
    .then((res) => res.data);
};
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(updateItem, {
    onMutate: async (item) => {
      await queryClient.cancelQueries('fetchAll');
      // const prevData = queryClient.setQueryData('fetchAll', (prevState) => {

      //   return {
      //     ...prevState,
      //     data: [
      //       ...prevState.data,
      //       { id: prevState?.data?.length + 1, ...item },
      //     ],
      //   };
      // });
      // return { prevData };
    },
    onError: (error, item, context) => {
      queryClient.setQueryData('fetchAll', context.prevData);
      return { error };
    },
    onSettled: (data) => {
      queryClient.invalidateQueries('fetchAll');
      return { data };
    },
  });
};
