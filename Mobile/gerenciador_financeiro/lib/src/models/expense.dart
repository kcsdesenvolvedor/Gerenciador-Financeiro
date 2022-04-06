// ignore_for_file: non_constant_identifier_names

import 'dart:core';
import 'dart:ffi';

class Expense {
  final String? id;
  final String? Name;
  final String? Date;
  final double? Price;
  final List<dynamic>? Tag;
  final String? Image;
  final String? Annotation;

  Expense(
      {this.id,
      this.Name,
      this.Date,
      this.Price,
      this.Tag,
      this.Image,
      this.Annotation});

  factory Expense.fromJson(Map<String, dynamic> json) {
    return Expense(
        id: json['id'],
        Name: json['name'],
        Date: json['date'],
        Price: json['price'],
        Tag: json['tag'],
        Image: json['image'],
        Annotation: json['annotation']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['Name'] = Name;
    data['Date'] = Date;
    data['Price'] = Price;
    data['Tag'] = Tag;
    data['Image'] = Image;
    data['Annotation'] = Annotation;

    return data;
  }
}
