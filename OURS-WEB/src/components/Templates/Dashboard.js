import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Member from '../../containers/Member/Member';
import Header from '../UI/Header';
import MobileTabBar from '../UI/MobileTabBar';
import Footer from '../UI/Footer';
import PageTitle from '../UI/PageTitle';

const Template = ({ pageTitle, children, noPadding }) => (
  <Fragment>
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>

    <Member Layout={Header} />
    <PageTitle title={pageTitle} />
    <div className={noPadding ? null : 'py-3 py-md-5'}>
      {children}
    </div>
    <Member Layout={MobileTabBar} />
    <Footer />
  </Fragment>
);

Template.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.element.isRequired,
  noPadding: PropTypes.bool,
};

Template.defaultProps = {
  pageTitle: 'AwesomeProject',
  noPadding: false,
};

export default Template;
