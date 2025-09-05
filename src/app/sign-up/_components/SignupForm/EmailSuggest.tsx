import {  useFieldContext } from "@/app/_components/Field";
import { domains } from "@/utils/constants";

export function EmailSuggest() {
  const { value, setValue, showEmailSuggest, setShowEmailSuggest } =
    useFieldContext();

  if (!value) return;
  if (!value.includes("@")) return null;

  const [user, typedDomain] = value.split("@");
  if (!typedDomain) return;

  const suggestions = domains
    .filter((d) => d.startsWith(typedDomain))
    .map((d) => `${user}@${d}`);

  if (suggestions.length === 0) return null;

  const handleSelect = (email: string) => {
    setValue(email);
    setShowEmailSuggest(false);
  };

  if (showEmailSuggest === false) return null;
  return (
    <ul className="w-full absolute top-[80px] left-0 bg-white border border-gray-300 border-t-0 rounded-b-md shadow-md z-50">
      {suggestions.map((email, i) => (
        <li
          key={i}
          className="px-4 py-2 cursor-pointer hover:bg-[var(--color-background-alternative)]"
          onMouseDown={() => handleSelect(email)}
        >
          {email}
        </li>
      ))}
    </ul>
  );
}
