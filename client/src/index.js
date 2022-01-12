import React from 'react';
import ReactDOM from 'react-dom';
import SearchApp from './SearchApp/index';
import HomeApp from './HomeApp/index';
import UserApp from './UserApp/index';
import './App.css'

if (document.getElementById('root-search-app')) {
  ReactDOM.render(
    <React.StrictMode>
      <SearchApp />
    </React.StrictMode>,
    document.getElementById('root-search-app')
  );
}

if (document.getElementById('root-home-app')) {
  ReactDOM.render(
    <React.StrictMode>
      <HomeApp />
    </React.StrictMode>,
    document.getElementById('root-home-app')
  );
}

if (document.getElementById('root-user-app')) {
  const username = JSON.parse(document.getElementById('id_user_name').textContent);
  ReactDOM.render(
    <React.StrictMode>
      <UserApp username={username} />
    </React.StrictMode>,
    document.getElementById('root-user-app')
  );
}
