import 'package:dio/dio.dart';
import 'package:gerenciador_financeiro/shared/Global.dart';
import 'package:gerenciador_financeiro/src/models/expense.dart';

class ExpenseRepository {
  Future<List<Expense>> GetAlls() async {
    var reponse = await Dio().get("${Global.BASE_URL_ENDPOINT}/expense");

    final list = reponse.data as List;

    List<Expense> listExpense = <Expense>[];
    for (var json in list) {
      final expense = Expense.fromJson(json);
      listExpense.add(expense);
    }

    return listExpense;
  }

  Future<Expense> GetExpenseById(String id) async {
    var response = await Dio().get("${Global.BASE_URL_ENDPOINT}/expense/$id");
    final expense = Expense.fromJson(response.data);
    return expense;
  }
}
