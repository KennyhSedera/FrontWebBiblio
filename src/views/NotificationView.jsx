import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Background from '../components/layout/Background';
import { notification } from '../services/notificationService';

const queryClient = new QueryClient();

const fetchData = async () => {
  const response = await notification();
  return response.data.notification;
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
      {data.length}
    </div>
  );
};

const NotificationView = ({location}) => {
  const { data } = location.state;
  console.log(data);
  return (
    <Background>
      <QueryClientProvider client={queryClient}>
        <MyComponent />
      </QueryClientProvider>
    </Background>
    
  );
};

export default NotificationView;
