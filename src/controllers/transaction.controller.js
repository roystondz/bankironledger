const mongoose = require('mongoose');
const UserAccount = require('../models/account.model');
const Transaction = require('../models/transaction.model');
const emailService = require('../services/email.service');
const LedgerEntry = require('../models/ledger.model');
const User = require('../models/user.model');

async function createTransaction(req, res) {
    const {amount, fromAccount, toAccount,idempotencyKey} = req.body;

    if(!amount || !fromAccount || !toAccount || !idempotencyKey) {
        return res.status(400).json({message: 'Missing required fields'});
    }

    const fromUserAccount = await UserAccount.findOne({_id: fromAccount});
    const toUserAccount = await UserAccount.findOne({_id: toAccount});
    
    if(!fromUserAccount || !toUserAccount) {
        return res.status(400).json({message: 'Invalid account numbers'});
    }

    const isTransactionAlreadyExists = await Transaction.findOne({idempotencyKey: idempotencyKey});
    
    if(isTransactionAlreadyExists) {
        if(isTransactionAlreadyExists.status === 'COMPLETED') {
            return res.status(200).json({message: 'Transaction already completed',
                transaction: isTransactionAlreadyExists
            });
        }
        if(isTransactionAlreadyExists.status === 'FAILED') {
            return res.status(500).json({message: 'Transaction already exists and has failed'
            });
        }
        if(isTransactionAlreadyExists.status==='REVERSED') {
            return res.status(200).json({message: 'Transaction already exists and is reversed'
            });
        }
        return res.status(200).json({message: 'Transaction already exists and is in progress'
        });

    }


    if (fromUserAccount.status !== 'ACTIVE') {
        return res.status(400).json({message: 'From account is not active'});
    }
    
    if (toUserAccount.status !== 'ACTIVE') {
        return res.status(400).json({message: 'To account is not active'});
    }


    const balanceData = await fromUserAccount.getBalance();

    if (balanceData < amount) {
        return res.status(400).json({message: `Insufficient balance. Current balance: ${balanceData}`});
    }   
    

    const session = await mongoose.startSession();
    session.startTransaction();

    const transaction = new Transaction({
        amount,
        fromAccount,
        toAccount,
        idempotencyKey
    });

    const debitLedgerEntry = await LedgerEntry.create([{
        account: fromAccount,
        transaction: transaction._id,
        amount: amount,
        type: 'DEBIT'
    }], {session});

    const creditLedgerEntry = await LedgerEntry.create([{
        account: toAccount,
        transaction: transaction._id,
        amount: amount,
        type: 'CREDIT'
    }], {session});

    transaction.status = 'COMPLETED';
    await transaction.save({session});

    await session.endSession();


    await emailService.sendTransactionMail(req.user.email, req.user.name, amount, toAccount);

    return res.status(200).json({message: 'Transaction completed successfully',
        transaction
    });
    
}

async function createInitalTransaction(req, res) {
    const { toAccount, amount , idempotencyKey} = req.body;
    
    if(!amount || !toAccount || !idempotencyKey) {
        return res.status(400).json({message: 'Amount, toAccount and idempotencyKey are required'});
    }

    const toUserAccount = await UserAccount.findOne({_id: toAccount});
    
    if (!toUserAccount) {
        return res.status(400).json({message: 'To account not found'});
    }

    const systemUser = await User.findOne({
        systemUser: true,
    }); 

    if (!systemUser) {
        return res.status(400).json({message: 'System user not found'});
    }

    const fromUserAccount = await UserAccount.findOne({
        userId: systemUser._id
    }); 

    if (!fromUserAccount) {
        return res.status(400).json({message: 'System user account not found'});
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();

    const transaction = new Transaction({
        amount,
        fromAccount: fromUserAccount._id,
        toAccount: toAccount,
        idempotencyKey: idempotencyKey
    });

    const debitLedgerEntry = await LedgerEntry.create([{
        account: fromUserAccount._id,
        transaction: transaction._id,
        amount: amount,
        type: 'DEBIT'
    }], {session});

    const creditLedgerEntry = await LedgerEntry.create([{
        account: toAccount,
        transaction: transaction._id,
        amount: amount,
        type: 'CREDIT'
    }], {session});

    transaction.status = 'COMPLETED';
    await transaction.save({session});

    await session.endSession(); 
    
    return res.status(200).json({message: 'Initial transaction created successfully',
        transaction
    });
}

module.exports = {
    createTransaction,
    createInitalTransaction
}


