import React, { useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard";
import Carousel from "../../Components/Carousel";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../../service/product/productApi";
import Pagination from "../../Components/Pagination";
import Loading from "../../Components/Loading";

const Index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { isLoading, isPending, data, error } = useQuery({
        queryKey: ["productListApi"],
        queryFn: productApi.getProducts,
        staleTime: 5 * 60 * 1000,
        cacheTime: 12 * 60 * 1000,
        refetchOnWindowFocus: true,
    });

    const getDataCarousel = () => {
        return data.slice(0, 3);
    };

    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 1;

    const currentItems = data
        ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) return <Loading />;
    else
        return (
            <div>
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Product Features</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {currentItems.map((product) => (
                            <div key={product.id} className="col mb-4">
                                <ProductCard prod={product} />
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
};

export default Index;
