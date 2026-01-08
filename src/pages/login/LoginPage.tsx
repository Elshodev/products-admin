import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import CustomInput from "@/components/formElements/CustomInput";
import UniversalBtn from "@/components/buttons/UniversalBtn";
import { handleChange } from "@/utils/handleChange";

import Loader from "@/components/Loader";
import { Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, token } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Subdomain'ni localStorage'dan o'qish
  const getStoredSubdomain = () => {
    const stored = localStorage.getItem("subdomain");
    return stored || "";
  };

  const [form, setForm] = useState({
    login: "",
    password: "",
    subdomain: getStoredSubdomain(),
  });

  useEffect(() => {
    const checkExistingAuth = async () => {
      if (token) {
        try {
          navigate("/", { replace: true });
          return;
        } catch (error) {
          console.log("Token invalid:", error);
        }
      }
      setIsCheckingAuth(false);
    };

    checkExistingAuth();
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login(form);

    if (result.success) {
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message || "Ошибка входа!");
    }
  };

  if (isCheckingAuth) {
    return <Loader isFullScreen />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded-2xl p-8 space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-main-black">Вход</h2>
        <CustomInput
          label="Логин"
          placeholder="Логин"
          name="login"
          required
          value={form.login}
          onChange={handleChange(setForm)}
        />
        <CustomInput
          type="password"
          label="Пароль"
          placeholder="Пароль"
          name="password"
          required
          value={form.password}
          inputDivClassname="pr-[30px]"
          onChange={handleChange(setForm)}
        />
        <CustomInput
          label="Subdomain"
          placeholder="Subdomain"
          name="subdomain"
          required
          value={form.subdomain}
          onChange={handleChange(setForm)}
        />
        <UniversalBtn
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 disabled:cursor-not-allowed bg-main-orange rounded justify-center hover:!bg-main-orange/90 disabled:!bg-main-orange/50"
        >
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Войти"}
        </UniversalBtn>
      </form>
    </div>
  );
}
