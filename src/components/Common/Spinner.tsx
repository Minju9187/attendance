export default function Spinner() {
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center">
      <div className="border-bm-red h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
    </div>
  );
}
