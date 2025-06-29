const popularKeywords = [
  '하네 [Summer.]시어 울 엔케이스 가디건',
  '맥세이프',
  '마틸라',
  '더플백',
  '안경',
  '여성 버뮤다팬츠',
  '나일론 가방',
  '잔스포츠',
  '크롭티',
  '녹섭',
];

const autoSuggestions = [
  '아날로그 손목시계',
  '아날개',
  '아날로그 시계',
  '아날개 수영복',
];

type Props = {
  keyword: string;
};

export default function Suggestion({ keyword }: Props) {
  const suggestions = keyword
    ? autoSuggestions.filter((s) => s.includes(keyword))
    : popularKeywords;

  return (
    <div className="p-4">
      <div className="mb-4 text-hr-b1 font-semibold">
        {keyword ? '추천 검색어' : '인기 검색어'}
      </div>
      <ul className="space-y-3">
        {suggestions.map((item) => (
          <li key={item} className="text-hr-b2 cursor-pointer hover:underline">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
