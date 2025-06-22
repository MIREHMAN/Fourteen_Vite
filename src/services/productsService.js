import {
  axiosUnSecureInstance,
  makeRequest,
  makeUnSecureRequest,
} from "../config/makeRequest";

class ProductsService {
  getAllProducts() {
    return makeUnSecureRequest(`products/`, {
      method: "GET",
    });
  }

  getHeroItems() {
    return makeUnSecureRequest(`get-hero-items/`, {
      method: "GET",
    });
  }

  getCarouselProducts() {
    return makeUnSecureRequest(`carousel-products/`, {
      method: "GET",
    });
  }
}

const service = new ProductsService();
export { service as productsService };
