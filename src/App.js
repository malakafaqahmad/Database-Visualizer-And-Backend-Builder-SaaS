import React from 'react';
import './App.css';
import Navbar from "./contents/navbar/nav";
import Chat from "./contents/chatbot/chat";
import TableCreationForm from './contents/form/form';
import VerticalBar from './contents/verticalBar/VerticalBar';

export default function MyApp() {


  return (
    <>
      <Navbar />
      <Chat />
      <TableCreationForm />
      <VerticalBar />
    </>
  );
}
