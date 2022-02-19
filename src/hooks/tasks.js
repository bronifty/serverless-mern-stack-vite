import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetcher from './fetcher';
// const baseURL = '/.netlify/functions/index/api/v1/tasks/';
const baseURL = '/api/v1/tasks/';

export const fetchAll = async () => {
  // throw new Error('Not implemented');
  const options = { baseURL, method: 'GET' };
  return await fetcher(options);
};
export const useFetchAll = (onSuccess, onError) => {
  return useQuery('fetchAll', fetchAll);
};

export const fetchOne = async (id) => {
  const options = { baseURL, method: 'GET', id };
  return await fetcher(options);
};
export const useFetchOne = (id) => {
  const queryClient = useQueryClient();
  return useQuery(['fetchOne', id], () => fetchOne(id), {
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

export const addOne = async (name) => {
  const options = { baseURL, method: 'POST', body: { name } };
  return await fetcher(options);
};
export const useAddOne = () => {
  const queryClient = useQueryClient();
  return useMutation(addOne, {
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

export const deleteOne = async (id) => {
  const options = { baseURL, method: 'DELETE', id };
  return await fetcher(options);
};
export const useDeleteOne = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOne, {
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

export const updateOne = async (task) => {
  // throw new Error('Not implemented');
  const options = {
    baseURL,
    method: 'PATCH',
    id: task.id,
    body: task,
  };
  return await fetcher(options);
};
export const useUpdateOne = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOne, {
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
