import { useId } from 'react';
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
  const textareaId = useId();
  const counterId = `${textareaId}-counter`;
  const tools = [
    { icon: Bold, label: 'Negrito' },
    { icon: Italic, label: 'Itálico' },
    { icon: Underline, label: 'Sublinhado' },
    { icon: List, label: 'Lista com marcadores' },
    { icon: ListOrdered, label: 'Lista numerada' },
    { icon: Link2, label: 'Inserir link' },
    { icon: ImageIcon, label: 'Inserir imagem' },
    { icon: AlignLeft, label: 'Alinhar à esquerda' },
  ];

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={textareaId} className="flex items-center gap-1 text-sm font-medium text-slate-200">
          {label}
          {required ? <span className="text-rose-400">*</span> : null}
        </label>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#131923] focus-within:border-emerald-400/80 focus-within:ring-4 focus-within:ring-emerald-500/15">
        <div className="flex flex-wrap items-center gap-1 border-b border-white/8 px-3 py-2.5">
          {tools.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <textarea
          id={textareaId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          maxLength={maxLength}
          aria-describedby={maxLength ? counterId : undefined}
          className="min-h-[118px] w-full resize-none bg-transparent px-4 py-3 text-[15px] text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {maxLength ? (
        <p id={counterId} className="text-right text-sm text-slate-400">
          {value.length}/{maxLength}
        </p>
      ) : null}
    </div>
  );
}
