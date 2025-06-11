interface Props {
  id: string;
}

export default function ProductQnASection({ id }: Props) {
  return (
    <div
      id={id}
      className="h-[600px] flex items-center justify-center text-3xl font-semibold bg-green-50"
    >
      Q&A 영역
    </div>
  );
}
