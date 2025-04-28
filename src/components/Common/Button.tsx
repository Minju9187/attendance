export default function Button({ handleClick }) {
  return (
    <button
      className="bg-bm-red mt-10 rounded-lg px-4 py-2 transition hover:brightness-90"
      onClick={handleClick}
    >
      Button
    </button>
  );
}
