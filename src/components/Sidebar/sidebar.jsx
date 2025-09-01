import React, { useState, useContext } from 'react'
import "./side.css";
import { assets } from "../../assets/assets/assets.js"
import { Context } from "../../context/Context.jsx";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { recentPrompts, startNewChat, setResponse, setChatHistory } = useContext(Context);

    return (
        <>
            <div className='sidebar'>
                <div className="top">
                    <img
                        onClick={() => setExtended(hide => !hide)}
                        className="menu"
                        src={assets.menu_icon}
                        alt="Menu"
                    />
                    <div className="chat" onClick={startNewChat}>
                        <img src={assets.plus_icon} alt="Plus_Sign" />
                        {extended ? <p>New Chat</p> : null}
                    </div>

                    {extended && recentPrompts.length > 0 && (
                        <div className="recent">
                            <p className="previous-title">Recent</p>
                            {recentPrompts
                                .filter(p => p.prompt && p.prompt.trim() !== "") 
                                .map((promptObj, index) => (
                                    <div
                                        key={index}
                                        className="previous-entry"
                                        onClick={() => {
                                            setResponse(promptObj.response);
                                            setChatHistory([
                                                { role: "user", text: promptObj.prompt },
                                                { role: "gemini", text: promptObj.response }
                                            ]);
                                        }}
                                    >
                                        <img src={assets.message_icon} alt="Message" />
                                        <p>{promptObj.prompt.substring(0, 18)}...</p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                <div className="bottom">
                    <div className="bottom_item previous-entry">
                        <img src={assets.question_icon} alt="Question_mark" />
                        {extended ? <p>Help</p> : null}
                    </div>
                    <div className="bottom_item previous-entry">
                        <img src={assets.history_icon} alt="history_icon" />
                        {extended ? <p>Activity</p> : null}
                    </div>
                    <div className="bottom_item previous-entry">
                        <img src={assets.setting_icon} alt="Setting_icon" />
                        {extended ? <p>Setting</p> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
