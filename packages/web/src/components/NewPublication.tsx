import React, {useState} from 'react';
import styled from 'styled-components';
import {colors, DarkButton, text} from "../common/designSystem";

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
    <MainContainer>
      <textarea onChange={event => handleValueChange(event)} />
      <DarkButton className="submit-btn" disabled={buttonDisabled} onClick={() => handleSubmit()}>
        {
          submitting ? 'Posting': 'Publish'
        }
      </DarkButton>
    </MainContainer>
  )
}

export default NewPublication;
