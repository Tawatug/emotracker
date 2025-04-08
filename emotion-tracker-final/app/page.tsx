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
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Emotionstracker (6:00 - 23:00)
      </h1>

      {!submitted && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem' }}>
          <strong>Uhrzeit</strong>
          <strong>Anspannung</strong>
          <strong>Energie</strong>
          <strong>Suchtdruck</strong>

          {data.map((entry) => (
            <>
              <div>{entry.hour}</div>
              <input
                type="number"
                min="0"
                max="10"
                value={entry.anspannung}
                onChange={(e) => updateValue(entry.hour, "anspannung", e.target.value)}
                style={{ padding: '4px', width: '100%' }}
              />
              <input
                type="number"
                min="0"
                max="10"
                value={entry.energie}
                onChange={(e) => updateValue(entry.hour, "energie", e.target.value)}
                style={{ padding: '4px', width: '100%' }}
              />
              <input
                type="number"
                min="0"
                max="10"
                value={entry.suchtdruck}
                onChange={(e) => updateValue(entry.hour, "suchtdruck", e.target.value)}
                style={{ padding: '4px', width: '100%' }}
              />
            </>
          ))}
        </div>
      )}

      {!submitted ? (
        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }} onClick={() => setSubmitted(true)}>
          Auswertung anzeigen
        </button>
      ) : (
        <>
          <LineChart width={800} height={400} data={data} style={{ marginTop: '1rem' }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="anspannung" stroke="#8884d8" name="Anspannung" />
            <Line type="monotone" dataKey="energie" stroke="#82ca9d" name="Energie" />
            <Line type="monotone" dataKey="suchtdruck" stroke="#ff4d4f" name="Suchtdruck" />
          </LineChart>
          <button style={{ marginTop: '1rem', padding: '0.5rem 1rem' }} onClick={reset}>
            Zurück zur Eingabe
          </button>
        </>
      )}
    </div>
  );
}