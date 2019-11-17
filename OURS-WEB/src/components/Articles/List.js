import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  CardBody,
  Alert,
} from 'reactstrap';
import Template from '../Templates/Dashboard';
import TablePagination from '../UI/TablePagination';

const List = ({
  error, loading, list, pagination, meta, history,
}) => (
  <Template pageTitle="Articles">
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Card>
              <CardBody>
                {!!error && <Alert color="danger">{error}</Alert>}
                {(!!loading && (!list || list.length === 0)) && (
                  <Alert color="warning">Loading...</Alert>
                )}

                <TablePagination
                  pagination={pagination}
                  length={list.length}
                  total={meta.total}
                  loading={loading}
                />

                {(list && list.length > 0) && (
                  <Table hover className="mobile-list-table">
                    <thead className="bg-gray-200">
                      <tr>
                        <th style={{ minWidth: '160px' }}>Title</th>
                        <th style={{ minWidth: '140px' }}>Date Posted</th>
                        <th className="action-column-2">{' '}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((article) => (
                        <tr key={article.id}>
                          { /* eslint-disable-next-line */ }
                          <td
                            className="mobile-list-table-keep"
                            onClick={() => history.push(`/article/${article.id}`)}
                          >
                            {article.name}
                          </td>
                          <td>{article.date}</td>
                          <td className="text-right">
                            <Link
                              to={`/article/${article.id}`}
                              className={`btn btn-sm btn-primary ml-2
                                ${(loading || !!article.placeholder) && 'disabled'}
                              `}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <TablePagination
                  pagination={pagination}
                  length={list.length}
                  total={meta.total}
                  loading={loading}
                />

                <div className="text-center">
                  {(!loading && (!list || list.length === 0)) && (
                    <p>No Articles found</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  </Template>
);

List.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
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
  pagination: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    link: PropTypes.string.isRequired,
  })),
  meta: PropTypes.shape({ total: PropTypes.number }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

List.defaultProps = {
  error: null,
  loading: false,
  pagination: [],
  meta: { total: 0 },
};

export default withRouter(List);
