import axios from "axios";
import { TOKEN_AUTHOR, getDataTextStorage } from "./utilMethod";
import { routeLink } from "../App";

export const DOMAIN = "https://shop.cyberlearn.vn";

export const httpClient = axios.create({
    baseURL: DOMAIN,
    timeout: 30000,
});

httpClient.interceptors.request.use(
    (req) => {
        const accessToken = getDataTextStorage(TOKEN_AUTHOR);
        if (req.headers) {
            req.headers.set(
                "Authorization",
                accessToken ? `Bearer ${accessToken}` : ""
            );
        }
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

httpClient.interceptors.response.use(
    (response) => {
        // Xử lý response thành công
        return response;
    },
    (error) => {
        // Xử lý lỗi response
        if (error.response) {
            // Server đã trả về một response nhưng với mã trạng thái lỗi
            switch (error.response.status) {
                case 401:
                    routeLink.push("/");
                    break;
                case 403:
                    break;
                case 404:
                    break;
                case 500:
                    break;
                default:
            }
        } else if (error.request) {
            // Request đã được gửi nhưng không nhận được phản hồi từ server
            console.error("No response received from server.");
        } else {
            // Một số lỗi khác xảy ra trong quá trình thiết lập request
            console.error("Error setting up request: ", error.message);
        }

        return Promise.reject(error);
    }
);
