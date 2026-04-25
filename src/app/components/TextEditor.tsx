import {
  AlignLeft,
  Bold,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Underline,
} from 'lucide-react';

interface TextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  maxLength?: number;
}

export function TextEditor({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  maxLength,
}: TextEditorProps) {
  const tools = [Bold, Italic, Underline, List, ListOrdered, Link2, ImageIcon, AlignLeft];

  return (
    <div className="space-y-2">
      {label ? (
        <label className="flex items-center gap-1 text-sm font-medium text-slate-200">
          {label}
          {required ? <span className="text-rose-400">*</span> : null}
        </label>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#131923] focus-within:border-emerald-400/80 focus-within:ring-4 focus-within:ring-emerald-500/15">
        <div className="flex flex-wrap items-center gap-1 border-b border-white/8 px-3 py-2.5">
          {tools.map((Icon, index) => (
            <button
              key={index}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="min-h-[118px] w-full resize-none bg-transparent px-4 py-3 text-[15px] text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {maxLength ? (
        <p className="text-right text-sm text-slate-400">
          {value.length}/{maxLength}
        </p>
      ) : null}
    </div>
  );
}
