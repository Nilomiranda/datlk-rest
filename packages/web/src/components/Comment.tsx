import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Comment as CommentData } from '../interfaces/interfaces';
import { Flex, Text, Box, Button } from 'rebass/styled-components';
import { Textarea } from '@rebass/forms';
import api from '../common/api';
import { toast } from 'react-toastify';

type Props = {
  comment: CommentData;
  handleCommentDelete: (id: number) => void;
};

enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const Comment = (props: Props) => {
  const { comment, handleCommentDelete } = props;
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(props.comment.content);

  const notification = (msg: string, type?: ToastType) => {
    if (type === ToastType.SUCCESS) {
      toast.success(msg);
    } else if (type === ToastType.ERROR) {
      toast.error(msg);
    } else {
      toast(msg);
    }
  };

  useEffect(() => {
    const userInStorage = localStorage.getItem('DTALK_USER');
    let user;

    if (userInStorage && userInStorage.length > 0) {
      user = JSON.parse(userInStorage);
      setUser(user);
    }
  }, []);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleSaveChange = async () => {
    try {
      await api(true).patch(`comments/${comment.id}`, { content });
      notification('Comment edited', ToastType.SUCCESS);
      setIsEditing(false);
    } catch (err) {
      if (err.response) {
        const {
          response: { data },
        } = err;
        notification(data.message, ToastType.ERROR);
      }
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      await api(true).delete(`comments/${comment.id}`);
      handleCommentDelete(comment.id);
      notification('Comment deleted', ToastType.SUCCESS);
      setIsEditing(false);
    } catch (err) {
      if (err.response) {
        const {
          response: { data },
        } = err;
        notification(data.message, ToastType.ERROR);
      }
    }
  };

  const handlePublicationContentChange = async (text: string) => {
    setContent(text);
  };

  return (
    <Flex flexDirection="column" justifyContent="space-between" sx={{ borderBottom: '2px dashed green' }} my={30}>
      <Flex flexDirection="row" py={20} justifyContent="space-between" width={1}>
        <Flex flexDirection="column">
          <Text color="gray" fontSize={14} fontWeight="bolder">
            {comment.user.name} on
          </Text>
          <Text
            color="black"
            fontSize={12}
            fontWeight="medium"
            sx={{ borderBottom: '1px solid lightGreen' }}
            paddingBottom={10}
            marginTop={10}
          >
            {format(new Date(comment.createdAt), 'MMM dd, yyyy')} says:
          </Text>
        </Flex>
        {user && user.id === comment.user.id ? (
          <Box width={1 / 4}>
            <Button
              variant="primaryTransparent"
              fontSize={14}
              p={0}
              width={1 / 2}
              onClick={() => handleEditButtonClick()}
            >
              Edit comment
            </Button>
            <Button
              variant="dangerTransparent"
              fontSize={14}
              p={0}
              width={1 / 2}
              onClick={() => handleDeleteButtonClick()}
            >
              Delete comment
            </Button>
          </Box>
        ) : null}
      </Flex>

      {isEditing ? (
        <Flex flexDirection="column" alignItems="stretch">
          <Textarea
            onChange={(event) => handlePublicationContentChange(event.target.value)}
            name="Comment"
            height={100}
            color="green"
            my={50}
            value={content}
            sx={{ outline: 'transparent', borderWidth: 1 }}
          />
          <Flex width={1}>
            <Button variant="primaryTransparent" onClick={() => handleSaveChange()}>
              Save changes
            </Button>
            <Button variant="dangerTransparent" onClick={() => handleCancelEditing()}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Text py={25}>{content}</Text>
      )}
    </Flex>
  );
};

export default Comment;
