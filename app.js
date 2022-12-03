const mysql = require('mysql');
const express = require('express')
var request = require('request');
const app = express()
const port = 5000
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1kD^vB5',
    database: 'project01',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/account', (req, res) => {
    mysqlConnection.query('SELECT * FROM account', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
app.post('/account-add', (req, res) => {
    let account = req.body;
    var sql = "SET @AccountNumber = ?;SET @CustomerID = ?;SET @BranchCode = ?;SET @AccountTypeID = ?;SET @Balance = ?;SET @LastActiveDate = ?;SET @OpenDate = ?; \
        CALL AccountAdd(@AccountNumber,@CustomerID,@BranchCode,@AccountTypeID,@Balance,@LastActiveDate,@OpenDate);"
    mysqlConnection.query(sql,[account.account_number, account.customer_id, account.branch_code, account.account_type_id, parseFloat(account.balance), account.last_active_date, account.open_date], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/account_type', (req, res) => {
    mysqlConnection.query('SELECT * FROM account_type', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/account_type-add', (req, res) => {
    let account_type = req.body;
    var sql = "SET @AccountTypeID = ?;SET @InterestRate = ?;SET @MinBalance = ?;SET @Plan = ?;SET @AccountType = ?;SET @WithdrawalsPerMonth = ?; \
        CALL AccountTypeAdd(@AccountTypeID,@InterestRate,@MinBalance,@Plan,@AccountType,@WithdrawalsPerMonth);"
    mysqlConnection.query(sql,[account_type.account_type_id, account_type.interest_rate, account_type.min_balance, account_type.plan, account_type.account_type, account_type.withdrawals_per_month], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/borrower', (req, res) => {
    mysqlConnection.query('SELECT * FROM borrower', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/borrower-add', (req, res) => {
    let borrower = req.body;
    var sql = "SET @CustomerID = ?;SET @LoanNumber = ?; \
        CALL BorrowerAdd(@CustomerID,@LoanNumber);"
    mysqlConnection.query(sql,[borrower.customer_id, borrower.loan_number], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/branch', (req, res) => {
    mysqlConnection.query('SELECT * FROM branch', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/branch-add', (req, res) => {
    let branch = req.body;
    var sql = "SET @BranchCode = ?;SET @BranchCity = ?;SET @Assets = ?;SET @Address = ?;SET @BranchManager = ?; \
        CALL BranchAdd(@BranchCode,@BranchCity,@Assets,@Address,@BranchManager);"
    mysqlConnection.query(sql,[branch.branch_code, branch.branch_city, branch.assets, branch.address, branch.branch_manager], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/buisness', (req, res) => {
    mysqlConnection.query('SELECT * FROM buisness', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/buisness-add', (req, res) => {
    let buisness = req.body;
    var sql = "SET @CustomerID = ?;SET @Alliance = ?;SET @IncorpDate = ?; \
        CALL BuisnessAdd(@CustomerID,@Aliance,@IncorpDate);"
    mysqlConnection.query(sql,[buisness.customer_id, buisness.alliance, buisness.incorp_date], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/customer', (req, res) => {
    mysqlConnection.query('SELECT * FROM customer', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/customer-add', (req, res) => {
    let customer = req.body;
    var sql = "SET @CustomerID = ?;SET @CustomerName = ?;SET @CustomerCity = ?;SET @CustomerStreet = ?;SET @Gender = ?;SET @Address = ?; \
        CALL CustomerAdd(@CustomerID,@CustomerName,@CustomerCity,@CustomerStreet,@Gender,@Address);"
    mysqlConnection.query(sql,[customer.customer_id, customer.customer_name, customer.customer_city, customer.customer_street, customer.gender, customer.address], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/customer_branch', (req, res) => {
    mysqlConnection.query('SELECT * FROM customer_branch', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/customer_branch-add', (req, res) => {
    let account = req.body;
    var sql = "SET @CustomerBranchID = ?;SET @CustomerID = ?;SET @BranchCode = ?; \
        CALL CustomerBranchAdd(@CustomerBranchID,@CustomerID,@BranchCode);"
    mysqlConnection.query(sql,[customer_branch.customer_branch_id, customer_branch.customer_id, customer_branch.branch_code], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/employee', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/employee-add', (req, res) => {
    let employee = req.body;
    var sql = "SET @EmployeeID = ?;SET @BranchCode = ?;SET @EmployeeName = ?; \
        CALL EmployeeAdd(@EmployeeID,@BranchCode,@EmployeeName);"
    mysqlConnection.query(sql,[employee.employee_id, employee.branch_code, employee.employee_name], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/individual', (req, res) => {
    mysqlConnection.query('SELECT * FROM individual', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/individual-add', (req, res) => {
    let individual = req.body;
    var sql = "SET @CustomerID = ?;SET @DateOfBirth = ?;SET @FirstName = ?;SET @LastName = ?; \
        CALL IndividualAdd(@CustomerID,@DateOFBirth,@FirstName,@LastName);"
    mysqlConnection.query(sql,[individual.customer_id, individual.date_of_birth, individual.first_name, individual.last_name], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/loan', (req, res) => {
    mysqlConnection.query('SELECT * FROM loan', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/loan-add', (req, res) => {
    let loan = req.body;
    var sql = "SET @LoanNumber = ?;SET @BranchCode = ?;SET @LoanTypeID = ?;SET @LoanDuration = ?;SET @InterestRate = ?;SET @StartDate = ?;SET @DueDate = ?;SET @IsPersonal = ?;SET @IsOnline = ?; \
        CALL LoanAdd(@LoanNumber,@BranchCode,@LoanTypeID,@LoanDuration,@InterestRate,@StartDate,@DueDate,@IsPersonal,@IsOnline);"
    mysqlConnection.query(sql,[loan.loan_number, loan.branch_code, loan.loan_type_id, loan.loan_duration, loan.interest_rate, loan.start_date, loan.due_date, loan.is_personal, loan.is_online], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/loan_payment', (req, res) => {
    mysqlConnection.query('SELECT * FROM loan_payment', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/loan_payment-add', (req, res) => {
    let loan_payment = req.body;
    var sql = "SET @PaymentID = ?;SET @LoanNumber = ?;SET @PaymentReferenceNumber = ?;SET @PaymentDate = ?;SET @PaymentAmount = ?;SET @PaymentStatus = ?;SET @Remarks = ?; \
        CALL LoanPaymentAdd(@PaymentID,@LoanNumber,@PaymentReferenceNumber,@PaymentDate,@PaymentAmount,@PaymentStatus,@Remarks);"
    mysqlConnection.query(sql,[loan_payment.payment_id, loan_payment.loan_number, loan_payment.payment_reference_number, loan_payment.payment_date, loan_payment.payment_amount, loan_payment.payment_status, loan_payment.remarks], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/loan_type', (req, res) => {
    mysqlConnection.query('SELECT * FROM loan_type', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/loan_type-add', (req, res) => {
    let loan_type = req.body;
    var sql = "SET @LoanTypeID = ?;SET @Type = ?;SET @Description = ?;SET @BaseAmount = ?;SET @InterestRate = ?; \
        CALL LoanTypeAdd(@LoanTypeID,@Type,@Description,@BaseAmount,@InterestRate);"
    mysqlConnection.query(sql,[loan_type.loan_type_id, loan_type.type, loan_type.description, loan_type.base_amount, loan_type.interest_rate], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/transaction', (req, res) => {
    mysqlConnection.query('SELECT * FROM transaction', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else
            console.log(err);
    })
});
app.post('/transaction-add', (req, res) => {
    let transaction = req.body;
    var sql = "SET @TransactionID = ?;SET @AccountNumber = ?;SET @TransactionDescription = ?;SET @Amount = ?;SET @TransactionTimestamp = ?;SET @ExecutionBranchCode = ?; \
        CALL TransactionAdd(@TransactionID,@AccountNumber,@TransactionDescription,@Amount,@TransactionTimestamp,@ExecutionBranchCode);"
    mysqlConnection.query(sql,[transaction.transaction_id, transaction.account_number, transaction.transaction_description, transaction.amount, transaction.transaction_timestamp, transaction.execution_branch_code], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
