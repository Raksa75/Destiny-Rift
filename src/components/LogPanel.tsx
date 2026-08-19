import type { LogEntry } from '../game/types';

const KIND_COLOR: Record<LogEntry['kind'], string> = {
  info: 'border-l-rift-border text-rift-text',
  good: 'border-l-rift-green text-rift-text-bright',
  bad: 'border-l-rift-red text-rift-text-bright',
  season: 'border-l-rift-gold text-rift-gold-bright',
  career: 'border-l-rift-blue text-rift-blue',
};

export function LogPanel({ log }: { log: LogEntry[] }) {
  return (
    <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
      {log.map((entry) => (
        <div
          key={entry.id}
          className={`border-l-2 pl-3 py-1 text-sm ${KIND_COLOR[entry.kind]}`}
        >
          <span className="text-rift-text text-xs mr-2">
            {entry.age} ans · M{entry.month}
          </span>
          {entry.text}
        </div>
      ))}
    </div>
  );
}
