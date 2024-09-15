import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white text-black rounded">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
