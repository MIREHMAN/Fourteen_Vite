import {
  axiosUnSecureInstance,
  makeRequest,
  makeUnSecureRequest,
} from "../config/makeRequest";

class CategoryService {
  getAllCategories() {
    return makeUnSecureRequest(`all-categories/`, {
      method: "GET",
    });
  }

 

}

const service = new CategoryService();
export { service as categoryService };
