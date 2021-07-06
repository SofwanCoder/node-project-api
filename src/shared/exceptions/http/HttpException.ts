export class HttpException extends Error {
  public code: number;
  public message: string;
  public data: string | undefined;

  public constructor(code: number, message: string, data?: string) {
    super(message);
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export default HttpException;
