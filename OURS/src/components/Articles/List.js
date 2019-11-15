import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import {
  Container, Card, CardItem, Body, Text, Button,
} from 'native-base';
import { Error, Spacer } from '../UI';

const ArticlesList = ({
  error, loading, list, reFetch,
}) => {
  const [page, setPage] = useState(2); // The first 'load more' press shall be page 2

  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  return (
    <Container style={{ padding: 10 }}>
      <FlatList
        data={list}
        onRefresh={() => {
          setPage(2);
          reFetch({ page: 1, forceSync: true });
        }}
        refreshing={loading}
        renderItem={({ item }) => (
          <Card style={{ opacity: item.placeholder ? 0.3 : 1 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => (
                !item.placeholder
                  ? Actions.articlesSingle({ id: item.id, title: item.name })
                  : null
              )}
              style={{ flex: 1 }}
            >
              <CardItem cardBody>
                {!!item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                      overflow: 'hidden',
                      borderRadius: 5,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                )}
              </CardItem>
              <CardItem cardBody>
                <Body style={{ paddingHorizontal: 15 }}>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>{item.name}</Text>
                  <Spacer size={15} />
                  {!!item.excerpt && <Text>{item.excerpt}</Text>}
                  <Spacer size={5} />
                </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
        )}
        keyExtractor={(item) => `${item.id}-${item.name}`}
        ListFooterComponent={() => (
          <React.Fragment>
            <Spacer size={20} />
            <Button
              block
              bordered
              onPress={() => {
                reFetch({ page }).then(() => setPage(page + 1));
              }}
            >
              <Text>Load More</Text>
            </Button>
          </React.Fragment>
        )}
      />

      <Spacer size={20} />
    </Container>
  );
};

ArticlesList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      placeholder: PropTypes.bool,
      id: PropTypes.number,
      name: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.string,
      excerpt: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
  reFetch: PropTypes.func,
};

ArticlesList.defaultProps = {
  error: null,
  reFetch: null,
};

export default ArticlesList;
