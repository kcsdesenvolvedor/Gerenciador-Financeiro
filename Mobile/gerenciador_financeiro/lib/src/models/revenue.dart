class Revenue {
  final String? Id;
  final String? Description;
  final String? Date;
  final double? RevenueValue;

  Revenue({this.Id, this.Description, this.Date, this.RevenueValue});

  factory Revenue.fromJson(Map<String, dynamic> json) {
    return Revenue(
        Id: json["id"],
        Description: json["description"],
        Date: json["date"],
        RevenueValue: json["revenueValue"]);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data["id"] = Id;
    data["description"] = Description;
    data["date"] = Date;
    data["revenueValue"] = RevenueValue;

    return data;
  }
}
