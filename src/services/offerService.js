import {
  axiosUnSecureInstance,
  makeRequest,
  makeUnSecureRequest,
} from "../config/makeRequest";

class OfferService {
  getSpecialOffers() {
    return makeUnSecureRequest(`get-offers/`, {
      method: "GET",
    });
  }

 

}

const service = new OfferService();
export { service as offerService };
