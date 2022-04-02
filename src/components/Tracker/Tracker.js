import React, { Component } from "react";
import db from "../../config/Fire";
import './Tracker.css';
import Transaction from "./Transaction/Transaction";

class Tracker extends Component {

    state = {
        transactions: [],
        money: 0,
        transactionName: '',
        transactionType: '',
        price: '',
        currentUID: db.auth().currentUser.uid
    }

    // log out button
    logout = () => {
        db.auth().signOut();

    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value !=="0" ? e.target.value : ""
        }); 
    }   
    
    // add transaction
    addNewTransaction = () => {
        const {
            transactionName,
            transactionType,
            price,
            currentUID, money
        } = this.state;

        // validation
        if(transactionName && transactionType && price) {
            const BackupState = this.state.transactions;
            BackupState.push({
                id: BackupState.length + 1,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
            });

            db.database().ref('Transactions/' + currentUID).push({
                id: BackupState.length,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
            }).then((data) => {
                /// success callback
                console.log('success callback')
                this.setState({
                    transactions: BackupState,
                    money: transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price),
                    transactionName: '',
                    transactionType: '',
                    price: ''
                })
            }).catch((error) => {
                // error callback
                console.log('error', error);
            });
        }
    }

    componentWillMount() {
        const {currentUID, money} = this.state;
        let totalMoney = money;
        const BackupState = this.state.transactions;
        db.database().ref('Transactions/' + currentUID).once('value', (snapshot) => {
            // snapshot
            snapshot.forEach((childSnapShot) => {

                totalMoney = 
                childSnapShot.val().type === 'deposit' ? parseFloat(childSnapShot.val().price) + totalMoney
                : totalMoney - parseFloat(childSnapShot.val().price);


                BackupState.push({
                    id: childSnapShot.val().id,
                    name: childSnapShot.val().name,
                    type: childSnapShot.val().type,
                    price: childSnapShot.val().price,
                    user_id: childSnapShot.val().user_id
                });
            });

            this.setState({
                transactions: BackupState,
                money: totalMoney
            })
        });
    }


    render() {

        let currentUser = db.auth().currentUser;

        return (
            <div>
                <div className="trackerBlock">
                    <div className="welcome">
                        <span>Hi, {currentUser.displayName}!</span>
                        <button onClick={this.logout} className="exit">Exit</button>
                    </div>

                    <div className="totalMoney">${this.state.money}</div>

                    <div className="newTransactionBlock">
                        <div className="newTransaction">
                            <form>
                                <input value={this.state.transactionName} onChange={this.handleChange('transactionName')} placeholder="Transaction Name" type= "text" name="transactionName" />
                                <div className="inputGroup">
                                    <select name="type" value={this.state.transactionType} onChange={this.handleChange('transactionType')}>
                                        <option value="0">Type</option>
                                        <option value="expense">Expense</option>
                                        <option value="deposit">Deposit</option>
                                    </select>
                                    <input value={this.state.price} onChange={this.handleChange('price')} placeholder="Price" type= "text" name="price" />
                                </div>
                            </form>
                            <button onClick={() => this.addNewTransaction()} className="addTransaction">+ Add Transaction</button>
                        </div>
                    </div>
                    <div className="latestTransactions">
                        <p>latest Transactions</p>
                        <ul>
                            {Object.keys(this.state.transactions).map((id) => (
                                < Transaction key={id}
                                    type={this.state.transactions[id].type}
                                    name={this.state.transactions[id].name}
                                    price={this.state.transactions[id].price}
                                />
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tracker;