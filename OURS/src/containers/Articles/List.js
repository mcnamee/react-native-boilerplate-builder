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
    const { fetchData } = this.props;

    this.setState({ loading: true, error: null });

    try {
      await fetchData({ forceSync, page });
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
    const { list } = this.props;
    const { loading, error } = this.state;

    return <Layout error={error} loading={loading} list={list} reFetch={this.fetchData} />;
  };
}

ArticlesListContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.articles.list || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.articles.fetchList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesListContainer);
