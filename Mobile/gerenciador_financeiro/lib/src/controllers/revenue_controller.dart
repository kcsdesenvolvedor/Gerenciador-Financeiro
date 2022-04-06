import 'package:flutter/cupertino.dart';
import 'package:gerenciador_financeiro/src/models/expense.dart';
import 'package:gerenciador_financeiro/src/models/revenue.dart';
import 'package:gerenciador_financeiro/src/repositories/expense_repository.dart';
import 'package:gerenciador_financeiro/src/repositories/revenue_repository.dart';

class RevenueController {
  List<Revenue> revenues = [];
  RevenueRepository _revenueRepository = RevenueRepository();
  ValueNotifier<RevenueState> state =
      ValueNotifier<RevenueState>(RevenueState.start);

  RevenueController([RevenueRepository? revenueRepository])
      : _revenueRepository = revenueRepository ?? RevenueRepository();

  Future start() async {
    state.value = RevenueState.loading;
    try {
      revenues = await _revenueRepository.GetRevenueAlls();
      state.value = RevenueState.success;
    } catch (e) {
      state.value = RevenueState.error;
    }
  }
}

enum RevenueState { start, loading, success, error }
