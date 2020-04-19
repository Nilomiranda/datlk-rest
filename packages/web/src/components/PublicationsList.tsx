import React, { useEffect, useState } from 'react';
import Publication from './Publication';
import { Post, User } from '../interfaces/interfaces';
import { Flex } from 'rebass/styled-components';

const PublicationsList = ({ loadedPosts, user }: { loadedPosts: Post[]; user: User }) => {
  const [posts, setPosts] = useState(loadedPosts);

  function handlePublicationDelete(id: number) {
    const publications = [...posts];
    const pubIndexInList = publications.findIndex((publication) => publication.id === id);
    publications.splice(pubIndexInList, 1);
    setPosts(publications);
  }

  return (
    <Flex flexDirection="column" alignItems="stretch" width={['95%', '85%', '70%']}>
      {posts ? (
        posts.map((post: Post) => (
          <Publication publication={post} key={post.id} user={user} handleDelete={handlePublicationDelete} />
        ))
      ) : (
        <span>No posts to show...</span>
      )}
    </Flex>
  );
};

export default PublicationsList;
