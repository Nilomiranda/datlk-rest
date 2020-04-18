import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { Comment as CommentData } from '../interfaces/interfaces';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  comments: CommentData[];
};

const CommentsList = (props: Props) => {
  const [comments, setComments] = useState(props.comments);

  const handleCommentDelete = (id: number) => {
    const commentsList = [...comments];
    const commentIndexInList = commentsList.findIndex((comment) => comment.id === id);
    commentsList.splice(commentIndexInList, 1);
    setComments(commentsList);
  };

  if (comments.length === 0) {
    return (
      <MainContainer>
        <p>This publication has no comments yet.</p>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {comments.map((comment) => (
        <Comment comment={comment} handleCommentDelete={handleCommentDelete} key={comment.id} />
      ))}
    </MainContainer>
  );
};

export default CommentsList;
