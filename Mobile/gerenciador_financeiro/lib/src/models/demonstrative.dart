import 'dart:ffi';

class Demonstrative {
  final String id;
  final dynamic operation;

  Demonstrative({required this.id, required this.operation});

  factory Demonstrative.fromJson(Map<String, dynamic> json) {
    return Demonstrative(id: json['id'], operation: json['operation']);
  }

  Map<String, dynamic> toJson() {
    Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['operation'] = operation;

    return data;
  }
}
