// src/data/subTabs.ts
export const SUB_TABS: Record<string, Record<string, { label: string; slug: string }[]>> = {
  MEN: {
    outer: [
      { label: '전체',         slug: 'all'               },
      { label: '플리스',       slug: 'fleece'            },
      { label: '야상',         slug: 'field'             },
      { label: '블루종',       slug: 'blouson'           },
      { label: '바시티',       slug: 'varsity'           },
      { label: '데님 재킷',    slug: 'denim-jacket'      },
      { label: '추천순',       slug: 'recommended'       },
      { label: '퍼 재킷',      slug: 'fur-jacket'        },
      { label: '트레이닝 재킷', slug: 'training-jacket'   },
      { label: '점퍼',         slug: 'jumper'            },
      { label: '바람막이',     slug: 'windbreaker'       },
      { label: '아노락',       slug: 'anorak'            },
      { label: '트렌치',       slug: 'trench'            },
      { label: '맥코트',       slug: 'mack-coat'         },
      { label: '무스탕',       slug: 'mustang'           },
      { label: '나일론 재킷',  slug: 'nylon-jacket'      },
      { label: '코치 재킷',    slug: 'coach-jacket'      },
      { label: '후드 집업',    slug: 'hood-zip-up'       },
      { label: '베스트',       slug: 'vest'              },
      { label: '레더 재킷',    slug: 'leather-jacket'    },
      { label: '블레이저',     slug: 'blazer'            },
      { label: '롱코트',       slug: 'long-coat'         },
      { label: '숏코트',       slug: 'short-coat'        },
      { label: '하프코트',     slug: 'half-coat'         },
      { label: '경량패딩',     slug: 'light-padding'     },
      { label: '숏패딩',       slug: 'short-padding'     },
      { label: '롱패딩',       slug: 'long-padding'      },
      { label: '기타 아우터',  slug: 'other-outer'       },
    ],
    tops: [
      { label: '전체',            slug: 'all'                 },
      { label: '반소매 셔츠',      slug: 'short-sleeve-shirt'  },
      { label: '반소매 티셔츠',    slug: 'short-sleeve-tshirt' },
      { label: '슬리브리스',       slug: 'sleeveless'          },
      { label: '추천순',           slug: 'recommended'         },
      { label: '피케,카라 티셔츠', slug: 'pique-collar-tshirt'},
      { label: '스웨트셔츠',       slug: 'sweatshirt'          },
      { label: '집업',             slug: 'zip-up'              },
      { label: '후디',             slug: 'hoodie'              },
      { label: '긴소매 티셔츠',    slug: 'long-sleeve-tshirt'  },
      { label: '긴소매 셔츠',      slug: 'long-sleeve-shirt'   },
    ],
    bottoms: [
      { label: '전체',            slug: 'all'               },
      { label: '부츠컷',          slug: 'bootcut'           },
      { label: '레깅스',          slug: 'leggings'          },
      { label: '쇼트',            slug: 'shorts'            },
      { label: '슬림 팬츠',       slug: 'slim-pants'        },
      { label: '추천순',          slug: 'recommended'       },
      { label: '스트레이트 팬츠', slug: 'straight-pants'    },
      { label: '와이드 팬츠',     slug: 'wide-pants'        },
      { label: '데님 팬츠',       slug: 'denim-pants'       },
      { label: '트레이닝 팬츠',   slug: 'training-pants'    },
      { label: '슬랙스',          slug: 'slacks'            },
      { label: '코튼 팬츠',       slug: 'cotton-pants'       },
      { label: '기타 팬츠',       slug: 'other-pants'        },
    ],
    homewear: [
      { label: '전체', slug: 'all'          },
      { label: '상의', slug: 'tops'         },
      { label: '하의', slug: 'bottoms'      },
      { label: '세트', slug: 'sets'         },
      { label: '로브', slug: 'robes'        },
      { label: '추천순', slug: 'recommended' },
    ],
    setups: [
      { label: '전체',             slug: 'all'                      },
      { label: '수트 셋업',         slug: 'suit-setup'               },
      { label: '기타 상하의 셋업',  slug: 'other-setup'              },
      { label: '스웻/트레이닝 셋업', slug: 'sweat-training-setup'     },
      { label: '추천순',             slug: 'recommended'              },
    ],
    innerwear: [
      { label: '전체',        slug: 'all'          },
      { label: '팬티',        slug: 'panties'      },
      { label: '언더셔츠',     slug: 'undershirt'   },
      { label: '내의,내복',    slug: 'long-johns'   },
      { label: '추천순',       slug: 'recommended'  },
    ],
    knitwear: [
      { label: '전체',        slug: 'all'          },
      { label: '터틀넥',      slug: 'turtleneck'   },
      { label: '브이넥',      slug: 'v-neck'       },
      { label: '기타 니트',   slug: 'other-knit'   },
      { label: '크루넥',      slug: 'crewneck'     },
      { label: '폴로 셔츠',   slug: 'polo-shirt'   },
      { label: '추천순',       slug: 'recommended'  },
    ],





    bag: [
      /* … */
    ],
  },
  WOMEN: {
    outer: [
      { label: '전체',   slug: 'all' },
      { label: '트렌치', slug: 'trench' },

    ],
  },
  // INTERIOR, KITCHEN...
};