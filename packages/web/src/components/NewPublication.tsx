import React, { useState } from 'react';
import { Box, Button, Flex } from 'rebass/styled-components';
import { Textarea } from '@rebass/forms';

export interface NewPublicationProps {
  onChange: (text: string) => void;
  handleSubmit: () => void;
  submitting: boolean;
}

const NewPublication = (props: NewPublicationProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { onChange, handleSubmit, submitting } = props;

  function handleValueChange(event: any) {
    const {
      target: { value },
    } = event;
    onChange(value);
    if (value.length > 0) {
      setButtonDisabled(false);
    } else {
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
      <Textarea
        onChange={(event) => handleValueChange(event)}
        name="Comment"
        height={200}
        color="green"
        sx={{ outline: 'transparent', borderWidth: 1 }}
      />
      <Box width={['50%', '25%']} my={30} ml="auto">
        <Button disabled={buttonDisabled} variant="primary" onClick={() => handleSubmit()} width={1}>
          {submitting ? 'Posting' : 'Publish'}
        </Button>
      </Box>
    </Flex>
  );
};

export default NewPublication;
