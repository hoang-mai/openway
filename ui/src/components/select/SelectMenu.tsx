import React, { CSSProperties, ReactNode } from "react";
import { FloatingPortal } from "@floating-ui/react";
import {
  SelectOptionItem,
  SelectSize,
  SelectColor,
  SelectRadius,
  SelectFilterField,
  SelectFilterLayout,
} from "./types";

import SelectOption from "./SelectOption";
import SelectMenuFilter from "./SelectMenuFilter";
import Empty from "@/components/empty/Empty";
import { EmptyProps } from "@/components/empty/types";
import Spinner from "@/components/icons/Spinner";
import { DEFAULT_Z_INDEX } from "@/constants";
import { getSafeConfig } from "@/utils/function";
import { menuRadiusConfig } from "./constants";

export interface SelectMenuProps<TData = unknown, TFilters extends Record<string, unknown> = Record<string, unknown>> {
  isOpen: boolean;
  isMounted?: boolean;
  animated?: boolean;
  transitionStyles?: CSSProperties;
  options: SelectOptionItem<TData>[];
  selectedValues: (string | number)[];
  activeIndex: number | null;
  size?: SelectSize;
  color?: SelectColor;
  radius?: SelectRadius;
  isLoading?: boolean;
  portal?: boolean;
  maxMenuHeight?: number | string;
  emptyText?: ReactNode;
  emptyProps?: Partial<EmptyProps>;
  menuHeader?: ReactNode;
  menuFooter?: ReactNode;
  listFooter?: ReactNode;
  menuFilters?: SelectFilterField<unknown>[];
  menuFilterValues?: Partial<TFilters>;
  menuFilterLayout?: SelectFilterLayout;
  menuFilterGridCols?: number;
  showResetFilters?: boolean;
  resetFiltersText?: ReactNode;
  onMenuFilterChange?: (name: string, value: unknown) => void;
  onResetFilters?: () => void;
  renderOption?: (option: SelectOptionItem<TData>, state: { selected: boolean; active: boolean }) => ReactNode;
  onSelectOption: (option: SelectOptionItem<TData>) => void;
  onOptionMouseEnter: (index: number) => void;
  floatingStyles: CSSProperties;
  floatingRef: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  listElementsRef: React.RefObject<(HTMLElement | null)[]>;
  className?: string;
}

const DEFAULT_MENU_FILTER_VALUES: Record<string, unknown> = {};

export function SelectMenu<TData = unknown, TFilters extends Record<string, unknown> = Record<string, unknown>>({
  isOpen,
  isMounted,
  animated = true,
  transitionStyles,
  options,
  selectedValues,
  activeIndex,
  size = "md",
  color = "primary",
  radius = "md",
  isLoading = false,
  portal = true,
  maxMenuHeight = 280,
  emptyText,
  emptyProps,
  menuHeader,
  menuFooter,
  listFooter,
  menuFilters,
  menuFilterValues = DEFAULT_MENU_FILTER_VALUES as Partial<TFilters>,
  menuFilterLayout = "vertical",
  menuFilterGridCols = 2,
  showResetFilters = true,
  resetFiltersText,
  onMenuFilterChange,
  onResetFilters,
  renderOption,
  onSelectOption,
  onOptionMouseEnter,
  floatingStyles,
  floatingRef,
  getFloatingProps,
  listElementsRef,
  className = "",
}: SelectMenuProps<TData, TFilters>) {
  const shouldRender = isMounted !== undefined ? isMounted : isOpen;
  if (!shouldRender) return null;

  const menuRadiusClass = getSafeConfig(radius, menuRadiusConfig, "md");

  const menuContent = (
    <div
      ref={floatingRef}
      data-state={isOpen ? "open" : "closed"}
      style={{
        ...floatingStyles,
        ...(animated ? transitionStyles : {}),
        zIndex: DEFAULT_Z_INDEX.SELECT,
      }}
      {...getFloatingProps({
        className: `flex flex-col bg-neutral-white border-2 border-neutral-200 shadow-xl overflow-hidden focus:outline-none min-w-[200px] ${menuRadiusClass} ${className}`,
      })}
    >
      {/* Custom Header */}
      {menuHeader}

      {/* Multi-field Filter Form */}
      {menuFilters && menuFilters.length > 0 && onMenuFilterChange && (
        <SelectMenuFilter
          filters={menuFilters}
          values={menuFilterValues}
          onChange={onMenuFilterChange}
          onReset={onResetFilters}
          layout={menuFilterLayout}
          gridCols={menuFilterGridCols}
          showReset={showResetFilters}
          resetText={resetFiltersText}
          color={color}
          radius={radius}
        />
      )}

      {/* Options List / Empty / Loading */}
      <div
        role="listbox"
        tabIndex={-1}
        style={{
          maxHeight: typeof maxMenuHeight === "number" ? `${maxMenuHeight}px` : maxMenuHeight,
        }}
        className={`p-1 overflow-y-auto overflow-x-hidden space-y-0.5 transition-opacity duration-150 ui-scrollbar ${
          isLoading ? "opacity-75" : "opacity-100"
        }`}
      >
        {options.length === 0 ? (
          isLoading ? (
            <div className="flex items-center justify-center py-6 gap-2 text-zinc-500 text-sm">
              <Spinner className="size-4 animate-spin text-current" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="py-4 px-2">
              <Empty
                size="sm"
                image="search"
                description={emptyText || "No data found"}
                className="py-2"
                {...emptyProps}
              />
            </div>
          )
        ) : (
          <>
            {(() => {
              const selectedValuesSet = new Set(selectedValues);
              return options.map((option, index) => {
                const isSelected = selectedValuesSet.has(option.value);
                const isActive = activeIndex === index;

                return (
                  <SelectOption
                    key={String(option.value)}
                    ref={(node) => {
                      listElementsRef.current[index] = node;
                    }}
                    option={option}
                    isSelected={isSelected}
                    isActive={isActive}
                    size={size}
                    color={color}
                    radius={radius}
                    disabled={option.disabled}
                    renderOption={renderOption}
                    onClick={() => onSelectOption(option)}
                    onMouseEnter={() => onOptionMouseEnter(index)}
                  />
                );
              });
            })()}
            {listFooter}
          </>
        )}
      </div>

      {/* Custom Footer */}
      {menuFooter}
    </div>
  );

  if (portal) {
    return <FloatingPortal>{menuContent}</FloatingPortal>;
  }

  return menuContent;
}

export default SelectMenu;
