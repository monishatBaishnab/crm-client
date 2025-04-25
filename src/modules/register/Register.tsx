import { FieldValues } from "react-hook-form";
import Form from "../../components/form/Form";
import FormInput from "../../components/form/FormInput";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { authServices } from "../../lib/axios/services/auth.services";
import { RegisterPayload } from "../../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchemas } from "../../schemas/auth.schemas";
import { Loader } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: (payload: RegisterPayload) =>
      authServices.register(payload as RegisterPayload),
  });

  const handleSubmit = async (data: FieldValues) => {
    mutate({ email: data.email, password: data.password, name: data.name });
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      // Save token to localStorage (if it's in data.result.token or similar)
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
      }
      toast.success("Registration successful.");
      navigate("/");
    } else if (isSuccess && !data?.success) {
      toast.error(data?.message);
    }
  }, [data, isPending, isSuccess, navigate]);
  return (
    <div className="w-screen h-screen bg-[#F8F8F8] flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="shrink-0 min-w-96 min-h-80 bg-white rounded-lg p-10 space-y-5">
        <h2 className="text-xl font-bold text-center">Create Account</h2>
        <Form
          onSubmit={handleSubmit}
          resolver={zodResolver(authSchemas.register)}
        >
          <div className="space-y-3">
            <FormInput
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
            />

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
              className="w-full bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 active:bg-purple-500 rounded-lg"
            >
              {isPending ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" aria-hidden="true" />
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </Form>
        <span className="block text-center text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-500">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
