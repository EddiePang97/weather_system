import React from 'react';
import { List, Typography, Card, Space, Grid } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';
import { WeatherData } from '../../services/weatherService';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface IProps {
    historylist: WeatherData[]
    cbDelete: (city: string) => void
    cbOnSearch: (city: string) => void
}

const SearchHistory: React.FC<IProps> = ({ historylist, cbDelete, cbOnSearch }) => {
    const screens = useBreakpoint();
    const phoneSize = !(screens.xl || screens.xxl);
    const fontSize = phoneSize ? 12 : 16;
    return (
        <div style={{}}>


            <Card
                className="history-card"
                bordered={false}
                style={{

                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '20px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
            >
                <div style={{ paddingBottom: '20px' }}>
                    <Text >Search History</Text>

                </div>

                {/* Scrollable Container */}
                <div className="scrollable-container">
                    <List
                        itemLayout="horizontal"
                        dataSource={historylist}
                        renderItem={(item: WeatherData) => (
                            <List.Item
                                style={{
                                    background: '#FFFFFF66',
                                    padding: '5px 10px',
                                    borderRadius: '10px',
                                    marginBottom: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <List.Item.Meta
                                    title={<Text style={{ fontSize }}>{item?.name}</Text>}
                                    description={<Text style={{ color: '#666', fontSize: fontSize - 2 }}>{item?.date}</Text>}
                                />
                                <Space size={phoneSize ? "small" : "large"}>
                                    <SearchOutlined onClick={() => cbOnSearch(item.name)} style={{ color: '#6c63ff', fontSize, cursor: 'pointer' }} />
                                    <DeleteOutlined onClick={() => cbDelete(item.name)} style={{ color: '#ff4d4f', fontSize, cursor: 'pointer' }} />
                                </Space>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        </div>
    );
};

export default SearchHistory;
