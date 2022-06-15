import ProductInfo from '../../components/product/ProductInfo';
import ProductReview from '../../components/product/ProductReview';
import ProductAsk from '../../components/product/ProductAsk';
import ProductDetail from '../../components/product/ProductDetail';

const dataProductNav = [
  { name: '상품 정보', component: <ProductInfo /> },
  { name: '후기', component: <ProductReview /> },
  { name: 'Q&A', component: <ProductAsk /> },
  { name: '구매 정보', component: <ProductDetail /> },
];

export default dataProductNav;
