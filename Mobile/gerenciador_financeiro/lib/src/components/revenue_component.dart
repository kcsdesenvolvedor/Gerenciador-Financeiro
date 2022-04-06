// ignore_for_file: prefer_const_constructors, unnecessary_new, use_key_in_widget_constructors

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:gerenciador_financeiro/src/models/revenue.dart';
import 'package:gerenciador_financeiro/src/repositories/revenue_repository.dart';

class RevenueComponent extends StatefulWidget {
  Revenue _revenue;

  RevenueComponent(Revenue? revenue) : _revenue = revenue ?? Revenue();

  @override
  State<RevenueComponent> createState() => _RevenueComponentState();
}

class _RevenueComponentState extends State<RevenueComponent> {
  dynamic _revenue;

  @override
  void initState() async {
    // TODO: implement initState
    super.initState();

    //_revenue = await getRevenue();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 30, left: 4, right: 4, bottom: 10),
      child: Column(
        children: <Widget>[
          Container(
            width: MediaQuery.of(context).size.width * 0.9,
            height: 100,
            decoration: new BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.all(Radius.circular(40.0)),
            ),
            child: Column(
              children: [
                SizedBox(
                  height: 20,
                ),
                Text(
                  _revenue.description,
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepPurple[500]),
                ),
                SizedBox(
                  height: 10,
                ),
                Padding(
                  padding: const EdgeInsets.only(
                    left: 18,
                    right: 18,
                  ),
                  child: Row(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(right: 60),
                        child: Text(
                          'R\$${_revenue.revenueValue.toString()}',
                          style: TextStyle(
                              color: Colors.deepPurple[500],
                              fontWeight: FontWeight.w500),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(right: 60),
                        child: Text(
                          _revenue.date,
                          style: TextStyle(
                              color: Colors.deepPurple[500],
                              fontWeight: FontWeight.w500),
                        ),
                      ),
                      IconButton(
                        padding: EdgeInsets.all(0),
                        onPressed: () {
                          print('Ola mundo!');
                        },
                        icon: Icon(Icons.delete),
                        color: Colors.deepPurple[500],
                      )
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  /* getRevenue() async {
    var revenueRepository = RevenueRepository();
    var response = await revenueRepository.GetRevenueById(widget._revenueId);

    return response;
  } */
}
