import SearchSVG from '@/assets/icons/search.svg';

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
};

export default function Input({ keyword, setKeyword }: Props) {
  return (
    <div className="relative">
      <input
        className="
          w-full pr-10 outline-none 
          text-hr-h4 font-hr-semi-bold 
          placeholder-hr-gray-40
          focus:outline-none
        "
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        autoFocus
      />
      <SearchSVG
        width={24}
        height={24}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-black"
      />
    </div>
  );
}
