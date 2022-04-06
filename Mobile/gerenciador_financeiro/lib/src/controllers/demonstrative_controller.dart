import 'package:flutter/cupertino.dart';
import 'package:gerenciador_financeiro/src/models/demonstrative.dart';
import 'package:gerenciador_financeiro/src/repositories/demonstrative_repository.dart';

class DemonstrativeController {
  List<Demonstrative> demonstrative = [];
  DemonstrativeRepository _demonstrativeRepository = DemonstrativeRepository();

  DemonstrativeController([DemonstrativeRepository? demonstrativeRepository])
      : _demonstrativeRepository =
            demonstrativeRepository ?? DemonstrativeRepository();
  ValueNotifier<DemonstrativeState> state =
      ValueNotifier<DemonstrativeState>(DemonstrativeState.start);

  Future start() async {
    state.value = DemonstrativeState.loading;
    try {
      demonstrative = await _demonstrativeRepository.GetDemonstrativeAlls();
      state.value = DemonstrativeState.success;
    } catch (e) {
      state.value = DemonstrativeState.error;
    }
  }
}

enum DemonstrativeState { start, loading, success, error }
