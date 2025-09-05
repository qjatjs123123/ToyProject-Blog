import PasswordField from "./PasswordField";
import AdditionalSignupForm from "./AdditionalSignupForm";
import { useRef, useState } from "react";
import { BusinessDataProps, FormValues } from '../../types/type';
import { SubmitButtonField } from "./SubmitButtonField";
import BusinessIdField from "./BusinessIdField";


export default function InputForm() {
  const [isAuth, setAuth] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessDataProps>();
  const formData = useRef<FormValues>({
    businessNumber: "",
    userName: "string",
    password: "",
    companyName: "",
    phone: "",
    email: "",
    partnerId: "string",
    birthDate: "",
    isMarketingConsent: true,
    businessNumberVerifyToken: "string",
  })

  return (
    <form>
      <div className="flex flex-col gap-6 mt-8">
        <BusinessIdField formData={formData} isAuth={isAuth} setAuth={setAuth} setBusinessData={setBusinessData}/>
        <PasswordField formData={formData}/>
        
        {isAuth && <AdditionalSignupForm businessData={businessData!} formData={formData}/>}

        <SubmitButtonField formData={formData}/>
      </div>
    </form>
  );
}
