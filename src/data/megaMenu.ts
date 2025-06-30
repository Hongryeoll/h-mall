import { MegaItem } from '@/types/megaMenu';

export const MEGA_MENU: Record<string, MegaItem> = {
  MEN: {
    title: 'MEN',
    sections: [
      {
        title: '의류',
        slug: 'clothing',
        links: [
          {
            label: '아우터',
            slug: 'outer',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=outer&sub=all',
          },
          {
            label: '상의',
            slug: 'tops',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=tops&sub=all',
          },
          {
            label: '하의',
            slug: 'bottoms',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=bottoms&sub=all',
          },
          {
            label: '셋업',
            slug: 'setups',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=setups&sub=all',
          },
          {
            label: '홈웨어',
            slug: 'homewear',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=homewear&sub=all',
          },
          {
            label: '언더웨어',
            slug: 'underwear',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=underwear&sub=all',
          },
          {
            label: '이너웨어',
            slug: 'innerwear',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=innerwear&sub=all',
          },
          {
            label: '니트웨어',
            slug: 'knitwear',
            href: '/mall/category/list?category=MEN&section=clothing&subsection=knitwear&sub=all',
          },
        ],
      },
      {
        title: '가방',
        slug: 'bag',
        links: [
          {
            label: '캐리어,여행가방',
            slug: 'luggage',
            href: '/mall/category/list?category=MEN&section=bag&subsection=luggage',
          },
          {
            label: '보스턴백',
            slug: 'boston-bag',
            href: '/mall/category/list?category=MEN&section=bag&subsection=boston-bag',
          },
          {
            label: '크로스백',
            slug: 'cross-bag',
            href: '/mall/category/list?category=MEN&section=bag&subsection=crossbody',
          },
          {
            label: '웨이스트백',
            slug: 'waist-bag',
            href: '/mall/category/list?category=MEN&section=bag&subsection=waist-bag',
          },
          {
            label: '토트백',
            slug: 'tote',
            href: '/mall/category/list?category=MEN&section=bag&subsection=tote',
          },
          {
            label: '백팩',
            slug: 'backpack',
            href: '/mall/category/list?category=MEN&section=bag&subsection=backpack',
          },
        ],
      },
      {
        title: '신발',
        slug: 'shoes',
        links: [
          {
            label: '기능화',
            slug: 'functional-shoes',
            href: '/mall/category/list?category=MEN&section=shoes&subsection=functional-shoes',
          },
          {
            label: '스니커즈',
            slug: 'sneakers',
            href: '/mall/category/list?category=MEN&section=shoes&subsection=sneakers',
          },
          {
            label: '로퍼',
            slug: 'loafers',
            href: '/mall/category/list?category=MEN&section=shoes&subsection=loafers',
          },
          {
            label: '구두',
            slug: 'dress-shoes',
            href: '/mall/category/list?category=MEN&section=shoes&subsection=dress-shoes',
          },
          {
            label: '부츠',
            slug: 'boots',
            href: '/mall/category/list?category=MEN&section=shoes&subsection=boots',
          },
          {
            label: '샌들',
            slug: 'sandals',
            href: '/mall/category/list?category=MEN&section=shoes&subsection=sandals',
          },
          {
            label: '슬리퍼',
            slug: 'slippers',
            href: '/mall/category/list?category=MEN&section=shoes&subsection=slippers',
          },
        ],
      },
      {
        title: '액세서리',
        slug: 'accessories',
        links: [
          {
            label: '파우치',
            slug: 'pouch',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=pouch',
          },
          {
            label: '지갑,카드케이스',
            slug: 'wallets',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=wallets',
          },
          {
            label: '모자',
            slug: 'hats',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=hats',
          },
          {
            label: '시계',
            slug: 'watches',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=watches',
          },
          {
            label: '아이웨어',
            slug: 'eyewear',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=eyewear',
          },
          {
            label: '넥타이',
            slug: 'ties',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=ties',
          },
          {
            label: '벨트',
            slug: 'belts',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=belts',
          },
          {
            label: '양말',
            slug: 'socks',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=socks',
          },
          {
            label: '장갑',
            slug: 'gloves',
            href: '/mall/category/list?category=MEN&section=accessories&subsection=gloves',
          },
        ],
      },
    ],
  },
  WOMEN: {
    title: 'WOMEN',
    sections: [
      {
        title: '의류',
        slug: 'clothing',
        links: [
          {
            label: '상의',
            slug: 'tops',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=tops',
          },
          {
            label: '바지',
            slug: 'bottoms',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=bottoms',
          },
          {
            label: '원피스',
            slug: 'dresses',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=dresses',
          },
          {
            label: '스커트',
            slug: 'skirts',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=skirts',
          },
          {
            label: '점프수트',
            slug: 'jumpsuits',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=jumpsuits',
          },
          {
            label: '아우터',
            slug: 'outerwear',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=outerwear',
          },
          {
            label: '니트웨어',
            slug: 'knitwear',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=knitwear',
          },
          {
            label: '언더웨어',
            slug: 'underwear',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=underwear',
          },
          {
            label: '홈웨어',
            slug: 'homewear',
            href: '/mall/category/list?category=WOMEN&section=clothing&subsection=homewear',
          },
        ],
      },
      {
        title: '가방',
        slug: 'bag',
        links: [
          {
            label: '캐리어,여행가방',
            slug: 'luggage',
            href: '/mall/category/list?category=WOMEN&section=bag&subsection=luggage',
          },
          {
            label: '보스턴백',
            slug: 'boston-bag',
            href: '/mall/category/list?category=WOMEN&section=bag&subsection=boston-bag',
          },
          {
            label: '웨이스트백',
            slug: 'waist-bag',
            href: '/mall/category/list?category=WOMEN&section=bag&subsection=waist-bag',
          },
          {
            label: '크로스백',
            slug: 'crossbody',
            href: '/mall/category/list?category=WOMEN&section=bag&subsection=crossbody',
          },
          {
            label: '토트백',
            slug: 'tote',
            href: '/mall/category/list?category=WOMEN&section=bag&subsection=tote',
          },
          {
            label: '백팩',
            slug: 'backpack',
            href: '/mall/category/list?category=WOMEN&section=bag&subsection=backpack',
          },
        ],
      },
      {
        title: '신발',
        slug: 'shoes',
        links: [
          {
            label: '플랫 슈즈',
            slug: 'flats',
            href: '/mall/category/list?category=WOMEN&section=shoes&subsection=flats',
          },
          {
            label: '로퍼',
            slug: 'loafers',
            href: '/mall/category/list?category=WOMEN&section=shoes&subsection=loafers',
          },
          {
            label: '부츠',
            slug: 'boots',
            href: '/mall/category/list?category=WOMEN&section=shoes&subsection=boots',
          },
          {
            label: '힐,펌프스',
            slug: 'heels-pumps',
            href: '/mall/category/list?category=WOMEN&section=shoes&subsection=heels-pumps',
          },
          {
            label: '샌들',
            slug: 'sandals',
            href: '/mall/category/list?category=WOMEN&section=shoes&subsection=sandals',
          },
          {
            label: '슬리퍼',
            slug: 'slippers',
            href: '/mall/category/list?category=WOMEN&section=shoes&subsection=slippers',
          },
          {
            label: '스니커즈',
            slug: 'sneakers',
            href: '/mall/category/list?category=WOMEN&section=shoes&subsection=sneakers',
          },
        ],
      },
      {
        title: '액세서리',
        slug: 'accessories',
        links: [
          {
            label: '넥타이',
            slug: 'ties',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=ties',
          },
          {
            label: '파우치',
            slug: 'pouch',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=pouch',
          },
          {
            label: '주얼리',
            slug: 'jewelry',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=jewelry',
          },
          {
            label: '모자',
            slug: 'hats',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=hats',
          },
          {
            label: '시계',
            slug: 'watches',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=watches',
          },
          {
            label: '지갑,카드케이스',
            slug: 'wallets',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=wallets',
          },
          {
            label: '벨트',
            slug: 'belts',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=belts',
          },
          {
            label: '아이웨어',
            slug: 'eyewear',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=eyewear',
          },
          {
            label: '양말',
            slug: 'socks',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=socks',
          },
          {
            label: '장갑',
            slug: 'gloves',
            href: '/mall/category/list?category=WOMEN&section=accessories&subsection=gloves',
          },
        ],
      },
    ],
  },

  INTERIOR: {
    title: 'INTERIOR',
    sections: [
      {
        title: '가구,인테리어',
        slug: 'interior',
        links: [
          {
            label: '홈페브릭',
            slug: 'home-fabric',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=home-fabric',
          },
          {
            label: '가구',
            slug: 'furniture',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=furniture',
          },
          {
            label: '홈데코',
            slug: 'home-decor',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=home-decor',
          },
          {
            label: '침구',
            slug: 'bedding',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=bedding',
          },
          {
            label: '조명',
            slug: 'lighting',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=lighting',
          },
          {
            label: '아트,디자인',
            slug: 'art-design',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=art-design',
          },
          {
            label: '가드닝',
            slug: 'gardening',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=gardening',
          },
          {
            label: '음반',
            slug: 'media',
            href: '/mall/category/list?category=INTERIOR&section=interior&subsection=media',
          },
        ],
      },
    ],
  },

  KITCHEN: {
    title: 'KITCHEN',
    sections: [
      {
        title: '주방,생활',
        slug: 'kitchen',
        links: [
          {
            label: '저장용기,도시락',
            slug: 'storage-lunchboxes',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=storage-lunchboxes',
          },
          {
            label: '주방,싱크용품',
            slug: 'sink-accessories',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=sink-accessories',
          },
          {
            label: '조리도구',
            slug: 'cooking-tools',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=cooking-tools',
          },
          {
            label: '컵,잔,텀블러',
            slug: 'cups-mugs-tumblers',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=cups-mugs-tumblers',
          },
          {
            label: '그릇,커트러리',
            slug: 'dishes-cutlery',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=dishes-cutlery',
          },
          {
            label: '테이블데코',
            slug: 'table-decor',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=table-decor',
          },
          {
            label: '욕실',
            slug: 'bathroom',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=bathroom',
          },
          {
            label: '반려동물',
            slug: 'pet-supplies',
            href: '/mall/category/list?category=KITCHEN&section=kitchen&subsection=pet-supplies',
          },
        ],
      },
    ],
  },
};
