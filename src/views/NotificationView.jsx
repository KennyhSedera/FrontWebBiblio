import { useQuery } from 'react-query';
import Background from '../components/layout/Background';

function NotificationView() {
  const { isLoading, error, data } = useQuery('tasks', async () => {
    const response = await fetch('http://localhost:1142/adherent');
    if (!response.ok) {
      throw new Error('Something went wrong while fetching data');
    }
    return response.json();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Background>
      <h1>Task List</h1>
      <ul>
        {data.map(task => (
          <li key={task.id_Adh}>{task.nom_Adh}</li>
        ))}
      </ul>
    </Background>
  );
}

export default NotificationView;
