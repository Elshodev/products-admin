import axios from "@/lib/axios";

export const authAPI = {
  login: async (data: {
    login: string;
    password: string;
    subdomain: string;
  }) => {
    const formData = new URLSearchParams();
    formData.append("_username", data.login);
    formData.append("_password", data.password);
    formData.append("_subdomain", data.subdomain);

    const response = await axios.post(
      `/security/auth_check`,
      formData.toString(),
      {
        baseURL: `https://${data.subdomain}.ox-sys.com`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  },
  logout: () => axios.post("/logout"),
};

export const allAPI = {
  productsAPI: {
    getProducts: () => {
      return axios.get("/variations?size=1133");
    },
  },
};
