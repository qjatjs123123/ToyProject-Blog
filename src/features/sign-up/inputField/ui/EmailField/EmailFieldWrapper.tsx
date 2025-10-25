import { useState } from "react";
import { EmailSuggest } from "./EmailSuggest";

type Props = {
  setShowEmailSuggest: React.Dispatch<React.SetStateAction<boolean>>;
};


export function EmailFieldWrapper({
  children,
}: {
  children: (props: Props) => React.ReactNode;
}) {
  const [showEmailSuggest, setShowEmailSuggest] = useState<boolean>(true);

  return (
    <div className="relative">
      {children({ setShowEmailSuggest })}
      {showEmailSuggest && (
        <EmailSuggest setShowEmailSuggest={setShowEmailSuggest} />
      )}
    </div>
  );
}

