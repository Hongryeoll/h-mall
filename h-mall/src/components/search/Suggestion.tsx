type Props = {
  keyword: string;
  onClickSuggestion: (suggestion: string) => void;
};

const popularKeywords = [
  '반팔',
  '슬랙스',
  '셔츠',
  '나이키',
  '뉴발란스',
  '가디건',
  '여성 가방',
  '후드집업',
];

const autoSuggestions = ['반팔 셔츠', '반팔 티셔츠', '여성 반팔', '남성 반팔'];

export default function Suggestion({ keyword, onClickSuggestion }: Props) {
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
          <li
            key={item}
            className="text-hr-b2 cursor-pointer hover:underline"
            onClick={() => onClickSuggestion(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
