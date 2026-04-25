import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  AlignLeft
} from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextEditor({ value, onChange, placeholder, rows = 4 }: TextEditorProps) {
  const tools = [
    { icon: Bold, label: 'Negrito' },
    { icon: Italic, label: 'Itálico' },
    { icon: Underline, label: 'Sublinhado' },
    { icon: List, label: 'Lista' },
    { icon: ListOrdered, label: 'Lista numerada' },
    { icon: Link2, label: 'Link' },
    { icon: ImageIcon, label: 'Imagem' },
    { icon: AlignLeft, label: 'Alinhar' },
  ];

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-[#1a1a1a]">
      <div className="flex items-center gap-1 p-2 border-b border-gray-700 bg-[#0f0f0f]">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <button
              key={index}
              type="button"
              className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              title={tool.label}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 bg-[#1a1a1a] text-sm text-white placeholder:text-gray-600 focus:outline-none resize-none"
      />
    </div>
  );
}
