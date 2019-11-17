import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Articles/List';

class ArticlesListContainer extends Component {
  constructor() {
    super();
    this.state = { error: null, loading: false };
  }

  componentDidMount = () => this.fetchData();

  /**
   * Fetch Data
   */
  fetchData = async ({ forceSync = false, page = 1 } = {}) => {
    const { fetchData, match } = this.props;
    const { page: fetchPage } = match.params || page;

    this.setState({ loading: true, error: null });

    try {
      await fetchData({ forceSync, page: fetchPage });
      this.setState({ loading: false, error: null });
    } catch (err) {
      // Only throw error when can't load any (i.e. page=1) results
      this.setState({ loading: false, error: page === 1 ? err.message : null });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { list, pagination, meta } = this.props;
    const { loading, error } = this.state;

    return (
      <Layout
        list={list}
        meta={meta}
        error={error}
        loading={loading}
        pagination={pagination}
        reFetch={this.fetchData}
      />
    );
  };
}

ArticlesListContainer.propTypes = {
  list: PropTypes.shape().isRequired,
  pagination: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  meta: PropTypes.shape({}).isRequired,
  fetchData: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
};

ArticlesListContainer.defaultProps = {
  match: { params: { id: null } },
};

const mapStateToProps = (state) => ({
  list: state.articles.list || {},
  pagination: state.articles.pagination || {},
  meta: state.articles.meta || [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.articles.fetchList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesListContainer);
