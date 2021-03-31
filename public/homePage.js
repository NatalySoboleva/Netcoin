"use strict"

const logoutButton = new LogoutButton;
const ratesBoard = new ratesBoard;
const moneyManager = new MoneyManager;
const favoritesWidget = new FavoritesWidget;


logoutButton.action = () =>
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile()
    }
});

function updateRates(data) {
    ApiConnector.getStocks((data) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data);
        }
    });
}

setInterval(updateRates, 60000);
