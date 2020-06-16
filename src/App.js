import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepo] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepo(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post("repositories", {
      title: "Desafio ReactJS",
      url: "http://url.com.br",
      techs: ["Tech 1", "Tech 2"],
    });

    const repo = res.data;
    setRepo([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    const index = repos.findIndex((repo) => repo.id === id);

    repos.splice(index, 1);
    setRepo([...repos]);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
