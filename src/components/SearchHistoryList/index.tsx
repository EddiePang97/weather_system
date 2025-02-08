import React from 'react';
import { List, Typography, Card, Space, Grid, Button } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';
import { WeatherData } from '../../services/weatherService';
import moment from 'moment';

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
    const dateFormat = phoneSize ? "DD-MM-YYYY" : "DD-MM-YYYY hh:mm a"
    return (
        <div style={{}}>
            <Card
                className="history-card"
                bordered={false}
                style={{
                    height:"100%",
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
                                    height:"60px",
                                    marginBottom: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <List.Item.Meta
                                    title={<Text style={{ fontSize }}>{item?.name}</Text>}
                                    description={phoneSize&&<Text style={{ color: '#666', fontSize: fontSize - 2 }}>{moment(item.date).format(dateFormat)
                                    }</Text>}
                                />
                                <Space size={phoneSize ? "small" : "large"} >
                                {!phoneSize&& <Text style={{ color: '#666', fontSize: fontSize - 2 }}>{moment(item.date).format(dateFormat)
                                    }</Text>}
                                    <Button icon={<SearchOutlined/>} style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'}}  onClick={() => cbOnSearch(item.name)} type={"default"} shape="circle" />
                                    <Button icon={<DeleteOutlined/>}  style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'}} onClick={() => cbDelete(item.name)} type={"default"} shape="circle" />
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
