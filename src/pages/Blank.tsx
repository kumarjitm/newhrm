/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {ContentHeader} from '@components';

const Blank = () => {
  return (
    <div>
      <ContentHeader title="Blank Page" />
      <section className="content">
        <div className="container-fluid">
          Blank
        </div>
      </section>
    </div>
  );
};

export default Blank;
