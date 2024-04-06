interface IErrorData {
  status: number;
  message: string;
}

class CustomError extends Error {
  public status: number;

  constructor(data: IErrorData) {
    super(data.message);
    this.status = data.status;
  }
}

export { CustomError }