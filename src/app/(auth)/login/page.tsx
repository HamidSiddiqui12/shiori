import Register from "@/components/form/register";

function Login() {
  return (
    <div className="w-full p-6">
      <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
      <Register type="login" />
    </div>
  );
}

export default Login;
