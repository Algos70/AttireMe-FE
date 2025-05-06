import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { ConfigProvider } from 'antd';

const lightTheme = {
  token: {
    colorPrimary: '#191970',
    colorSecondary: '#F2BD27',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#1C1B1B',
  },
};

function App() {
  return (
    <ConfigProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
