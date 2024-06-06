import Register from "@/components/form/register";

function Login() {
  return (
    <div className="p-6 w-full">
      <h1 className="font-bold text-3xl text-center">Welcome Back</h1>
      <Register type="login" />
    </div>
  );
}

export default Login;
