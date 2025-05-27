export interface MegaLink {
  label: string;
  href: string;
}

export interface MegaSection {
  /** 예: '의류', '가방', '신발', '액세서리' */
  title: string;
  links: MegaLink[];
}

export interface MegaItem {
  /** 네비게이션 상단에 표시될 레이블: 'MEN', 'WOMEN' 등 */
  title: string;
  sections: MegaSection[];
}