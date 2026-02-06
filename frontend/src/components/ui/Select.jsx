export const Select = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options,
  error,
  required = false 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-neutral-800 border ${
          error ? 'border-red-500' : 'border-neutral-700'
        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200`}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-neutral-800">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
