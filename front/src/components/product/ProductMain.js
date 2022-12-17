import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BsBookmarkPlus,
  BsBookmarkCheckFill,
  BsPlusSquareDotted,
  BsCheckSquareFill,
  BsFileEarmarkPlus,
  BsFileEarmarkCheckFill,
} from 'react-icons/bs';
import { FiShare2 } from 'react-icons/fi';
import StarScore from '../reusable/StarScore';
import TableList from '../reusable/TableList';
import productImg from '../../assets/img/testSale.jpeg';
import dataProductMain from '../../assets/api/dataProductMain';
import { MainProduct } from '../../styles/product/product_main';

const ProductMain = () => {
  const navigate = useNavigate();
  let { id: productId } = useParams();

  const { isLoggedIn, userId } = useSelector((state) => state.page);
  const selectedProduct = useSelector((state) => state.product.info);
  const { numberOfReviews, avgScoreOfReviews } = useSelector((state) => state.product.count);

  const [isClicked, setIsClicked] = useState(false);
  const [keyBtns, setKeyBtns] = useState({ isAdded: {}, count: {} });

  const commaToPrice = (price) => {
    if (price < 1000) return price;
    return price.toLocaleString();
  };

  const handleKeyBtns = async (e) => {
    const type = e.target.name || e.target.closest('button').name;
    if (isClicked) return;
    try {
      setIsClicked(true);
      if (isLoggedIn) {
        const { data } = await axios.post('http://localhost:8888/product/changeKeyBtnsOfProdut', {
          userId,
          productId,
          type,
        });
        Object.keys(data).forEach((key) =>
          setKeyBtns((prev) => ({ ...prev, [key]: { ...prev[key], [type]: data[key] } }))
        );
        data.isAdded
          ? window.confirm(`${keyBtnsDetails[type]['name']}에 담았습니다. \n 해당 페이지로 이동하시겠습니까?`) &&
            navigate(keyBtnsDetails[type]['navigate'])
          : alert(`${keyBtnsDetails[type]['name']}에서 삭제되었습니다.`);
      } else {
        alert('로그인해야 사용가능한 서비스입니다!');
        navigate(`/login`);
      }
    } catch (error) {
      alert('오류가 발생했습니다. 잠시 후에 다시 시도해주시기 바랍니다.');
      console.log(error);
    } finally {
      setIsClicked(false);
    }
  };

  const keyBtnsDetails = {
    bookmark: {
      name: '관심상품',
      navigate: '/mypage/bookmark',
      addedIcon: <BsBookmarkCheckFill size={33} color='#00c9b7' />,
      removedIcon: <BsBookmarkPlus size={33} color='#00564A' />,
    },
    comparing: {
      name: '비교함',
      navigate: '/mypage/comparing',
      addedIcon: <BsCheckSquareFill size={29} color='#00c9b7' />,
      removedIcon: <BsPlusSquareDotted size={29} color='#00564A' />,
    },
    taking: {
      name: '복용함',
      navigate: '/mypage/taking',
      addedIcon: <BsFileEarmarkCheckFill size={33} color='#00c9b7' />,
      removedIcon: <BsFileEarmarkPlus size={33} color='#00564A' />,
    },
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsClicked(true);
        const { data } = await axios.post('http://localhost:8888/product/fetchKeyBtnsOfProdut', {
          userId,
          productId,
        });
        setKeyBtns(data);
      } catch (error) {
        alert('오류가 발생했습니다. 잠시 후에 다시 시도해주시기 바랍니다.');
        console.log(error);
      } finally {
        setIsClicked(false);
      }
    };
    if (!userId || !productId) return;
    fetchBookmarks();
  }, [userId, productId]);

  return (
    <MainProduct className='horizontal_flex'>
      <img src={productImg} alt='제품 이미지' />
      <div className='vertical_flex product_primary'>
        <div>
          <h2 className='product_brand'>{selectedProduct.brand}</h2>
          <div className='horizontal_flex product_header'>
            <h1>{selectedProduct.PRDLST_NM}</h1>
            <button className='svg_btns'>
              <FiShare2 title={'공유하기'} size={25} color='#00564A' />
            </button>
          </div>
          <h4 className='product_score'>
            <StarScore size={20} score={avgScoreOfReviews} count={numberOfReviews} />
          </h4>
          <h3>{selectedProduct.price && commaToPrice(selectedProduct.price)}원</h3>
        </div>

        <TableList columns={dataProductMain} datas={selectedProduct} />

        <div className='horizontal_flex key_btns'>
          {Object.keys(keyBtnsDetails).map((btn) => {
            const { name, addedIcon, removedIcon } = keyBtnsDetails[btn];
            return (
              <button key={btn} className='horizontal_flex svg_btns' name={btn} onClick={handleKeyBtns}>
                {keyBtns.isAdded[btn] ? addedIcon : removedIcon}
                <span>{name}</span>
                <span>{keyBtns.count[btn]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </MainProduct>
  );
};

export default ProductMain;
