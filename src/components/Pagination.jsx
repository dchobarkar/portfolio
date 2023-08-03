import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LeftArrow, RightArrow } from '@styled-icons/boxicons-solid';

import PageLink from 'components/PageLink';

const Wrapper = styled.div`
  a {
    filter: drop-shadow(0 0.5px 1px rgba(0, 0, 0, 0.3));
  }
`;

const Arrow = styled(PageLink)`
  svg {
    display: block !important;
  }
`;

const Pagination = ({ path, current, numPages }) => {
  const isFirst = current === 1;
  const isLast = current === numPages;
  const prevPage = current - 1 === 1 ? '/' : (current - 1).toString();
  const nextPage = (current + 1).toString();
  const indices = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <React.Fragment>
      <Wrapper className="flex items-center justify-center w-full text-center m-auto pt-8 z-9999">
        {!isFirst && (
          <Arrow
            className="text-xl text-base-600 w-6 h-6 p-0 hover:text-base-500 mr-4 transition duration-200 ease-in-out"
            to={`/${path}/${prevPage}`}
            label="previous"
            rel="prev"
          >
            <LeftArrow size="1em" />
          </Arrow>
        )}

        <div className="flex align-center justify-center">
          {indices.map((index) => (
            <PageLink
              key={index}
              className={`h-5 rounded-full transition duration-200 ease-in-out cursor-pointer ${
                current === index
                  ? 'w-15 bg-gradient-to-br from-blue-500 to-indigo-600'
                  : 'w-5 bg-base-600 hover:bg-base-500'
              }${index === indices.length ? ' mr-0' : ' mr-5'}`}
              label={`Page ${index}`}
              to={index > 1 ? `/${path}/${index}` : `/${path}`}
            />
          ))}
        </div>

        {!isLast && (
          <Arrow
            className="text-xl text-base-600 w-6 h-6 p-0 hover:text-base-500 ml-4 transition duration-200 ease-in-out"
            to={`/${path}/${nextPage}`}
            label="next"
            rel="next"
          >
            <RightArrow size="1em" />
          </Arrow>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  path: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
};

export default Pagination;
