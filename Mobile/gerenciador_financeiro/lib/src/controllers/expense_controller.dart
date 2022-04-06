import 'package:flutter/cupertino.dart';
import 'package:gerenciador_financeiro/src/models/expense.dart';
import 'package:gerenciador_financeiro/src/repositories/expense_repository.dart';

class ExpenseController {
  List<Expense> expenses = [];
  ExpenseRepository _expenseRepository = ExpenseRepository();
  ValueNotifier<ExpenseState> state =
      ValueNotifier<ExpenseState>(ExpenseState.start);

  ExpenseController([ExpenseRepository? expenseRepository])
      : _expenseRepository = expenseRepository ?? ExpenseRepository();

  Future start() async {
    state.value = ExpenseState.loading;
    try {
      expenses = await _expenseRepository.GetAlls();
      state.value = ExpenseState.success;
    } catch (e) {
      state.value = ExpenseState.error;
    }
  }
}

enum ExpenseState { start, loading, success, error }
