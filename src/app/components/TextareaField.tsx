interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  showCounter?: boolean;
  maxLength?: number;
}

export function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  showCounter = false,
  maxLength,
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1 text-sm font-medium text-slate-200">
        {label}
        {required ? <span className="text-rose-400">*</span> : null}
      </label>

      <div className="rounded-2xl border border-white/10 bg-[#131923] p-1 focus-within:border-emerald-400/80 focus-within:ring-4 focus-within:ring-emerald-500/15">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="min-h-[122px] w-full resize-none rounded-[calc(1rem-2px)] bg-transparent px-4 py-3 text-[15px] text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {showCounter && maxLength ? (
        <p className="text-right text-sm text-slate-400">
          {value.length}/{maxLength}
        </p>
      ) : null}
    </div>
  );
}
