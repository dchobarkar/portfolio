import React from 'react';
import PropTypes from 'prop-types';

import GlobalStyle from 'styles/global';
import Nav from 'components/Nav';
import SEO from 'components/SEO';
import Footer from 'views/Footer';

const Layout = ({
  nav,
  navLogo,
  windowSize,
  className,
  children,
  ...props
}) => {
  return (
    <React.Fragment>
      <SEO />

      <GlobalStyle />

      <div
        className={`relative w-full${className ? ` ${className}` : ' h-full'}`}
      >
        {nav ? <Nav showLogo={navLogo} windowSize={windowSize} /> : null}
        {children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

Layout.defaultProps = {
  nav: true,
  navLogo: true,
};
Layout.propTypes = {
  nav: PropTypes.bool,
  navLogo: PropTypes.bool,
  windowSize: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
