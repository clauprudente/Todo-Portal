import type { TodoStatus } from '@/types/todo';

const options: { value: TodoStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'incomplete', label: 'Incomplete' },
];
type StatusFilterProps = {
  value: TodoStatus;
  onChange: (value: TodoStatus) => void;
};

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <div>
      <label htmlFor="status-filter">Filter by status</label>
      <select
        id="status-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as TodoStatus)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
