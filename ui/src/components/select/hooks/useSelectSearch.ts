import { useState, useMemo } from "react";
import { SelectOptionItem, SelectSearchMode, SelectFilterField } from "../types";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { rankAndFilterItems } from "@/utils/function";

export interface UseSelectSearchOptions<
  TData = unknown,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> {
  options: SelectOptionItem<TData>[];
  searchMode?: SelectSearchMode;
  controlledSearchValue?: string;
  onSearchChange?: (val: string) => void;
  searchField?:
    | (keyof SelectOptionItem<TData> | string | ((item: SelectOptionItem<TData>) => string | undefined | null))[]
    | (keyof SelectOptionItem<TData> | string);
  menuFilters?: SelectFilterField<unknown>[];
  controlledFilterValues?: Partial<TFilters>;
  onMenuFilterChange?: (filters: TFilters) => void;
  onSearch?: (query: string, filters: TFilters) => void | Promise<void>;
  debounceMs?: number;
  filterFn?: (option: SelectOptionItem<TData>, query: string, filters: TFilters) => boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  preserveSelected?: boolean;
  selectedValues?: (string | number)[];
  historicalOptions?: Map<string | number, SelectOptionItem<TData>>;
}

export interface UseSelectSearchReturn<
  TData = unknown,
  TFilters extends Record<string, unknown> = Record<string, unknown>,
> {
  searchInput: string;
  handleSearchChange: (val: string) => void;
  resetSearch: () => void;
  currentFilters: TFilters;
  handleFilterChange: (name: string, val: unknown) => void;
  handleResetFilters: () => void;
  filteredOptions: SelectOptionItem<TData>[];
}

const DEFAULT_SELECTED_VALUES: (string | number)[] = [];

export function useSelectSearch<TData = unknown, TFilters extends Record<string, unknown> = Record<string, unknown>>({
  options,
  searchMode = "client",
  controlledSearchValue,
  onSearchChange,
  searchField = ["label", "value"],
  menuFilters,
  controlledFilterValues,
  onMenuFilterChange,
  onSearch,
  debounceMs = 300,
  filterFn,
  isOpen,
  setIsOpen,
  preserveSelected = false,
  selectedValues = DEFAULT_SELECTED_VALUES,
  historicalOptions,
}: UseSelectSearchOptions<TData, TFilters>): UseSelectSearchReturn<TData, TFilters> {
  const [uncontrolledSearch, setUncontrolledSearch] = useState("");
  const isSearchControlled = controlledSearchValue !== undefined;
  const searchInput = isSearchControlled ? controlledSearchValue : uncontrolledSearch;

  // Filter values
  const [internalFilters, setInternalFilters] = useState<Partial<TFilters>>(() => {
    const initial: Record<string, unknown> = {};
    menuFilters?.forEach((f) => {
      if (f.defaultValue !== undefined) {
        initial[f.name] = f.defaultValue;
      }
    });
    return initial as Partial<TFilters>;
  });

  const currentFilters = (controlledFilterValues ?? internalFilters) as TFilters;

  // Server search debounce
  const { debounced, cancel } = useDebouncedCallback((query: string, filters: TFilters) => {
    if (searchMode === "server") {
      onSearch?.(query, filters);
    }
  }, debounceMs);

  const handleSearchChange = (val: string) => {
    if (!isSearchControlled) {
      setUncontrolledSearch(val);
    }
    onSearchChange?.(val);
    if (!isOpen) {
      setIsOpen(true);
    }
    debounced(val, currentFilters);
  };

  const resetSearch = () => {
    cancel();
    if (!isSearchControlled) {
      setUncontrolledSearch("");
    }
    onSearchChange?.("");
    if (searchMode === "server") {
      onSearch?.("", currentFilters);
    }
  };

  const handleFilterChange = (name: string, val: unknown) => {
    const nextFilters = {
      ...currentFilters,
      [name]: val,
    } as TFilters;

    if (!controlledFilterValues) {
      setInternalFilters(nextFilters);
    }
    onMenuFilterChange?.(nextFilters);
    debounced(searchInput, nextFilters);
  };

  const handleResetFilters = () => {
    const resetValues: Record<string, unknown> = {};
    menuFilters?.forEach((f) => {
      if (f.defaultValue !== undefined) {
        resetValues[f.name] = f.defaultValue;
      }
    });
    if (!controlledFilterValues) {
      setInternalFilters(resetValues as Partial<TFilters>);
    }
    onMenuFilterChange?.(resetValues as TFilters);
    debounced(searchInput, resetValues as TFilters);
  };

  // Filtered options (client mode)
  const filteredOptions = useMemo(() => {
    if (searchMode === "server") {
      return options;
    }

    let list = options;
    const keyword = searchInput.trim();

    if (keyword) {
      if (filterFn) {
        list = list.filter((opt) => filterFn(opt, searchInput, currentFilters));
      } else {
        list = rankAndFilterItems(list, keyword, searchField);
      }
    } else if (filterFn) {
      list = list.filter((opt) => filterFn(opt, searchInput, currentFilters));
    }

    // Preserve selected items (matching CheckboxGroup pattern)
    if (preserveSelected && keyword && selectedValues.length > 0 && historicalOptions) {
      const matchedSet = new Set(list.map((item) => item.value));
      const preserved: SelectOptionItem<TData>[] = [];
      for (const val of selectedValues) {
        if (!matchedSet.has(val)) {
          const cached = historicalOptions.get(val);
          if (cached) {
            preserved.push(cached);
          }
        }
      }
      if (preserved.length > 0) {
        list = [...preserved, ...list];
      }
    }

    return list;
  }, [
    options,
    searchMode,
    searchInput,
    filterFn,
    currentFilters,
    searchField,
    preserveSelected,
    selectedValues,
    historicalOptions,
  ]);

  return {
    searchInput,
    handleSearchChange,
    resetSearch,
    currentFilters,
    handleFilterChange,
    handleResetFilters,
    filteredOptions,
  };
}
