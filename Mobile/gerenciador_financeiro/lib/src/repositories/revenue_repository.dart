import 'package:gerenciador_financeiro/shared/Global.dart';
import 'package:gerenciador_financeiro/src/models/revenue.dart';
import 'package:dio/dio.dart';

class RevenueRepository {
  Future<List<Revenue>> GetRevenueAlls() async {
    var response = await Dio().get("${Global.BASE_URL_ENDPOINT}/revenue");

    final list = response.data as List;
    List<Revenue> listRevenue = <Revenue>[];

    for (var json in list) {
      var revenue = Revenue.fromJson(json);
      listRevenue.add(revenue);
    }

    return listRevenue;
  }

  Future<Revenue> GetRevenueById(String id) async {
    var response = await Dio().get("${Global.BASE_URL_ENDPOINT}/revenue/$id");

    var expense = Revenue.fromJson(response.data);

    return expense;
  }
}
