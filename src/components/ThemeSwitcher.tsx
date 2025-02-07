import React, { useState } from 'react';
import bgDark from '../assets/bg-dark.png';
import bgLight from '../assets/bg-light.png';
import { SunFilled, SunOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

// 定义主题类型
type Theme = 'dark' | 'light';


interface ThemeSwitcherProps {
  onThemeChange: (newTheme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({onThemeChange}) => {
  // 当前主题，初始为 'light'
  const [theme, setTheme] = useState<Theme>('light');
  // 用于存放上一次的背景图片 URL，实现交叉渐变效果
  const [prevBg, setPrevBg] = useState<string | null>(null);
  // 控制上一个背景层的淡出动画
  const [fade, setFade] = useState(false);

  // 当前主题对应的背景图片
  const currentBg = theme === 'dark' ? bgDark : bgLight;

  // 切换主题：先保存当前背景，再立即切换主题，然后延时触发旧背景淡出
  const toggleTheme = () => {
    setPrevBg(currentBg);
    setFade(false);
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    onThemeChange(theme=== 'light' ? 'dark' : 'light');
    // 延时 50ms 触发淡出（确保组件已渲染新背景）
    setTimeout(() => {
      setFade(true);
    }, 50);
  };

  return (
    <>
      {/* 当前背景层 */}
      <div
        className="bg current"
        style={{ backgroundImage: `url(${currentBg})` }}
      ></div>

      {/* 上一个背景层，在切换时用于实现交叉渐变 */}
      {prevBg && (
        <div
          className={`bg prev ${fade ? 'fade' : ''}`}
          style={{ backgroundImage: `url(${prevBg})` }}
          onTransitionEnd={() => {
            // 动画结束后清除旧背景
            setPrevBg(null);
            setFade(false);
          }}
        ></div>
      )}

      {/* 右上角的主题切换按钮 */}
      <FloatButton  icon={theme === 'light' ? <SunOutlined /> : <SunFilled />} onClick={toggleTheme}>
    
      </FloatButton>
    </>
  );
};

export default ThemeSwitcher;
