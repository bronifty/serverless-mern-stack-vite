import { useQuery, useMutation, useQueryClient } from 'react-query';
import Filter from 'bad-words';
let filter = new Filter({ replaceRegex: /[A-Za-z0-9가-힣_]/g });
import fetcher from './fetcher';
// const baseURL = '/.netlify/functions/index/api/v1/tasks/';
const baseURL = '/api/v1/tasks/';

export const fetchAll = async () => {
  // throw new Error('Not implemented');
  const options = { baseURL, method: 'GET' };
  return await fetcher(options);
};
export const useFetchAll = (onSuccess, onError) => {
  // const queryClient = useQueryClient();
  // console.log('queryClient in fetchAll: \n', { queryClient });
  return useQuery(['fetchAll'], fetchAll);
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
        .getQueryData(['fetchAll'])
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
  // filter profanity
  if (filter.isProfane(name)) {
    console.log('in the profanity filter of addOne to axios');
    throw new Error('Profanity detected');
  }
  const options = { baseURL, method: 'POST', body: { name } };
  return await fetcher(options);
};
export const useAddOne = () => {
  const queryClient = useQueryClient();
  return useMutation(addOne, {
    // when mutate is called:
    onMutate: async (values) => {
      // filter profanity in cache
      if (filter.isProfane(values)) {
        console.log('in the profanity filter of addOne to cache');
        throw new Error('Profanity detected');
      }
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      console.log({ queryClient });
      queryClient.cancelQueries(['fetchAll']);
      // Snapshot the previous value
      const oldData = queryClient.getQueryData(['fetchAll']);
      console.log({ oldData });
      // Optimistically update to the new value
      queryClient.setQueryData(['fetchAll'], (oldData) => {
        return [
          ...oldData,
          {
            id: Math.random().toString(36).substr(2, 9),
            name: values,
            completed: false,
          },
        ];
      });
      // rollback fn
      return () => queryClient.setQueryData(['fetchAll'], oldData);
    },
    onError: (error, values, rollback) => {
      if (rollback) {
        rollback();
      }
      return { error: error.message };
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(['fetchAll']);
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
    onMutate: async (values) => {
      console.log({ values });
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryClient.cancelQueries(['fetchAll']);
      // Snapshot the previous value
      const oldData = queryClient.getQueryData(['fetchAll']);
      // Optimistically update to the new value
      queryClient.setQueryData(['fetchAll'], (oldData) => {
        return oldData.filter((item) => {
          return item._id !== values;
        });
      });
      // rollback function to revert changes
      return () => queryClient.setQueryData(['fetchAll'], oldData);
      // const prevData = queryClient.setQueryData(['fetchAll'], (prevState) => {
      //   return {
      //     ...prevState,
      //     data: [
      //       ...prevState.tasks,
      //       { id: prevState?.tasks?.length + 1, ...item },
      //     ],
      //   };
      // });
      // return { prevData };
    },
    onError: (_error, _item, context) => {
      queryClient.setQueryData(['fetchAll'], context.prevData);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(['fetchAll']);
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
      await queryClient.cancelQueries(['fetchAll']);
      // const prevData = queryClient.setQueryData(['fetchAll'], (prevState) => {

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
      queryClient.setQueryData(['fetchAll'], context.prevData);
      return { error };
    },
    onSettled: (data) => {
      queryClient.invalidateQueries(['fetchAll']);
      return { data };
    },
  });
};
