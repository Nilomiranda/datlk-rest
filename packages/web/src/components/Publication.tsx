import React, { useState } from 'react';
import styled from 'styled-components'
import {ActionButton, colors, DangerButton, DarkButton, text} from "../common/designSystem";
import {Post, User} from "../interfaces/interfaces";
import { useHistory } from 'react-router-dom';
import api from '../common/api';
import {Box, Button, Flex, Text} from 'rebass/styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  background: ${colors.white};
  //width: 80%;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  
  .publication-header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .title-wrapper {
    button {
      margin-left: 20px;
    }
  }
  
  .pub-edit-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
    button {
      margin: 20px 0;
    }
  }
  
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
  
  span {
    margin-bottom: 30px;
    font-size: ${text.medium};
    border-bottom: 1px solid ${colors.green}
  }
  
  p {
    padding: 10px;
    margin-bottom: 15px;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  border-top: 1px solid ${colors.lightGray};
  padding: 20px 0;
`

function Publication ({ publication, user, handleDelete }: { publication: Post, user: User, handleDelete: (id: number) => void }) {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(publication.content);

  function handleCommentButtonClick(event: any) {
    // event.stopPropagation();
  }

  function handleEditButtonClick(event: any) {
    event.stopPropagation();
    setIsEditing(true);
  }

  async function handleDeleteButtonClick() {
    try {
      await api(true).delete(`publication/${publication.id}`);
      handleDelete(publication.id);
    } catch (err) {
      console.error('DEBUG:: Error when deleting publication -> ', err);
    }
  }

  function handlePublicationContentChange(text: string) {
    console.log(text);
    setContent(text);
  }

  async function handleChangesSave() {
    setIsEditing(false);
    try {
      const { data } = await api(true).patch(`publication/${publication.id}`, { content });
      console.log('saved post -> ', data);
    } catch (err) {
      console.error('DEBUG:: Error when saving changes -> ', err);
    }
  }

  return (
    <Flex
      flexDirection="column"
      bg="white"
      my={30}
      p={30}
      sx={{ borderRadius: 'large' }}
    >
      <Flex justifyContent="space-between">
        <Box width={1/4}>
          <span>{publication.user.name}</span>
          <Button variant="primaryTransparent" fontSize={14} p={0} mx={10} onClick={() => history.push(`/publication/${publication.id}`)}>See more</Button>
        </Box>
        {
          user.id === publication.user.id ?
            (
              <Box width={1/4}>
                <Button variant="dangerTransparent" fontSize={14} p={0} mx={1} onClick={() => handleDeleteButtonClick()}>Delete post</Button> { '/' }
                <Button variant="primaryTransparent" fontSize={14} p={0} mx={1} onClick={(event) => handleEditButtonClick(event)}>Edit post</Button>
              </Box>
            ) :
            null
        }
      </Flex>
      {
        isEditing ?
          <div className="pub-edit-box">
            <textarea value={content} onChange={event => handlePublicationContentChange(event.target.value)}/>
            <ActionButton disabled={content.length === 0} onClick={() => handleChangesSave()}>Save changes</ActionButton>
          </div> :
          <Text color="black" fontSize={16} my={30}>{content}</Text>
      }
      <Flex justifyContent="flex-end" width={1}>
        <Box width={1/4}>
          <Button variant="primary" width={1} onClick={event => handleCommentButtonClick(event)}>Comment</Button>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Publication;
