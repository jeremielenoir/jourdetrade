import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/products");
  }
}

export default new TutorialDataService();
