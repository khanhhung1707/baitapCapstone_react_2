import React from "react";
import ProductCard from "../../Components/ProductCard";

const SearchResult = (props) => {
    let { searchResults, isLoading, isPending, error } = props;

    if (isLoading) return <div>Loading...</div>;
    else
        return (
            <div className="container mt-4">
                <h2 className="text-center mb-4">Search Product</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                            <div key={product.id} className="col mb-4">
                                <ProductCard prod={product} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No results found.</p>
                    )}
                </div>
            </div>
        );
};

export default SearchResult;
