export function fetchImages(page, query) {
  const API_KEY = '25743920-c7da85e05a5524610af3b91e0';

  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());
}
