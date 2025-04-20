import { useLanguage } from '../hooks/useLanguage';

interface NoteEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function NoteEditor({ value, onChange }: NoteEditorProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full py-6 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('notes')}</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('notes_placeholder')}
        className="w-full min-h-[120px] rounded-md border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
      />
    </div>
  );
}