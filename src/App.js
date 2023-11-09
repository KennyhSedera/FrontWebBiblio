/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    axios.get(
      "http://localhost:1142/livre"
    ).then((res) => res.data.livres)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <strong>👀 {data.map(item => (
        <div key={item.id_livre}>{item.titre_livre}</div>
      ))}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
