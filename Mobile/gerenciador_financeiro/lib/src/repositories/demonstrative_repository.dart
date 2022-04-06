import 'package:dio/dio.dart';
import 'package:gerenciador_financeiro/shared/Global.dart';
import 'package:gerenciador_financeiro/src/models/demonstrative.dart';

class DemonstrativeRepository {
  Future<List<Demonstrative>> GetDemonstrativeAlls() async {
    var response = await Dio().get("${Global.BASE_URL_ENDPOINT}/demonstrative");

    final list = response.data as List;

    List<Demonstrative> listDemonstrative = <Demonstrative>[];
    for (var json in list) {
      var demonstrative = Demonstrative.fromJson(json);
      listDemonstrative.add(demonstrative);
    }

    return listDemonstrative;
  }
}
