import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../components/Articles/List';

class ArticlesListContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null, loading: false, page: parseInt(props.page, 10) || 1,
    };
  }

  componentDidMount = () => this.fetchData();

  /**
   * If the page prop changes, update state
  */
  componentDidUpdate = (prevProps) => {
    const { page } = this.props;
    const { page: prevPage } = prevProps;

    if (page !== prevPage) {
      // eslint-disable-next-line
      this.setState({
        error: null, loading: false, page: parseInt(page, 10) || 1,
      }, this.fetchData);
    }
  }

  /**
   * Fetch Data
   */
  fetchData = async ({ forceSync = false } = {}) => {
    const { fetchData } = this.props;
    const { page } = this.state;

    this.setState({ loading: true, error: null, page: forceSync ? 1 : page });

    try {
      await fetchData({ forceSync, page });
      this.setState({ loading: false, error: null });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { list, pagination, meta } = this.props;
    const { loading, error, page } = this.state;

    return (
      <Layout
        list={list}
        page={page}
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
  meta: PropTypes.shape({}).isRequired,
  fetchData: PropTypes.func.isRequired,
  pagination: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ArticlesListContainer.defaultProps = {
  page: 1,
};

const mapStateToProps = (state) => ({
  list: state.articles.list || {},
  meta: state.articles.meta || [],
  pagination: state.articles.pagination || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.articles.fetchList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesListContainer);
