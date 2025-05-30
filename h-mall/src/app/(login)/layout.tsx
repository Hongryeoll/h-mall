
export default async function LoginGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className="items-center">
        {children}
      </div>
    </>
  );
}
