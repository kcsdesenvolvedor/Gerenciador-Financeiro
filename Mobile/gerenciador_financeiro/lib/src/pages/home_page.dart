// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors, unnecessary_new, avoid_unnecessary_containers

import 'package:flutter/material.dart';
import 'package:gerenciador_financeiro/src/components/expense_component.dart';
import 'package:gerenciador_financeiro/src/components/revenue_component.dart';
import 'package:gerenciador_financeiro/src/controllers/demonstrative_controller.dart';
import 'package:gerenciador_financeiro/src/controllers/expense_controller.dart';
import 'package:gerenciador_financeiro/src/controllers/revenue_controller.dart';
import 'package:gerenciador_financeiro/src/models/expense.dart';
import 'package:gerenciador_financeiro/src/models/revenue.dart';
import 'package:gerenciador_financeiro/src/repositories/expense_repository.dart';
import 'package:gerenciador_financeiro/src/repositories/revenue_repository.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final expenseController = ExpenseController();
  final demonstrativeController = DemonstrativeController();
  final revenueController = RevenueController();
  final expenseRepository = ExpenseRepository();
  final revenueRepository = RevenueRepository();

  _success() {
    /* var demonstrative = demonstrativeController.demonstrative;

    return ListView.builder(
        itemCount: expenseController.expenses.length,
        itemBuilder: (context, index) {
          var expenses = expenseController.expenses;
          List<Expense> listExpense = <Expense>[];

          for (var item in expenses) {
            listExpense.add(item);
            if ("asd" == "") {
            return Text("data");
          } else {
            return Text("");
          }
          }

          
        }); */
  }

  _error() {
    return Center(
      child: ElevatedButton(
          onPressed: () {
            expenseController.start();
          },
          child: Text(
            'Tentar novamente',
          )),
    );
  }

  _loading() {
    return Center(
      child: CircularProgressIndicator(),
    );
  }

  _start() {
    return Container();
  }

  _managementState(DemonstrativeState state) {
    switch (state) {
      case DemonstrativeState.error:
        return _error();
      case DemonstrativeState.loading:
        return _loading();
      case DemonstrativeState.start:
        return _start();
      case DemonstrativeState.success:
        return _success();
      default:
        return _start();
    }
  }

  getFutureDados() {
    demonstrativeController.start();
    expenseController.start();
    revenueController.start();
    var demonstrative = demonstrativeController.demonstrative;
    List<String> listDemonstrative = <String>[];
    for (var i = 0; i < demonstrative.length; i++) {
      return demonstrative[i].operation[i]["Operação"];
    }
  }

  loadStart() {
    demonstrativeController.start();
    expenseController.start();
    revenueController.start();
  }

  /* _managementState(ExpenseState state) {
    switch (state) {
      case ExpenseState.error:
        return _error();
      case ExpenseState.loading:
        return _loading();
      case ExpenseState.start:
        return _start();
      case ExpenseState.success:
        return _success();
      default:
        return _start();
    }
  } */

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    //demonstrativeController.start();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
          child: SafeArea(
        child: Column(
          children: [
            Container(
              alignment: Alignment.topLeft,
              padding: EdgeInsets.only(left: 4, top: 50, right: 0, bottom: 0),
              margin: EdgeInsets.all(4),
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height * 0.2,
              child: Row(
                children: [
                  Text(
                    'RS 4.000,00',
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.w600,
                      color: Colors.deepPurple[400],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 10),
                    child: IconButton(
                      onPressed: () {},
                      icon: Icon(Icons.add_circle_sharp),
                      color: Colors.black87,
                      iconSize: 28.0,
                    ),
                  )
                ],
              ),
            ),
            Container(
                margin: EdgeInsets.all(4),
                padding: EdgeInsets.all(10),
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height * 0.8,
                decoration: new BoxDecoration(
                    color: Colors.deepPurple[500],
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(40.0),
                      topRight: const Radius.circular(40.0),
                    )),
                child: FutureBuilder(
                    future: getFutureDados(),
                    builder: (context, snapshot) {
                      return ListView.builder(itemBuilder: (context, index) {
                        return Text(snapshot.data.toString());
                      });
                    })),
          ],
        ),
      )),
    );
  }
}
