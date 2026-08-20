export function PotentialStars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value}/5`}>
      {Array.from({ length: 5 }, (_, i) =>
        i < value ? (
          <span key={i} className="text-rift-gold">
            ★
          </span>
        ) : (
          // An outline star reads clearly at any opacity/contrast, unlike a faded solid
          // one — important when every star in the row is empty (0 potential/reputation).
          <span key={i} className="text-rift-text">
            ☆
          </span>
        ),
      )}
    </div>
  );
}
