export function PotentialStars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < value ? 'text-rift-gold' : 'text-rift-text/35'}>
          ★
        </span>
      ))}
    </div>
  );
}
