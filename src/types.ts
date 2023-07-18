export type Data = {quote: string, author: string}
export type Response = {
  id: number,
  language_code: string,
  content: string,
  url: string,
  originator: {id: number, name: string, url: string},
  tags: Array<string>
}
