import './App.css';
import DetailsPage from './Components/DetailsPage';
import Form from "./Components/Form.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
function App() {
  const [User, setUser] = useState(localStorage.getItem("user"));
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#ffea00',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {!User&& <Form setUser={setUser}></Form> }
      {User&&<DetailsPage setUser={setUser} User={User} />}
      </div>
      </ThemeProvider>
  );
}

export default App;
