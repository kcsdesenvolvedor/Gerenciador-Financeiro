// ignore_for_file: prefer_const_constructors, unnecessary_new

import 'package:flutter/material.dart';
import 'package:gerenciador_financeiro/src/models/expense.dart';
import 'package:gerenciador_financeiro/src/repositories/expense_repository.dart';

class ExpenseComponent extends StatelessWidget {
  Expense _expense;
  //String _expenseId;
  ExpenseComponent(Expense? expense) : _expense = expense ?? Expense();

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
                  _expense.Name ?? "",
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
                          'R\$${_expense.Price.toString()}',
                          style: TextStyle(
                              color: Colors.deepPurple[500],
                              fontWeight: FontWeight.w500),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(right: 60),
                        child: Text(
                          _expense.Date ?? "",
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

  /* getExpense() async {
    var expenseRepository = ExpenseRepository();
    var response = await expenseRepository.GetExpenseById(_expenseId);

    return response;
  } */
}
