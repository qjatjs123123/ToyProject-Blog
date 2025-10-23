"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function CheckboxGroup({ selectedId = [], onChange, children }: any) {
  const allChecked = (list: any) =>
    list.every((v: any) => selectedId.includes(v));

  const toggle = (id: any) => {
    if (selectedId.includes(id)) {
      onChange(selectedId.filter((v: any) => v !== id));
    } else {
      onChange([...selectedId, id]);
    }
  };

  const toggleAll = (list: any[]) => {
    if (allChecked(list)) onChange([]);
    else onChange([...new Set([...selectedId, ...list])]);
  };

  return children({
    selectedId,
    toggle,
    isChecked: (id: any) => selectedId.includes(id),
    toggleAll,
    allChecked,
  });
}
