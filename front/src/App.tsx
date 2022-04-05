import { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [count, setCount] = useState(0);
  const { loginWithRedirect, user, getAccessTokenSilently } = useAuth0();

  const token = useCallback(async () => {
    const domain = import.meta.env.VITE_DOMAIN;

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      });
      console.log(accessToken);
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>{import.meta.env.VITE_CLIENTE_ID}</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>{JSON.stringify(user, null, 2)}</p>
        <p>
          <button
            onClick={() => {
              loginWithRedirect();
            }}
          >
            Log In
          </button>
          <button
            onClick={() => {
              token();
            }}
          >
            buscar Token
          </button>
          ;
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
