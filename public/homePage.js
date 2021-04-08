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
setTimeout(updateRates);
setInterval(updateRates, 60000);

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, `Средства добавлены не были!`);
        }
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, `Сумма добавлена!`);
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, `Конвертация не проведена!`);
        }
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, `Конвертация успешно проведена!`);
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (!response.success) {
            moneyManager.setMessage(response.success, `Сумма не переведена!`);
        }
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, `Сумма успешно переведена!`);
    })
}

function updateFavorites(data) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(data);
    moneyManager.updateUsersList(data);
}

ApiConnector.getFavorites(response => {
    if (response.success) {
        updateFavorites(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            updateFavorites(data);
            favoritesWidget.setMessage(response.success, `Пользователь добавлен!`);
            return;
        }
        favoritesWidget.setMessage(response.success, `Пользователь не добавлен!`);
        return;
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            updateFavorites(data);
            favoritesWidget.setMessage(response.success, `Пользователь удален!`);
            return;
        }
        favoritesWidget.setMessage(response.success, `Пользователь не удален!`);
        return;
    })
}
