import { httpClient } from "../../util/util";
import {
    USER_LOGIN,
    TOKEN_AUTHOR,
    setDataJsonStorage,
    setDataTextStorage,
    setCookie,
} from "../../util/utilMethod";

export class UserApi {
    async postRegisterUser(userData) {
        try {
            const res = await httpClient.post("/api/Users/signup", userData);
            return res;
        } catch (error) { }
    }

    async postLoginUser(values) {
        try {
            const res = await httpClient.post("/api/Users/signin", values);
            setDataJsonStorage(USER_LOGIN, res.data.content);
            setDataTextStorage(TOKEN_AUTHOR, res.data.content.accessToken);
            setCookie(TOKEN_AUTHOR, res.data.content.accessToken);
            return res.data;
        } catch (error) { }
    }

    async postOrderCart(orderDetails) {
        try {
            const res = await httpClient.post("/api/Users/order", orderDetails);
            return res.data.content;
        } catch (error) { }
    }

    async postGetProfile() {
        try {
            const res = await httpClient.post("/api/Users/getProfile", {});
            return res.data.content;
        } catch (error) { }
    }

    async postUpdateProfile(profileUpdated) {
        try {
            const res = await httpClient.post(
                "/api/Users/updateProfile",
                profileUpdated
            );
            return res.data.content;
        } catch (error) { }
    }

    async getProductfavoriteUser() {
        try {
            const res = await httpClient.get("/api/Users/getproductfavorite");
            return res.data.content;
        } catch (error) { }
    }

    async getLikeProductUser(id) {
        try {
            const res = await httpClient.get(`/api/Users/like?productId=${id}`);
            return res.data.content;
        } catch (error) { }
    }

    async getUnLikeProductUser(id) {
        try {
            const res = await httpClient.get(`/api/Users/unlike?productId=${id}`);
            return res.data.content;
        } catch (error) { }
    }
}

export const userApi = new UserApi();
