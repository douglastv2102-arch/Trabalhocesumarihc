import { useId, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  status?: 'success' | 'error' | 'default';
  message?: string;
  helperText?: string;
  type?: string;
  required?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  status = 'default',
  message,
  helperText,
  type = 'text',
  required = false,
  icon,
  disabled = false,
}: InputFieldProps) {
  const inputId = useId();
  const descriptionId = `${inputId}-description`;
  const statusClasses = {
    success: 'border-emerald-500/70 focus:border-emerald-400 focus:ring-emerald-500/15',
    error: 'border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/15',
    default: 'border-white/10 focus:border-emerald-400 focus:ring-emerald-500/15',
  };

  const messageClasses = {
    success: 'text-emerald-400',
    error: 'text-rose-400',
    default: 'text-slate-500',
  };

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="flex items-center gap-1 text-sm font-medium text-slate-200">
        {label}
        {required ? <span className="text-rose-400">*</span> : null}
      </label>

      <div className="relative">
        {icon ? (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
        ) : null}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={status === 'error'}
          aria-describedby={message || helperText ? descriptionId : undefined}
          className={[
            'h-14 w-full rounded-2xl bg-[#131923] px-4 text-[15px] text-white outline-none transition',
            'placeholder:text-slate-500 focus:ring-4 disabled:cursor-not-allowed disabled:border-white/5 disabled:bg-[#10151d] disabled:text-slate-500',
            icon ? 'pl-12' : '',
            statusClasses[status],
          ].join(' ')}
        />

        {status !== 'default' ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {status === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-400" />
            )}
          </div>
        ) : null}
      </div>

      {message ? <p id={descriptionId} className={`text-sm ${messageClasses[status]}`}>{message}</p> : null}
      {!message && helperText ? <p id={descriptionId} className="text-sm text-slate-500">{helperText}</p> : null}
    </div>
  );
}
