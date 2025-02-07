import { Route, Routes } from 'react-router-dom';
import ThemeSwitcher from './components/ThemeSwitcher';
import './styles/theme.css';
import WeatherPage from './pages/weather';
import { useState, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>("light");

  useEffect(() => {
    // Dynamically add/remove theme class to the root element
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }, [theme]);

  // Ant Design theme configuration
  const antdThemeConfig = theme === 'dark' ? {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorText: '#ffffff',
      colorBgContainer: '#121212',
    }
  } : {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorText: '#000000',
      colorBgContainer: '#ffffff',
    }
  };

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <div>
        <ThemeSwitcher onThemeChange={setTheme} />
        <Routes>
          <Route path="/" element={<WeatherPage  />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
