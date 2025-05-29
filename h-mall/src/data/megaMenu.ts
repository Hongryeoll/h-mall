import { MegaLink, MegaSection, MegaItem } from '@/types/megaMenu';

export const MEGA_MENU: Record<string, MegaItem> = {

  MEN: {
    title: 'MEN',
    sections: [
      {
        title: '의류',
        slug: 'clothing',
        links: [
          { label: '아우터',        slug: 'outer',        href: '/category/list?category=MEN&section=clothing&subsection=outer' },
          { label: '상의',         slug: 'tops',          href: '/category/list?category=MEN&section=clothing&subsection=tops' },
          { label: '하의',         slug: 'bottoms',       href: '/category/list?category=MEN&section=clothing&subsection=bottoms' },
          { label: '셋업',         slug: 'setups',        href: '/category/list?category=MEN&section=clothing&subsection=setups' },
          { label: '홈웨어',        slug: 'homewear',      href: '/category/list?category=MEN&section=clothing&subsection=homewear' },
          { label: '언더웨어',      slug: 'underwear',      href: '/category/list?category=MEN&section=clothing&subsection=underwear' },
          { label: '이너웨어',      slug: 'innerwear',      href: '/category/list?category=MEN&section=clothing&subsection=innerwear' },
          { label: '니트웨어',      slug: 'knitwear',       href: '/category/list?category=MEN&section=clothing&subsection=knitwear' },
        ],
      },
      { title: '가방',
        slug: 'bag',
        links: [
          { label: '캐리어,여행가방',    slug: 'luggage',         href: '/category/list?category=MEN&section=bag&subsection=luggage' },
          { label: '보스턴백',         slug: 'boston-bag',       href: '/category/list?category=MEN&section=bag&subsection=boston-bag' },
          { label: '크로스백',         slug: 'cross-bag',        href: '/category/list?category=MEN&section=bag&subsection=crossbody' },
          { label: '웨이스트백',        slug: 'waist-bag',       href: '/category/list?category=MEN&section=bag&subsection=waist-bag' },
          { label: '토트백',          slug: 'tote',             href: '/category/list?category=MEN&section=bag&subsection=tote' },
          { label: '백팩',            slug: 'backpack',        href: '/category/list?category=MEN&section=bag&subsection=backpack' },
        ],
      },
      {
        title: '신발',
        slug: 'shoes',
        links: [
          { label: '기능화',         slug: 'functional-shoes',  href: '/category/list?category=MEN&section=shoes&subsection=functional-shoes' },
          { label: '스니커즈',        slug: 'sneakers',          href: '/category/list?category=MEN&section=shoes&subsection=sneakers' },
          { label: '로퍼',          slug: 'loafers',           href: '/category/list?category=MEN&section=shoes&subsection=loafers' },
          { label: '구두',          slug: 'dress-shoes',        href: '/category/list?category=MEN&section=shoes&subsection=dress-shoes' },
          { label: '부츠',          slug: 'boots',              href: '/category/list?category=MEN&section=shoes&subsection=boots' },
          { label: '샌들',          slug: 'sandals',            href: '/category/list?category=MEN&section=shoes&subsection=sandals' },
          { label: '슬리퍼',         slug: 'slippers',          href: '/category/list?category=MEN&section=shoes&subsection=slippers' },
        ],
      },
      {
        title: '액세서리',
        slug: 'accessories',
        links: [
          { label: '파우치',         slug: 'pouch',      href: '/category/list?category=MEN&section=accessories&subsection=pouch' },
          { label: '지갑,카드케이스', slug: 'wallets',    href: '/category/list?category=MEN&section=accessories&subsection=wallets' },
          { label: '모자',           slug: 'hats',       href: '/category/list?category=MEN&section=accessories&subsection=hats' },
          { label: '시계',           slug: 'watches',    href: '/category/list?category=MEN&section=accessories&subsection=watches' },
          { label: '아이웨어',       slug: 'eyewear',    href: '/category/list?category=MEN&section=accessories&subsection=eyewear' },
          { label: '넥타이',         slug: 'ties',       href: '/category/list?category=MEN&section=accessories&subsection=ties' },
          { label: '벨트',           slug: 'belts',      href: '/category/list?category=MEN&section=accessories&subsection=belts' },
          { label: '양말',           slug: 'socks',      href: '/category/list?category=MEN&section=accessories&subsection=socks' },
          { label: '장갑',           slug: 'gloves',     href: '/category/list?category=MEN&section=accessories&subsection=gloves' },
        ],
      },
    ]
  },
  WOMEN: {
    title: 'WOMEN',
    sections: [
      {
        title: '의류',
        slug: 'clothing',
        links: [
          { label: '상의',     slug: 'tops',       href: '/category/list?category=WOMEN&section=clothing&subsection=tops' },
          { label: '바지',     slug: 'bottoms',    href: '/category/list?category=WOMEN&section=clothing&subsection=bottoms' },
          { label: '원피스',   slug: 'dresses',    href: '/category/list?category=WOMEN&section=clothing&subsection=dresses' },
          { label: '스커트',   slug: 'skirts',     href: '/category/list?category=WOMEN&section=clothing&subsection=skirts' },
          { label: '점프수트', slug: 'jumpsuits',  href: '/category/list?category=WOMEN&section=clothing&subsection=jumpsuits' },
          { label: '아우터',   slug: 'outerwear',  href: '/category/list?category=WOMEN&section=clothing&subsection=outerwear' },
          { label: '니트웨어', slug: 'knitwear',   href: '/category/list?category=WOMEN&section=clothing&subsection=knitwear' },
          { label: '언더웨어', slug: 'underwear',  href: '/category/list?category=WOMEN&section=clothing&subsection=underwear' },
          { label: '홈웨어',   slug: 'homewear',   href: '/category/list?category=WOMEN&section=clothing&subsection=homewear' },
        ],
      },
      {
        title: '가방',
        slug: 'bag',
        links: [
          { label: '캐리어,여행가방', slug: 'luggage',    href: '/category/list?category=WOMEN&section=bag&subsection=luggage' },
          { label: '보스턴백',       slug: 'boston-bag', href: '/category/list?category=WOMEN&section=bag&subsection=boston-bag' },
          { label: '웨이스트백',     slug: 'waist-bag',  href: '/category/list?category=WOMEN&section=bag&subsection=waist-bag' },
          { label: '크로스백',       slug: 'crossbody',  href: '/category/list?category=WOMEN&section=bag&subsection=crossbody' },
          { label: '토트백',         slug: 'tote',       href: '/category/list?category=WOMEN&section=bag&subsection=tote' },
          { label: '백팩',           slug: 'backpack',   href: '/category/list?category=WOMEN&section=bag&subsection=backpack' },
        ],
      },
      {
        title: '신발',
        slug: 'shoes',
        links: [
          { label: '플랫 슈즈',  slug: 'flats',          href: '/category/list?category=WOMEN&section=shoes&subsection=flats' },
          { label: '로퍼',      slug: 'loafers',        href: '/category/list?category=WOMEN&section=shoes&subsection=loafers' },
          { label: '부츠',      slug: 'boots',          href: '/category/list?category=WOMEN&section=shoes&subsection=boots' },
          { label: '힐,펌프스', slug: 'heels-pumps',   href: '/category/list?category=WOMEN&section=shoes&subsection=heels-pumps' },
          { label: '샌들',      slug: 'sandals',        href: '/category/list?category=WOMEN&section=shoes&subsection=sandals' },
          { label: '슬리퍼',    slug: 'slippers',       href: '/category/list?category=WOMEN&section=shoes&subsection=slippers' },
          { label: '스니커즈',  slug: 'sneakers',       href: '/category/list?category=WOMEN&section=shoes&subsection=sneakers' },
        ],
      },
      {
        title: '액세서리',
        slug: 'accessories',
        links: [
          { label: '넥타이',         slug: 'ties',      href: '/category/list?category=WOMEN&section=accessories&subsection=ties' },
          { label: '파우치',         slug: 'pouch',     href: '/category/list?category=WOMEN&section=accessories&subsection=pouch' },
          { label: '주얼리',         slug: 'jewelry',   href: '/category/list?category=WOMEN&section=accessories&subsection=jewelry' },
          { label: '모자',           slug: 'hats',      href: '/category/list?category=WOMEN&section=accessories&subsection=hats' },
          { label: '시계',           slug: 'watches',   href: '/category/list?category=WOMEN&section=accessories&subsection=watches' },
          { label: '지갑,카드케이스', slug: 'wallets',   href: '/category/list?category=WOMEN&section=accessories&subsection=wallets' },
          { label: '벨트',           slug: 'belts',     href: '/category/list?category=WOMEN&section=accessories&subsection=belts' },
          { label: '아이웨어',       slug: 'eyewear',   href: '/category/list?category=WOMEN&section=accessories&subsection=eyewear' },
          { label: '양말',           slug: 'socks',     href: '/category/list?category=WOMEN&section=accessories&subsection=socks' },
          { label: '장갑',           slug: 'gloves',    href: '/category/list?category=WOMEN&section=accessories&subsection=gloves' },
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
          { label: '홈페브릭',    slug: 'home-fabric',  href: '/category/list?category=INTERIOR&section=interior&subsection=home-fabric' },
          { label: '가구',        slug: 'furniture',    href: '/category/list?category=INTERIOR&section=interior&subsection=furniture' },
          { label: '홈데코',      slug: 'home-decor',   href: '/category/list?category=INTERIOR&section=interior&subsection=home-decor' },
          { label: '침구',        slug: 'bedding',      href: '/category/list?category=INTERIOR&section=interior&subsection=bedding' },
          { label: '조명',        slug: 'lighting',     href: '/category/list?category=INTERIOR&section=interior&subsection=lighting' },
          { label: '아트,디자인', slug: 'art-design',   href: '/category/list?category=INTERIOR&section=interior&subsection=art-design' },
          { label: '가드닝',      slug: 'gardening',    href: '/category/list?category=INTERIOR&section=interior&subsection=gardening' },
          { label: '음반',        slug: 'media',        href: '/category/list?category=INTERIOR&section=interior&subsection=media' },
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
          { label: '저장용기,도시락', slug: 'storage-lunchboxes',   href: '/category/list?category=KITCHEN&section=kitchen&subsection=storage-lunchboxes' },
          { label: '주방,싱크용품',   slug: 'sink-accessories',     href: '/category/list?category=KITCHEN&section=kitchen&subsection=sink-accessories' },
          { label: '조리도구',        slug: 'cooking-tools',        href: '/category/list?category=KITCHEN&section=kitchen&subsection=cooking-tools' },
          { label: '컵,잔,텀블러',    slug: 'cups-mugs-tumblers',   href: '/category/list?category=KITCHEN&section=kitchen&subsection=cups-mugs-tumblers' },
          { label: '그릇,커트러리',    slug: 'dishes-cutlery',       href: '/category/list?category=KITCHEN&section=kitchen&subsection=dishes-cutlery' },
          { label: '테이블데코',      slug: 'table-decor',          href: '/category/list?category=KITCHEN&section=kitchen&subsection=table-decor' },
          { label: '욕실',            slug: 'bathroom',             href: '/category/list?category=KITCHEN&section=kitchen&subsection=bathroom' },
          { label: '반려동물',        slug: 'pet-supplies',         href: '/category/list?category=KITCHEN&section=kitchen&subsection=pet-supplies' },
        ],
      },
    ],
  },
};