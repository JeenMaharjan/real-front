import React from "react";
import Helmet from "react-helmet";
import logo from '../src/assests/TST logo.svg'

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <link rel="icon" href={logo} />
      <title>{title}</title>
      <meta name="description" content="TST real estate your trusted partner in real estate, offering expert guidance and personalized service to help you find your perfect home or investment property." />
      <meta name="keywords" content="real estate , real estate in nepal , real estate company in nepal, real estate office near me ,real estate kathmandu," />
      <meta name="robots" content="index,follow" />
    </Helmet>
  );
};

export default MetaData;