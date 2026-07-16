type SearchInputProps = {
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export const SearchInput = ({ searchValue, onSearchChange }: SearchInputProps) => {
    return (
        <div>
            <input
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search todos"
            />
        </div>
    );
};