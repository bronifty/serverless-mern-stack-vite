import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetcher from './fetcher';
const baseURL = '/.netlify/functions/index/api/v1/tasks/';
// const baseURL = '/api/v1/tasks/';

export const getAllTasks = async () => {
  const options = { baseURL, method: 'GET' };
  return await fetcher(options);
};
export const useGetAllTasks = (onSuccess, onError) => {
  return useQuery('fetchAll', getAllTasks);
};

export const addItem = async (name) => {
  const options = { baseURL, method: 'POST', body: { name } };
  return await fetcher(options);
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

export const deleteItem = async (id) => {
  const options = { baseURL, method: 'DELETE', id };
  return await fetcher(options);
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

export const fetchItem = async (id) => {
  const options = { baseURL, method: 'GET', id };
  return await fetcher(options);
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

export const updateItem = async (task) => {
  // throw new Error('Not implemented');
  const options = {
    baseURL,
    method: 'PATCH',
    id: task.id,
    body: task,
  };
  return await fetcher(options);
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
