import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { apiRequest } from "../../apiRequest";
import ChatUserSearch from "../../components/chatUserSearch/ChatUserSearch";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const user = useSelector((state) => state.user);
  const scrollRef = useRef();
  const [searchResult, setSearchResult] = useState([]);
  const [friends, setFriends] = useState([]);
  const [currentConvoOppoUser, setCurrentConvoOppoUser] = useState({});

  useEffect(() => {
    socket.current = io("localhost:2000");
    socket.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", user._id);
    socket.current.on("getUsers", (Onusers) => {
      const onlineId = [];
      Onusers.forEach((o) => onlineId.push(o.userId));
      setOnlineUsers(onlineId);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await apiRequest.get("/conversations/" + user._id);

        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiRequest.get("/messages/" + currentChat._id);
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    const getCurrentConvoOppoUser = async () => {
      try {
        const res = await apiRequest.get(
          "/users/?userId=" +
            currentChat.members.filter((m) => m !== user._id)[0]
        );
        setCurrentConvoOppoUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    currentChat && getMessages();
    currentChat && getCurrentConvoOppoUser();
  }, [currentChat, user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await apiRequest.post("/messages", message);
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
    setNewMessage("");
    const receiverId = currentChat.members.find((id) => id !== user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await apiRequest.get("/users/friends/" + user._id);
      setFriends(res.data);
    };
    getFriends();
  }, [user]);

  const searchHandler = async (e) => {
    const matches = [];
    if (e.target.value !== "") {
      friends.forEach((friend) => {
        if (
          friend.username
            .replace(/\s/g, "")
            .toLowerCase()
            .includes(e.target.value.replace(/\s/g, ""))
        ) {
          matches.push(friend);
        }
      });
      setSearchResult(matches);
    } else {
      setSearchResult([]);
    }
  };

  const handleSearchResultClick = async (oppoUser) => {
    let gotOldConvo = false;
    conversations.forEach((convo) => {
      if (convo.members.includes(oppoUser._id)) {
        setCurrentChat(convo);
        setSearchResult([]);
        document.getElementById("friendSearch").value = "";
        gotOldConvo = true;
      }
    });
    if (!gotOldConvo) {
      const res = await apiRequest.post("/conversations/", {
        senderId: user._id,
        receiverId: oppoUser._id,
      });
      setConversations((prev) => [...prev, res.data]);
      setCurrentChat(res.data);
      setSearchResult([]);
      document.getElementById("friendSearch").value = "";
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              id="friendSearch"
              placeholder="Search for friends"
              className="chatMenuInput"
              onChange={searchHandler}
            />
            <div className="searchResults">
              {searchResult.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    console.log(1);
                    handleSearchResultClick(user);
                  }}
                >
                  <ChatUserSearch user={user} />
                </div>
              ))}
            </div>
            {conversations.map((conversation) => (
              <div
                onClick={() => {
                  setCurrentChat(conversation);
                }}
                key={conversation._id}
              >
                <Conversations currentUser={user} conversation={conversation} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <h4 className="convoHeader">
            {currentChat &&
              "Conversation with: " + currentConvoOppoUser.username}
          </h4>
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} oppo={currentConvoOppoUser}/>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="write someting"
                    className="chatMessageInput"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Select a Conversation to start chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUser={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
