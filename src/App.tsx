import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import { ConfigProvider } from 'antd';

const lightTheme = {
  token: {
    colorPrimary: '#191970',
    colorSecondary: '#F2BD27',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#1C1B1B',
  },
};

const darkTheme = {
  token: {
    colorPrimary: '#191970',
    colorSecondary: '#F2BD27',
    colorBgBase: '#1C1B1B',
    colorTextBase: '#FFFFFF',
  },
};

function App() {
  return (
    <ConfigProvider theme={darkTheme === lightTheme ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
