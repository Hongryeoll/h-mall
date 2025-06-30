export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 py-4">
      <div className="max-w-3xl mx-auto px-4 text-center text-hr-b3 text-neutral-500">
        ⓒ {new Date().getFullYear()} Hongryeollim. All rights reserved.
      </div>
    </footer>
  );
}
