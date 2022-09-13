import { Book } from './types/Book';

const API_URL = 'http://localhost:3000/';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => fetch(API_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

export function getPosts() {
  return fetch(`${API_URL}posts`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export function getBook(id: number | null) {
  return fetch(`${API_URL}posts/${id}`)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export const addBook = (newBook: Book) => {
  return client.post<Book>('posts', newBook);
};

interface EditBook {
  id: number,
  title: string | null,
  author: string,
  isbn: string | number,
  category: string,
};

export const updateBook = (
  book: EditBook,
) => {
  return client.patch<Book>(`posts/${book.id}`, book);
};

export const deleteBook = (bookId: number) => {
  return client.delete(`posts/${bookId}`);
};
