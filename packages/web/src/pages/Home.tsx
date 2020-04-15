import React, {useState} from 'react';
import {PageContainer} from "../common/designSystem";
import Header from "../components/Header";
import NewPublication from "../components/NewPublication";

function Home() {
  const [newPostContent, setNewPostContent] = useState('');

  function handleContentChange(text: string) {
    setNewPostContent(text);
  }

  return (
    <PageContainer>
      <Header></Header>

      <NewPublication onChange={handleContentChange}/>
    </PageContainer>
  )
}

export default Home;
