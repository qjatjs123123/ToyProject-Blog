'use client'

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

  const toggleAll = (list: any) => {
    onChange(list);
  };

  return children({
    selectedId,
    toggle,
    isChecked: (id: any) => selectedId.includes(id),
    // clear: () => onChange([]),
    toggleAll,
    allChecked,
  });
}
