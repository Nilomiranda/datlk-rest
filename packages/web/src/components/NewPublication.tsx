import React, {useState} from 'react';
import styled from 'styled-components';
import {colors, DarkButton, text} from "../common/designSystem";
import {Box, Button, Flex} from 'rebass/styled-components';
import { Textarea } from '@rebass/forms';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  margin: 50px 0;
  background: ${colors.white};
  border-radius: 10px;
  padding: 10px 20px;
  min-width: 70%;
  max-width: 100%;
  min-height: 300px;
  
  textarea {
    margin: 20px 10px;
    flex: 1;
    padding: 10px;
    font-size: ${text.small};
    color: ${colors.green};
    font-weight: bolder;
    outline: none;
    border: 1px solid ${colors.green};
    box-shadow: 0 10px 10px ${colors.lighterGray};
  }
  
  .submit-btn {
    align-self: flex-end;
    width: 30%;
  }
`

export interface NewPublicationProps {
  onChange: (text: string) => void;
  handleSubmit: () => void;
  submitting: boolean;
}

function NewPublication(props: NewPublicationProps) {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { onChange, handleSubmit, submitting } = props;

  function handleValueChange(event: any) {
    const { target: { value } } = event;
    onChange(value);
    if (value.length > 0) {
      setButtonDisabled(false);
    }  else {
      setButtonDisabled(true);
    }
  }

  return (
    <Flex
      flexDirection="column"
      bg="white"
      p={40}
      my={20}
      alignItems="stretch"
      width={['95%', '85%', '70%']}
      sx={{ borderRadius: 'large' }}
    >
      {/*<textarea onChange={event => handleValueChange(event)} />*/}
      <Textarea
        onChange={event => handleValueChange(event)}
        name="Comment"
        height={200}
        color="green"
        sx={{ outline: 'transparent', borderWidth: 1, }}
      />
      <Box width={1/4} my={30} ml="auto">
        <Button disabled={buttonDisabled} variant="primary" onClick={() => handleSubmit()} width={1}>
          {
            submitting ? 'Posting': 'Publish'
          }
        </Button>
      </Box>
    </Flex>
  )
}

export default NewPublication;
