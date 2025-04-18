import React from 'react';

interface NoteEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function NoteEditor({ value, onChange }: NoteEditorProps) {
  return (
    <div className="w-full py-4">
      <h2 className="text-lg font-medium mb-3">Notes</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="How are you feeling today? Any notable events?"
        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>
  );
}