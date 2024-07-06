import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contact from "../components/Contact";
import styled from "styled-components";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [curresntUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (curresntUser) {
      socket.current = io("https://chat-app-ru1f.onrender.com");
      socket.current.emit("add-user", curresntUser._id);
    }
  }, [curresntUser]);

  const changeCurrentChat = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const getAllcontacts = async () => {
      try {
        if (curresntUser.isAvatarImageSet) {
          const { data } = await axios.get(
            `https://chat-app-ru1f.onrender.com/api/v1/auth/getAllUsers/${curresntUser._id}`
          );
          setContacts(data.users);
        } else {
          navigate("/set-avatar");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (curresntUser) {
      getAllcontacts();
    }
  }, [curresntUser]);

  return (
    <Container>
      <div className="container">
        <Contact
          contacts={contacts}
          curresntUser={curresntUser}
          changeChat={changeCurrentChat}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome user={curresntUser} chat={currentChat} />
        ) : (
          <ChatContainer
            chat={currentChat}
            user={curresntUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
