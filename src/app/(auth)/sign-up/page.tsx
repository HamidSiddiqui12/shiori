import Register from "@/components/form/register";

function SignUP() {
  return (
    <div className="p-6 w-full">
      <h1 className="font-bold text-3xl text-center">
        New User? Register First
      </h1>
      <Register type="register" />
    </div>
  );
}

export default SignUP;
