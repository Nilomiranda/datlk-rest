import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { Post } from '../interfaces/interfaces';
import CommentsList from './CommentsList';
import api from '../common/api';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Textarea } from '@rebass/forms';
import { Flex, Text, Box, Button } from 'rebass/styled-components';
import styled from 'styled-components';
import theme from '../common/theme';

const StyledLink = styled(Link)`
  color: ${theme.colors.green};
  font-weight: bolder;
  font-size: ${theme.fontSizes[1]};
  text-decoration: none;
`;

type Props = {
  publication: Post;
  reloadPublication: () => void;
};

const PublicationDetail = (props: Props) => {
  const { publication, reloadPublication } = props;
  const history = useHistory();
  const { id }: { id?: string | undefined } = useParams();
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Comment');
  const [submittingComment, setSubmittinComment] = useState(false);
  const [updatedPublication, setUpdatedPublication] = useState();
  const commentInputRef = useRef(null);

  useEffect(() => {
    const {
      location: { state },
    }: { location: { state: any } } = history;

    if (state?.commenting) {
      handleCommentClickButton();
    }

    console.log('PublicationDetail -> commentInputRef', commentInputRef);
    // @ts-ignore
    commentInputRef?.current.focus();
  }, []);

  const handleValueChange = (event: any) => {
    console.log(event);
    const {
      target: { value: text },
    } = event;
    setCommentContent(text);
  };

  const handleCommentClickButton = () => {
    if (commentBoxVisible) {
      // submit comment
      submitNewComment();
    } else {
      setCommentBoxVisible(true);
      setButtonLabel('Publish comment');
    }
  };

  const submitNewComment = async () => {
    try {
      setSubmittinComment(true);
      setButtonLabel('Submitting...');
      const { data: submittedComment } = await api(true).post(`comments/${id}`, { content: commentContent });

      if (submittedComment) {
        await reloadPublication();
      }
    } catch (err) {
      console.error('DEBUG:: Error when submitting comment', err);
    } finally {
      setSubmittinComment(false);
      setButtonLabel('Submit');
    }
  };

  return (
    <Flex flexDirection="column" width={['95%', '80%', '70%', '60%']} bg="white" margin="0 auto" p={40}>
      <Flex
        width={1}
        flexDirection="column"
        justifyContent="spaceBetween"
        py={40}
        sx={{ borderBottom: '1px solid green' }}
      >
        <StyledLink to="/home">↩ Back to feed</StyledLink>
        <Text color="gray" fontWeight="bolder" fontSize={14} my={15} marginTop="40px">
          {publication.user.name} on
        </Text>
        <Text color="black" fontSize={12} fontWeight="medium">
          {format(new Date(publication.createdAt), 'MMM dd, yyyy')} says:
        </Text>
      </Flex>

      <Box marginTop={60}>
        <p>{publication.content}</p>
      </Box>

      <Textarea
        onChange={(event) => handleValueChange(event)}
        name="Comment"
        height={100}
        color="green"
        my={50}
        sx={{ outline: 'transparent', borderWidth: 1 }}
        display={commentBoxVisible ? 'block' : 'none'}
        ref={commentInputRef}
      />

      <Flex width={1} my={60} justifyContent="flex-end">
        <Button variant="primary" onClick={() => handleCommentClickButton()}>
          {buttonLabel}
        </Button>
      </Flex>

      <CommentsList comments={publication.comments} />
    </Flex>
  );
};

export default PublicationDetail;
