import { useState } from "react";
import "./App.css";

function User({ avatar, url, username }) {
  return (
    <div className="user">
      <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
}

function Form({ onSubmit, onChange, value }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Enter username or email"
        onChange={onChange}
        value={value}
      />
      <button type="submit">Search</button>
    </form>
  );
}

const API_URL = "https://api.github.com";

async function fetchResults(query) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (e) {
    throw new Error(e);
  }
}

function App() {
  //which can both reveal and hide text.project
  const [isVisible, setIsVisible] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleReveal=()=>{
    setIsVisible(true);
  }

  const handleHide=()=>{
    setIsVisible(false);
  }

  function onSearchChange(event) {
    setQuery(event.target.value);
  }

  async function onSearchSubmit(event) {
    event.preventDefault();
    const results = await fetchResults(query);
    setResults(results);
  }

  return (
    <>
    {/* Hode and reveal text project 1 */}
    <div >
    <h1> Reaveal and Hide Text</h1>
      {isVisible && (
        <p>
          Search the world's information, including webpages, images, videos and
          more. Google has many special features to help you find exactly what
          you're looking for.
        </p>
      )}
     
      <button onClick={handleReveal}>Reveal Text</button>
      <button onClick={handleHide}>Hide Text</button>
    </div>

    {/* Github user name search Project 2 */}
     
    <div className="app">
      <main className="main">
        <h2>Project 5: GitHub User Search</h2>
        <Form
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
          value={query}
        />
        <h3>Results</h3>
        <div id="results">
          <div>
            {results.map((user) => (
              <User
                key={user.login}
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
