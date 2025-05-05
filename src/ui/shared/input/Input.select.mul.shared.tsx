import { useState, useRef, useEffect } from 'react';
import { Check, ArrowDown, X } from 'lucide-react';
import { DataSelect } from '../../../domain';

interface MultiSelectProps {
  options: DataSelect[];
  selectedValues: DataSelect[];
  onChange: (selected: DataSelect[]) => void;
  placeholder?: string;
  className?: string;
  name: string;
  label?: string;
    isValid?: boolean;
}

export const MultiSelect = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Seleccione opciones...',
  className = '',
    name,
    label,
    isValid = false
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleItem = (item: DataSelect) => {
    const isSelected = selectedValues.some(selected => selected.id === item.id);
    if (isSelected) {
      onChange(selectedValues.filter(selected => selected.id !== item.id));
    } else {
      onChange([...selectedValues, item]);
    }
  };

  const removeItem = (item: DataSelect, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter(selected => selected.id !== item.id));
  };

  const isSelected = (item: DataSelect) => {
    return selectedValues.some(selected => selected.id === item.id);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
        {label && (
                <label className={`block text-gray-700 font-semibold mb-2 ${ isValid && `text-red-500`}`} htmlFor={String(name)}>
                    {label}
                </label>
            )}
      <div
        className={`flex flex-wrap items-center min-h-6 p-2 border rounded-md cursor-pointer gap-2 shadow-sm transition-all duration-200 ${
          isOpen ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-600 '
        }`}
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => {
            const input = wrapperRef.current?.querySelector('input');
            input?.focus();
          }, 0);
        }}
      >
        {selectedValues.length > 0 ? (
          selectedValues.map(item => (
            <span
              key={item.id}
              className="flex items-center px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200 bg-teal-200 border text-teal-800 text-sm font-medium"
            >
              {item.name}
              <button
                type="button"
                onClick={e => removeItem(item, e)}
                className="ml-2 hover:opacity-25 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}

        {isOpen && (
          <input
          name={String(name)}
          id={String(name)}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-grow min-w-[120px] outline-none bg-transparent text-sm text-gray-800"
            placeholder="Buscar..."
            autoComplete="off"
          />
        )}

        <ArrowDown
          className={`ml-auto w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.id}
                  onClick={() => toggleItem(option)}
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors ${
                    isSelected(option)
                      ? 'bg-blue-50 text-blue-800 font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="mr-3 w-4">
                    {isSelected(option) ? <Check className="w-4 h-4 text-blue-600" /> : null}
                  </span>
                  {option.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No se encontraron resultados</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
