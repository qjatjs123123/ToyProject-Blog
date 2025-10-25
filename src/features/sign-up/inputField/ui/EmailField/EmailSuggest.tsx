import { domains } from "../../config/constants";
import { useFormContext, useWatch } from "react-hook-form";
import { SignUpFormProps } from "../../model/sign-up-form";

type EmailSuggestProps = {
  setShowEmailSuggest: (v: boolean) => void;
};

export function EmailSuggest({ setShowEmailSuggest }: EmailSuggestProps) {
  const { control, setValue } = useFormContext<SignUpFormProps>();
  const value = useWatch({
    control,
    name: "email",
  });

  if (!value) return;
  if (!value.includes("@")) return null;

  const [user, typedDomain] = value.split("@");
  if (!typedDomain) return;

  const suggestions = domains
    .filter((d) => d.startsWith(typedDomain))
    .map((d) => `${user}@${d}`);

  if (suggestions.length === 0) return null;

  const handleSelect = (email: string) => {
    setValue("email", email);
    setShowEmailSuggest(false);
  };

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
