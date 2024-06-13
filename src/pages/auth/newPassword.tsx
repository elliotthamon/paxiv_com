import AuthContainer from "@/components/auth/AuthContainer";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

const NewPassword = () => {
  return (
    <AuthContainer>
      <NewPasswordForm />
    </AuthContainer>
  );
};

export default NewPassword;
