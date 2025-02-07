import React, { useState } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import './index.css';
import FloatingLabelInput from "./FloatingLabelInput";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        if (input.trim() !== "") {
            onSearch(input.trim());
        }
    };

    return (
        <div className="shared-width-container">
            <div className="search-bar-row">
                <FloatingLabelInput
                    placeholder="Country"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    size="large"
                    style={{
                        backgroundColor: "#6C40B5",
                        color: "white",
                        border: "none",
                        borderRadius: "16px",
                        minHeight: "60px",
                        minWidth: "60px",
                        zIndex:"3"
                    }}
                    onClick={handleSearch}
                    icon={<SearchOutlined style={{ fontSize: "20px" }} />}
                />
            </div>
        </div>
    );
};

export default SearchBar;
