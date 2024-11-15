import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const authAxios: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const notAuthAxios: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  //토큰 가져오기
  const access_token = localStorage.getItem("access_token");

  //토큰 할당
  if (config.headers) {
    config.headers.Authorization = access_token ? `Bearer ${access_token}` : "";
  }

  return config;
};

const onErrorRequest = (error: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(error);
};

authAxios.interceptors.request.use(onRequest, onErrorRequest);

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

const onErrorResponse = async (
  error: AxiosError | Error
): Promise<AxiosError> => {
  const _err = error as unknown as AxiosError;
  const { response } = _err; //구조분해할당
  const originalConfig = _err?.config as InternalAxiosRequestConfig; //기존 config 저장

  //토큰 만료
  if (response && response.status === 403) {
    const access_token = localStorage.getItem("access_token"); //만료 토큰
    const refresh_token = localStorage.getItem("refresh_token");
    if (!!refresh_token === false) {
      console.log("Refresh Token 만료");
    } else {
      //api 있다면 api로 변경
      try {
        const data = await notAuthAxios.put("/refresh", {
          headers: {
            Refresh: `Bearer ${refresh_token}`,
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (data) {
          // 새 토큰 저장
          localStorage.setItem("access_token", data.headers.Authorization);
          if (data.headers.Refresh) {
            localStorage.setItem("refresh_token", data.headers.Refresh);
          }

          // 원래 요청 재시도
          return await authAxios.request(originalConfig);
        }
      } catch (error) {
        const _err = error as unknown as AxiosError;
        console.log(_err?.config?.data);
      }
    }
  }
  return Promise.reject(error);
};
authAxios.interceptors.response.use(onResponse, onErrorResponse);
