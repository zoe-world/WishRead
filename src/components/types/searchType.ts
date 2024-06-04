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
  watch: boolean;
  isMarked: string | boolean;
}
