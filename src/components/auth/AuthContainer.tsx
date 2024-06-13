import BaseContainer from "@/components/BaseContainer";
import Layout from "@/components/Layout";

type AuthContainerProps = {
  children: React.ReactNode;
};

const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <Layout>
      <BaseContainer>
        <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center">
          {children}
        </div>
      </BaseContainer>
    </Layout>
  );
};
export default AuthContainer;
