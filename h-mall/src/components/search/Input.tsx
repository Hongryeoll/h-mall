import SearchSVG from '@/assets/icons/search.svg';

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
};

export default function Input({ keyword, setKeyword, onSearch }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative">
      <input
        className="w-full pr-10 outline-none text-hr-h4 font-hr-semi-bold placeholder-hr-gray-40"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button
        onClick={onSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2"
        aria-label="search"
      >
        <SearchSVG width={24} height={24} />
      </button>
    </div>
  );
}
