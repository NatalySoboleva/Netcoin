"use strict"

let logoutBtn = new LogoutButton;

logoutBtn.action = function () {
    ApiConnector.logout(function () {
        location.reload();
    })
}
