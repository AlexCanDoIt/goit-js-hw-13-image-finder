const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20676418-087852e37819860cce9abe695';

export default class ApiService {
  constructor() {
    this.queryValue = '';
    this.queryPage = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.queryValue}&page=${this.queryPage}&per_page=12`;

    return fetch(url)
      .then(response => response.json())
      .then(images => {
        this.incrementPage();
        return images;
      });
  }

  incrementPage() {
    this.queryPage += 1;
  }

  resetPage() {
    this.queryPage = 1;
  }

  get query() {
    return this.queryValue;
  }

  set query(newQueryValue) {
    this.queryValue = newQueryValue;
  }
}
