interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false
}: TextareaFieldProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1 text-xs font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm bg-[#1a1a1a] border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 rounded-lg text-white placeholder:text-gray-600 focus:outline-none transition-all resize-none"
      />
    </div>
  );
}
