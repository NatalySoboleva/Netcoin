"use strict"

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();


logoutButton.action = () =>
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile;
    }
});

function updateRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
updateRates();
setInterval(updateRates, 60000);

moneyManager.addMoneyCallback = function (response) {
    ApiConnector.addMoney((response) => {
        if (response.success) {
            ProfileWidget.showProfile;
            moneyManager.setMessage('Баланс успешно пополнен!');
        } else {
            moneyManager.setMessage(response.error);
        }
    });
}

function updateFavorites(data) {
    favoritesWidget.clearTable(data);
    favoritesWidget.fillTable(data);
    moneyManager.updateUsersList(data);
}
