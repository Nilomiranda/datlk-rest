import React from 'react';
import styled from 'styled-components';
import Comment from "./Comment";
import { Comment as CommentData } from '../interfaces/interfaces';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  
`

function CommentsList({ comments }: { comments: CommentData[] }) {
  if (comments.length === 0) {
    return (
      <MainContainer>
        <p>This publication has no comments yet.</p>
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      {
        comments.map(comment => (<Comment comment={comment}/>))
      }
    </MainContainer>
  )
}

export default CommentsList;
