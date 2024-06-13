import AuthContainer from "@/components/auth/AuthContainer";
import SendEmailForm from "@/components/auth/SendEmailForm";

const ForgotPassword = () => {
  return (
    <AuthContainer>
      <SendEmailForm />
    </AuthContainer>
  );
};

export default ForgotPassword;
