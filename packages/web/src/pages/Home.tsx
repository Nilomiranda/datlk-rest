import React, {useEffect, useState} from 'react';
import {PageContainer} from "../common/designSystem";
import Header from "../components/Header";
import NewPublication from "../components/NewPublication";
import PublicationsList from "../components/PublicationsList";
import api from '../common/api';
import {User} from "../interfaces/interfaces";

function Home() {
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const userInStorage = localStorage.getItem('DTALK_USER');
    let user;

    if (userInStorage && userInStorage.length > 0) {
      user = JSON.parse(userInStorage);
      console.log('user from storage -> ', user);
      setUser(user);
    }
    loadPosts();
  }, [])

  async function loadPosts() {
    try {
      setLoading(true);
      const res = await api(true).get('publication');
      const {data} = res
      setPosts(data);
    } catch (err) {
      console.error('DEBUG:: Error when loading posts -> ', err);
    } finally {
      setLoading(false);
    }
  }

  function handleContentChange(text: string) {
    setNewPostContent(text);
  }

  async function submitNewPost() {
    try {
      setSubmitting(true);
      const res = await api(true).post('publication', { content: newPostContent });

      if (res) {
        await loadPosts();
      }

    } catch (err) {
      console.error('Error when submitting new publication -> ', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageContainer>
      <Header />

      <NewPublication onChange={handleContentChange} handleSubmit={submitNewPost} submitting={submitting}/>

      {
        loading ?
          <span>Loading posts...</span> :
          <PublicationsList loadedPosts={posts} user={user}/>
      }
    </PageContainer>
  )
}

export default Home;
