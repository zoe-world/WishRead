export interface BookDTO {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: string;
  publisher: string;
  sale_price: string;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
  isWatched: boolean;
  isMarked: string | boolean;
}

export interface DetailDTO {
  [key: string]: {
    isMarked: boolean;
    isWatched: boolean;
  };
}
