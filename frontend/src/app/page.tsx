'use client';

import { useState, useCallback } from 'react';
import { generatePassword, getStrength } from './lib/password';

export default function HomePage() {
  const [password, setPassword] = useState(() => generatePassword());
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);

  const strength = getStrength(password);

  const generate = useCallback(() => {
    setPassword(generatePassword({ length, uppercase, lowercase, numbers, symbols, excludeAmbiguous }));
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous]);

  function handleCopy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const toggleClass = (on: boolean) =>
    `relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${on ? 'bg-green-500' : 'bg-gray-600'}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">Password Generator</h1>

        <div className="relative mb-4">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full rounded-lg border border-gray-600 bg-gray-900 py-3 pl-4 pr-20 font-mono text-lg text-white outline-none"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <button
              onClick={handleCopy}
              className="rounded-md bg-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-600 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={generate}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-gray-400">Strength</span>
            <span className="font-medium text-white">{strength.label}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className={`h-full rounded-full transition-all ${strength.color}`}
              style={{ width: `${(strength.score / 6) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Length: {length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-1 w-full cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="space-y-3">
          <ToggleRow label="Uppercase (A-Z)" checked={uppercase} onChange={setUppercase} />
          <ToggleRow label="Lowercase (a-z)" checked={lowercase} onChange={setLowercase} />
          <ToggleRow label="Numbers (0-9)" checked={numbers} onChange={setNumbers} />
          <ToggleRow label="Symbols (!@#$...)" checked={symbols} onChange={setSymbols} />
          <ToggleRow
            label="Exclude Ambiguous"
            checked={excludeAmbiguous}
            onChange={setExcludeAmbiguous}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-600'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </label>
  );
}
