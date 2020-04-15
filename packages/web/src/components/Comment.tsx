import React from 'react';
import styled from 'styled-components';
import {format} from "date-fns";
import { Comment as CommentData } from '../interfaces/interfaces';
import {colors} from "../common/designSystem";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-bottom: 2px dashed ${colors.green};
  padding-bottom: 60px;
  margin-bottom: 30px;
  
  .post-metadata {
  border-bottom: 1px solid ${colors.lightGreen};
  padding: 20px 0;
 }
 
 .post-author, .post-date {
    margin: 15px 0;
 }
 
 .post-content {
    margin-top: 20px;
 }
`

function Comment({ comment }: { comment: CommentData }) {
  return (
    <MainContainer>
      <div className="post-metadata">
        <p className="post-author">{comment.user.name} on</p>
        <p className="post-date">{format(new Date(comment.createdAt), 'MMM dd, yyyy')} says:</p>
      </div>

      <div className="post-content">
        <p>{comment.content}</p>
      </div>
    </MainContainer>
  )
}

export default Comment;
