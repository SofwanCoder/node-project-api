export enum TransactionSource {
  TRANSFER = "transfer",
  DEPOSIT = "deposit",
  BILL = "bill",
}

export enum TransactionType {
  DEBIT = "debit",
  CREDIT = "credit",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}
