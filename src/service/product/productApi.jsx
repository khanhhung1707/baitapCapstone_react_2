import { httpClient } from "../../util/util";

export class ProductApi {
    async getProducts() {
        const res = await httpClient.get("/api/Product");
        return res.data.content;
    }

    async getProductByID(id) {
        const res = await httpClient.get(`/api/Product/getbyid?id=${id}`);
        return res.data.content;
    }

    async getProductsPaging(params) {
        let [queryKey, pageIndex] = params.queryKey;
        let pageSize = 10;
        const res = await httpClient.get(
            `/api/Product/getpaging?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );

        return res.data.content;
    }
}

export const productApi = new ProductApi();
