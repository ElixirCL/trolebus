pub type TransactionType {
  Expense
  Deposit
  Alert
  Other
}

pub fn to_string(t: TransactionType) -> String {
  case t {
    Expense -> "expense"
    Deposit -> "deposit"
    Alert -> "alert"
    Other -> "other"
  }
}

pub fn from_string(s: String) -> TransactionType {
  case s {
    "expense" -> Expense
    "deposit" -> Deposit
    "alert" -> Alert
    _ -> Other
  }
}
