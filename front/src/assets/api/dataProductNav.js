import ProductInfo from '../../components/product/ProductInfo';
import ProductReview from '../../components/product/ProductReview';
import ProductDetail from '../../components/product/ProductDetail';

const dataProductNav = [
  { name: '주요 정보', component: <ProductInfo /> },
  // 섭취시주의사항, 유통기한, 섭취방법, 보관방법
  { name: '상세 정보', component: <ProductDetail /> },
  // 인허가번호, 업소명, 품목제조번호, 품목명, 보고일자, 성상(자세한 제품형태), 주된기능성, 기준규격, 원재료(리스트), 최초생성일시, 최종수정일시
  { name: '후기', component: <ProductReview /> },
];

export default dataProductNav;
