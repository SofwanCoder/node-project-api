export class HttpException<T = any> extends Error{
  public code: number;
  public message: string;
  public data?: T;

  public constructor(code: number, message: string, data?: T) {
    super(message);
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export default HttpException;
