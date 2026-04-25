import { CheckCircle2, AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  status?: 'success' | 'error' | 'default';
  message?: string;
  type?: string;
  required?: boolean;
  icon?: ReactNode;
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  status = 'default',
  message,
  type = 'text',
  required = false,
  icon
}: InputFieldProps) {
  const borderColors = {
    success: 'border-teal-500 ring-teal-500/20',
    error: 'border-red-500 ring-red-500/20',
    default: 'border-gray-700 focus:border-teal-500 focus:ring-teal-500/20'
  };

  const messageColors = {
    success: 'text-teal-400',
    error: 'text-red-400',
    default: 'text-gray-500'
  };

  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1 text-xs font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 text-sm ${icon ? 'pl-8' : ''} bg-[#1a1a1a] border ${borderColors[status]} rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 transition-all`}
        />

        {status !== 'default' && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {status === 'success' && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
            {status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
          </div>
        )}
      </div>

      {message && (
        <p className={`text-xs flex items-center gap-1 ${messageColors[status]}`}>
          {message}
        </p>
      )}
    </div>
  );
}
