import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { format } from 'date-fns';
import {colors, DarkButton, text} from "../common/designSystem";
import {Post} from "../interfaces/interfaces";
import CommentsList from "./CommentsList";
import api from '../common/api';
import {useParams} from "react-router-dom";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
 justify-content: center;
 padding: 20px 20%;
 
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

const Toolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 30px;
`

const CommentBox = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => visible ?  'block' : 'none'};
  
  textarea {
    margin: 20px 10px;
    flex: 1;
    padding: 10px;
    font-size: ${text.extraSmall};
    color: ${colors.green};
    font-weight: bolder;
    outline: none;
    border: 1px solid ${colors.green};
    box-shadow: 0 10px 10px ${colors.lighterGray};
    width: 100%;
    min-height: 70px;
  }
`

function PublicationDetail({ publication, reloadPublication }: { publication: Post, reloadPublication: () => void }) {
  const { id }: { id?: string | undefined } = useParams();
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Comment');
  const [submittingComment, setSubmittinComment] = useState(false);
  const [updatedPublication, setUpdatedPublication] = useState();

  function handleValueChange(event: any) {
    console.log(event);
    const { target: { value: text } } = event;
    setCommentContent(text);
  }

  function handleCommentClickButton() {
    if (commentBoxVisible) {
      // submit comment
      submitNewComment();
    } else {
      setCommentBoxVisible(true);
      setButtonLabel('Publish comment');
    }
  }

  async function submitNewComment() {
    try {
      setSubmittinComment(true);
      setButtonLabel('Submitting...');
      const { data: submittedComment } = await api(true).post(`comments/${id}`, { content: commentContent });
      console.log('submittedComment -> ', submittedComment);

      if (submittedComment) {
        await reloadPublication();
      }
    } catch (err) {
      console.error('DEBUG:: Error when submitting comment', err);
    } finally {
      setSubmittinComment(false);
      setButtonLabel('Submit');
    }
  }

  return (
    <MainContainer>
      <div className="post-metadata">
        <p className="post-author">{publication.user.name} on</p>
        <p className="post-date">{format(new Date(publication.createdAt), 'MMM dd, yyyy')} says:</p>
      </div>

      <div className="post-content">
        <p>{publication.content}</p>
      </div>

      <CommentBox visible={commentBoxVisible}>
        <textarea onChange={event => handleValueChange(event)} />

      </CommentBox>

      <Toolbar>
        <DarkButton onClick={() => handleCommentClickButton()}>{buttonLabel}</DarkButton>
      </Toolbar>

      <CommentsList comments={publication.comments}/>

    </MainContainer>
  )
}

export default PublicationDetail;
