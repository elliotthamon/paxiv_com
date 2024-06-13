import AuthContainer from "@/components/auth/AuthContainer";
import { useSearchParams } from 'next/navigation'
import CreatePasswordForm from "@/components/auth/CreatePasswordForm";

const Accept = () => {

  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ""
  const code = searchParams.get('code') ?? ""

  return (
    <AuthContainer>
      <CreatePasswordForm email={email} code={code}/>
    </AuthContainer>
  )
}

export default Accept;