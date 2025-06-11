interface Props {
  id: string;
}

export default function ProductReviewSection({ id }: Props) {
  return (
    <div
      id={id}
      className="h-[600px] flex items-center justify-center text-3xl font-semibold bg-yellow-50 border-b border-yellow-200"
    >
      리뷰 영역
    </div>
  );
}
