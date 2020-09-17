import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const App = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const response = await fetch(`https://api.github.com/users/${user}`);

    if (response.statusText === "OK") {
      const res = await response.json();
      setData(res);
      console.log(res);

      setStatus("OK");
    } else {
      setStatus("ERROR");
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.userInput.value = "";
    setIsLoading(true);
  };
  function useNetwork(){
    const [isOnline, setNetwork] = useState(window.navigator.onLine);
    const updateNetwork = () => {
       setNetwork(window.navigator.onLine);
    };
    useEffect(() => {
       window.addEventListener("offline", updateNetwork);
       window.addEventListener("online", updateNetwork);
       return () => {
          window.removeEventListener("offline", updateNetwork);
          window.removeEventListener("online", updateNetwork);
       };
    });
    return isOnline;
 };
 let app= <p className="Connection">OOPS!! No Internet Connection</p>
    if(useNetwork()){
      app= <div className="App">
      <div className="App__form">
        <form onSubmit={handleSubmit}>
          <input
            className="App__form__input"
            id="userInput"
            type="text"
            placeholder="Enter the Username"
            onChange={(e) => setUser(e.target.value)}
          />
          <button onClick={handleSearch} className="App__form__button ">
            Search
          </button>
        </form>
      </div>
      {isLoading && <div className="loader">LOADING...</div>}
      {status === "OK" && !isLoading ? <Card head={data} /> : ""}
      {status === "ERROR" && (
        <div className="App__error">
          <p>Error! User Not Found</p>
        </div>
      )}
    </div>
    }
  return ( 
      app
  );
};

export default App;
