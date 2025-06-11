interface Props {
  id: string;
}

export default function ProductGuideSection({ id }: Props) {
  return (
    <div
      id={id}
      className="h-[600px] flex items-center justify-center text-3xl font-semibold bg-blue-50 border-b border-blue-200"
    >
      상품안내 영역
    </div>
  );
}
