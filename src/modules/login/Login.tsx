import { FieldValues } from "react-hook-form";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { authServices } from "../../services/auth.services";
import { LoginPayload } from "../../types/auth.types";
import { useEffect } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchemas } from "../../schemas/auth.schemas";
import { Loader } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: (payload: LoginPayload) =>
      authServices.login(payload as LoginPayload),
  });

  const handleSubmit = async (data: FieldValues) => {
    mutate({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      toast.success("Login successful.");
      navigate("/");
    } else if (isSuccess && !data.success) {
      toast.error(data?.message);
    }
  }, [data, isPending, isSuccess, navigate]);

  return (
    <div className="w-screen min-h-screen bg-[#F8F8F8] flex items-center justify-center">
      <div className="shrink-0 min-w-96 min-h-80 bg-white rounded-lg p-10 space-y-5">
        <h2 className="text-xl font-bold text-center">Login To Your Account</h2>
        <Form
          onSubmit={handleSubmit}
          resolver={zodResolver(authSchemas.login)}
          defaultValues={{
            email: "monishat@gmail.com",
            password: "234",
          }}
        >
          <div className="space-y-3">
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email address"
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="Create a password"
            />
            <button
              disabled={isPending}
              className="relative inline-flex w-full min-h-10 items-center justify-center rounded-lg bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600 active:bg-purple-500 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </Form>
        <span className="block text-center text-gray-500">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-purple-500">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
