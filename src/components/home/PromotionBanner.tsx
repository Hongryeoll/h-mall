'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const promotionImages = [
  {
    id: 1,
    src: '/images/promotion/promotion-event-1.svg',
    alt: '기획전 배너 1',
  },
  {
    id: 2,
    src: '/images/promotion/promotion-event-2.svg',
    alt: '기획전 배너 2',
  },
  {
    id: 3,
    src: '/images/promotion/promotion-event-3.svg',
    alt: '기획전 배너 3',
  },
  {
    id: 4,
    src: '/images/promotion/promotion-event-4.svg',
    alt: '기획전 배너 4',
  },
  {
    id: 5,
    src: '/images/promotion/promotion-event-5.svg',
    alt: '기획전 배너 5',
  },
];

export default function PromotionBanner() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-[400px] rounded-md overflow-hidden"
      >
        {promotionImages.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
