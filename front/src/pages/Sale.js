import React, { useState } from 'react';
import SaleList from '../components/SaleList';
import SaleNav from '../components/SaleNav';
import withPage from './withPage';
import axios from 'axios';
import SaleSort from '../components/SaleSort';

const Sale = () => {
  const [apiData, setApiData] = useState();

  axios
    .get('주소')
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  return (
    <>
      <SaleNav />
      <SaleSort />
      <SaleList />
    </>
  );
};

export default withPage(Sale);
