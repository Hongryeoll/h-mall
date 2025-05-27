import { MegaLink, MegaSection, MegaItem } from '@/types/megaMenu';

export const MEGA_MENU: Record<string, MegaItem> = {
  
  MEN: {
    title: 'MEN',
    sections: [
      {
        title: '의류',
        links: [
          { label: '아우터', href: '/men/all' },
          { label: '상의', href: '/men/new' },
          { label: '하의', href: '/men/exclusive' },
          { label: '셋업', href: '/men/exclusive' },
          { label: '셋업', href: '/men/exclusive' },
          { label: '홈웨어', href: '/men/underwear' },
          { label: '언더웨어', href: '/men/underwear' },
          { label: '이너웨어', href: '/men/underwear' },
          { label: '니트웨어', href: '/men/underwear' },
        ],
      },
      {
        title: '가방',
        links: [
          { label: '캐리어,여행가방', href: '/men/bags/all' },
          { label: '보스턴백', href: '/men/bags/all' },
          { label: '크로스백', href: '/men/bags/all' },
          { label: '웨이스트백', href: '/men/bags/all' },
          { label: '토트백', href: '/men/bags/all' },
          { label: '백팩', href: '/men/bags/all' },
        ],
      },
      {
        title: '신발',
        links: [
          { label: '기능화', href: '/men/shoes/all' },
          { label: '스니커즈', href: '/men/shoes/all' },
          { label: '로퍼', href: '/men/shoes/all' },
          { label: '구두', href: '/men/shoes/all' },
          { label: '부츠', href: '/men/shoes/all' },
          { label: '샌들', href: '/men/shoes/all' },
          { label: '슬리퍼', href: '/men/shoes/all' },
        ],
      },
      {
        title: '액세서리',
        links: [
          { label: '파우치', href: '/men/accessories/all' },
          { label: '지갑,카드케이스', href: '/men/accessories/all' },
          { label: '모자', href: '/men/accessories/all' },
          { label: '시계', href: '/men/accessories/all' },
          { label: '아이웨어', href: '/men/accessories/all' },
          { label: '넥타이', href: '/men/accessories/all' },
          { label: '벨트', href: '/men/accessories/all' },
          { label: '양말', href: '/men/accessories/all' },
          { label: '장갑', href: '/men/accessories/all' },
        ],
      },
    ],
  },
  WOMEN: {
    title: 'WOMEN',
    sections: [
      {
        title: '의류',
        links: [
          { label: '상의', href: '/men/all' },
          { label: '바지', href: '/men/new' },
          { label: '원피스', href: '/men/exclusive' },
          { label: '스커트', href: '/men/exclusive' },
          { label: '점프수트', href: '/men/exclusive' },
          { label: '아우터', href: '/men/exclusive' },
          { label: '니트웨어', href: '/men/exclusive' },
          { label: '언더웨어', href: '/men/exclusive' },
          { label: '홈웨어', href: '/men/underwear' },
        ],
      },
      {
        title: '가방',
        links: [
          { label: '캐리어,여행가방', href: '/men/bags/all' },
          { label: '보스턴백', href: '/men/bags/all' },
          { label: '웨이스트백', href: '/men/bags/all' },
          { label: '크로스백', href: '/men/bags/all' },
          { label: '토트백', href: '/men/bags/all' },
          { label: '백팩', href: '/men/bags/all' },
        ],
      },
      {
        title: '신발',
        links: [
          { label: '플랫 슈즈', href: '/men/shoes/all' },
          { label: '로퍼', href: '/men/shoes/all' },
          { label: '부츠', href: '/men/shoes/all' },
          { label: '힐,펌프스', href: '/men/shoes/all' },
          { label: '샌들', href: '/men/shoes/all' },
          { label: '슬리퍼', href: '/men/shoes/all' },
          { label: '스니커즈', href: '/men/shoes/all' },
        ],
      },
      {
        title: '액세서리',
        links: [
          { label: '넥타이', href: '/men/accessories/all' },
          { label: '파우치', href: '/men/accessories/all' },
          { label: '주얼리', href: '/men/accessories/all' },
          { label: '모자', href: '/men/accessories/all' },
          { label: '시계', href: '/men/accessories/all' },
          { label: '지갑,카드케이스', href: '/men/accessories/all' },
          { label: '벨트', href: '/men/accessories/all' },
          { label: '아이웨어', href: '/men/accessories/all' },
          { label: '양말', href: '/men/accessories/all' },
          { label: '장갑', href: '/men/accessories/all' },
        ],
      },
    ],
  },
  INTERIOR: {
    title: 'INTERIOR',
    sections: [
      {
        title: '가구,인테리어',
        links: [
          { label: '홈페브릭', href: '/men/all' },
          { label: '가구', href: '/men/new' },
          { label: '홈데코', href: '/men/exclusive' },
          { label: '침구', href: '/men/underwear' },
          { label: '조명', href: '/men/underwear' },
          { label: '아트,디자인', href: '/men/underwear' },
          { label: '가드닝', href: '/men/underwear' },
          { label: '음반', href: '/men/underwear' },
        ]
      }
    ]
  },
  KITCHEN: {
    title: 'KITCHEN',
    sections: [
      {
        title: '주방,생활',
        links: [
          { label: '저장용기,도시락', href: '/men/all' },
          { label: '주방,싱크용품', href: '/men/new' },
          { label: '냄비,팬,솥', href: '/men/exclusive' },
          { label: '조리도구', href: '/men/underwear' },
          { label: '컵,잔,텀블러', href: '/men/underwear' },
          { label: '그릇,커트러리', href: '/men/underwear' },
          { label: '테이블데코', href: '/men/underwear' },
          { label: '주방잡화', href: '/men/underwear' },
          { label: '주방수납', href: '/men/underwear' },
          { label: '수납정리', href: '/men/underwear' },
          { label: '욕실', href: '/men/underwear' },
          { label: '반려동물', href: '/men/underwear' },
        ]
      }
    ]
  }
};