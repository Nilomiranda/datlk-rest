import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../common/api';
import PublicationDetail from '../components/PublicationDetail';
import { Flex, Text } from 'rebass';

const PublicationPage = () => {
  const { id }: { id?: string | undefined } = useParams();
  const [loading, setLoading] = useState(false);
  const [publication, setPublication] = useState();

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
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
  };

  if (loading) {
    return (
      <Flex>
        <Text color="black" fontSize={16} fontWeight="bolder">
          Loading post...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex>{publication ? <PublicationDetail publication={publication} reloadPublication={loadPost} /> : null}</Flex>
  );
};

export default PublicationPage;
