import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../common/api';
import {colors, PageContainer} from "../common/designSystem";
import PublicationDetail from "../components/PublicationDetail";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background: ${colors.white};
  min-height: 100vh;
`

function PublicationPage() {
  const { id }: { id?: string | undefined } = useParams();
  const [loading, setLoading] = useState(false);
  const [publication, setPublication] = useState();

    useEffect(() => {
      loadPost();
    }, [])

    async function loadPost() {
      try {
        setLoading(true);
        const { data } = await api(true).get(`publication/${id}`);
        if (data) {
          setPublication(data);
        }
      } catch (err) {
        console.error('DEBUG:: Error when loading post -> ', err);
      } finally {
        setLoading(false);
      }
    }


  if (loading) {
    return (
      <PageContainer>
        <MainContainer>
          <p>Loading post...</p>
        </MainContainer>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <MainContainer>
        {
          publication ?
            <PublicationDetail publication={publication} reloadPublication={loadPost}/> : null
        }
      </MainContainer>
    </PageContainer>
  )
}

export default PublicationPage;
