import React, { useState } from 'react';
import bgDark from '../assets/bg-dark.png';
import bgLight from '../assets/bg-light.png';
import { SunFilled, SunOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';


type Theme = 'dark' | 'light';


interface ThemeSwitcherProps {
  onThemeChange: (newTheme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [prevBg, setPrevBg] = useState<string | null>(null);
  const [fade, setFade] = useState(false);

  // 当前主题对应的背景图片
  const currentBg = theme === 'dark' ? bgDark : bgLight;

  // 切换主题：先保存当前背景，再立即切换主题，然后延时触发旧背景淡出
  const toggleTheme = () => {
    setPrevBg(currentBg);
    setFade(false);
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    onThemeChange(theme === 'light' ? 'dark' : 'light');
    setTimeout(() => {
      setFade(true);
    }, 50);
  };

  return (
    <>
      <div
        className="bg current"
        style={{ backgroundImage: `url(${currentBg})` }}
      />

      {prevBg && (
        <div
          className={`bg prev ${fade ? 'fade' : ''}`}
          style={{ backgroundImage: `url(${prevBg})` }}
          onTransitionEnd={() => {
            setPrevBg(null);
            setFade(false);
          }}
        />
      )}

      <FloatButton icon={theme === 'light' ? <SunOutlined /> : <SunFilled />} onClick={toggleTheme} />
    </>
  );
};

export default ThemeSwitcher;
