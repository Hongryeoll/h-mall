import { JSX, SVGProps } from 'react';

export type TSVGComponentType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export type TBannerParams = {
  seq: string;
  place: 'completeSignup';
  size: 'lg' | 'md' | 'sm' | 'xs';
  items: TBannerParamsItem[];
};

export type TBannerTitle = {
  text: string;
  color: string;
};

export type TBannerParamsItem = {
  type: 'object' | 'thumbnail' | 'full';
  backgroundColor?: string | null;
  textAlign: 'right' | 'left' | 'center';
  isButton: string | null;
  buttonColor: string | null;
  // seq: string;
  bannerSeq: string;
  sdate: string;
  edate: string;
  sort: string;
  target?: string;
  link?: string | null;
  titleBig?: TBannerTitle[] | null;
  titleSmall?: TBannerTitle[] | null;
  html?: string[] | null;
  regDate: string;
  fileImage?: {
    // seq: number;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    // storageSeq: number;
  };
};
