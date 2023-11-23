import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

const fetchData = async () => {
  const response = await axios.get('http://localhost:1142/livre');
  return response.data.livres;
};

const MyComponent = () => {
  const { data, isLoading, error } = useQuery('myData', fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Données de l'API :</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const NotificationView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
};

export default NotificationView;
