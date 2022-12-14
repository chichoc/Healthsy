import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BsBookmarkPlus, BsBookmarkCheckFill, BsPlusSquareDotted, BsCheckSquareFill } from 'react-icons/bs';
import { AiOutlineAppstoreAdd, AiFillAppstore } from 'react-icons/ai';
import { FiShare, FiShare2 } from 'react-icons/fi';
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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [countToBookmark, setCountToBookmark] = useState(0);

  const commaToPrice = (price) => {
    if (price < 1000) return price;
    return price.toLocaleString();
  };

  const handleBookMark = async () => {
    if (isClicked) return;
    try {
      setIsClicked(true);
      if (isLoggedIn) {
        const { data } = await axios.post('http://localhost:8888/product/changeBookMarks', {
          userId,
          productId,
        });
        setIsBookmarked(data.isBookmarked);
        setCountToBookmark(data.count);
        window.confirm('관심상품 페이지로 이동하시겠습니까?') && navigate(`/mypage/bookmarks`);
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


  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsClicked(true);
        const { data } = await axios.post('http://localhost:8888/product/fetchKeyBtnsOfProdut', {
          userId,
          productId,
        });
        setIsBookmarked(data.isBookmarked);
        setCountToBookmark(data.count);
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
          <button className='horizontal_flex svg_btns' name='bookmark' onClick={handleBookMark}>
            {isBookmarked ? (
              <BsBookmarkCheckFill size={35} color='#00c9b7' />
            ) : (
              <BsBookmarkPlus size={35} color='#00564A' />
            )}
            <span>관심상품</span>
            {countToBookmark ? <span>{countToBookmark}</span> : ''}
          </button>
          <button className='horizontal_flex svg_btns' name='comparing'>
            <BsPlusSquareDotted size={35} color='#00564A' />
            {/* <BsCheckSquareFill size={35} color='#00c9b7' /> */}
            <span>비교함</span>
          </button>
          <button className='horizontal_flex svg_btns' name='taking'>
            <AiOutlineAppstoreAdd size={35} color='#00564A' />
            {/* <AiFillAppstore size={35} color='#00c9b7' /> */}
            <span>복용함</span>
          </button>
        </div>
      </div>
    </MainProduct>
  );
};

export default ProductMain;
