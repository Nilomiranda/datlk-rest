import React, { useState } from 'react';
import { Post, User } from '../interfaces/interfaces';
import { useHistory } from 'react-router-dom';
import api from '../common/api';
import { Box, Button, Flex, Text } from 'rebass/styled-components';
import { Textarea } from '@rebass/forms';
import { toast } from 'react-toastify';

enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Props = {
  publication: Post;
  user: User;
  handleDelete: (id: number) => void;
};

const Publication = (props: Props) => {
  const { publication, user, handleDelete } = props;
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(publication.content);

  const notification = (msg: string, type?: ToastType) => {
    if (type === ToastType.SUCCESS) {
      toast.success(msg);
    } else if (type === ToastType.ERROR) {
      toast.error(msg);
    } else {
      toast(msg);
    }
  };

  const handleCommentButtonClick = () => {
    history.push(`publication/${publication.id}`, { commenting: true });
  };

  const handleEditButtonClick = (event: any) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await api(true).delete(`publication/${publication.id}`);
      handleDelete(publication.id);
      notification('Post deleted', ToastType.SUCCESS);
    } catch (err) {
      console.error('DEBUG:: Error when deleting publication -> ', err);
      if (err.response) {
        const {
          response: { data },
        } = err;
        notification(data.message);
      }
    }
  };

  const handlePublicationContentChange = (text: string) => {
    console.log(text);
    setContent(text);
  };

  const handleChangesSave = async () => {
    setIsEditing(false);
    try {
      await api(true).patch(`publication/${publication.id}`, { content });
      notification('Publication edited', ToastType.SUCCESS);
    } catch (err) {
      if (err.response) {
        const {
          response: { data },
        } = err;
        notification(data.message);
      }
    }
  };

  const cancelPostEditing = () => {
    setIsEditing(false);
  };

  return (
    <Flex flexDirection="column" bg="white" my={30} p={30} sx={{ borderRadius: 'large' }}>
      <Flex justifyContent="space-between">
        <Box width={1 / 4}>
          <span>{publication.user.name}</span>
          <Button
            variant="primaryTransparent"
            fontSize={14}
            p={0}
            mx={10}
            onClick={() => history.push(`/publication/${publication.id}`)}
          >
            See more
          </Button>
        </Box>
        {user.id === publication.user.id ? (
          <Box width={1 / 4}>
            <Button
              variant="dangerTransparent"
              fontSize={14}
              p={0}
              width={1 / 2}
              onClick={() => handleDeleteButtonClick()}
            >
              Delete post
            </Button>
            <Button
              variant="primaryTransparent"
              fontSize={14}
              p={0}
              width={1 / 2}
              onClick={(event) => handleEditButtonClick(event)}
            >
              Edit post
            </Button>
          </Box>
        ) : null}
      </Flex>
      {isEditing ? (
        <div className="pub-edit-box">
          <Textarea
            onChange={(event) => handlePublicationContentChange(event.target.value)}
            name="Comment"
            height={100}
            color="green"
            my={50}
            value={content}
            sx={{ outline: 'transparent', borderWidth: 1 }}
          />
          <Button
            variant="primaryTransparent"
            fontSize={14}
            p={0}
            width={1 / 4}
            onClick={() => handleChangesSave()}
            disabled={content.length === 0}
          >
            Save changes
          </Button>
          <Button
            variant="dangerTransparent"
            fontSize={14}
            p={0}
            width={1 / 4}
            onClick={() => cancelPostEditing()}
            disabled={content.length === 0}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Text color="black" fontSize={16} my={30}>
          {content}
        </Text>
      )}
      <Flex justifyContent="flex-end" width={1}>
        <Box width={['50%', '25%']}>
          <Button variant="primary" onClick={() => handleCommentButtonClick()} width={1}>
            Comment
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Publication;
