import {
  BirthField,
  CompanyField,
  EmailFieldWithSuggest,
  OwnerField,
  PhoneField,
} from "@/features/sign-up/inputFieldForm";

interface AuthSuccessFormProps {
  company: string;
  owner: string;
}

export function AuthSuccessForm({ company, owner }: AuthSuccessFormProps) {
  return (
    <>
      <CompanyField company={company} />
      <OwnerField owner={owner} />
      <BirthField />
      <PhoneField />
      <EmailFieldWithSuggest />
    </>
  );
}
