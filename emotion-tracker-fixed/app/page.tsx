'use client';

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const hours = Array.from({ length: 18 }, (_, i) => `${i + 6}:00`);

const defaultEntry = hours.map((hour) => ({
  hour,
  anspannung: 0,
  energie: 0,
  suchtdruck: 0,
}));

export default function EmotionTracker() {
  const [data, setData] = useState(defaultEntry);
  const [submitted, setSubmitted] = useState(false);

  const updateValue = (hour, field, value) => {
    setData((prev) =>
      prev.map((entry) =>
        entry.hour === hour ? { ...entry, [field]: Number(value) } : entry
      )
    );
  };

  const reset = () => {
    setData(defaultEntry);
    setSubmitted(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Emotionstracker (6:00 - 23:00)</h1>

      {!submitted && (
        <div className="grid grid-cols-4 gap-2">
          <div className="font-semibold">Uhrzeit</div>
          <div className="font-semibold">Anspannung</div>
          <div className="font-semibold">Energie</div>
          <div className="font-semibold">Suchtdruck</div>

          {data.map((entry) => (
            <>
              <div>{entry.hour}</div>
              <input
                type="number"
                min="0"
                max="10"
                value={entry.anspannung}
                onChange={(e) => updateValue(entry.hour, "anspannung", e.target.value)}
                className="border p-1 rounded w-full"
              />
              <input
                type="number"
                min="0"
                max="10"
                value={entry.energie}
                onChange={(e) => updateValue(entry.hour, "energie", e.target.value)}
                className="border p-1 rounded w-full"
              />
              <input
                type="number"
                min="0"
                max="10"
                value={entry.suchtdruck}
                onChange={(e) => updateValue(entry.hour, "suchtdruck", e.target.value)}
                className="border p-1 rounded w-full"
              />
            </>
          ))}
        </div>
      )}

      {!submitted ? (
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setSubmitted(true)}>
          Auswertung anzeigen
        </button>
      ) : (
        <>
          <LineChart width={800} height={400} data={data} className="mt-4">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="anspannung" stroke="#8884d8" name="Anspannung" />
            <Line type="monotone" dataKey="energie" stroke="#82ca9d" name="Energie" />
            <Line type="monotone" dataKey="suchtdruck" stroke="#ff4d4f" name="Suchtdruck" />
          </LineChart>
          <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onClick={reset}>
            Zurück zur Eingabe
          </button>
        </>
      )}
    </div>
  );
}