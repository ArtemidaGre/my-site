var ButtonsDo = {
    main: function () { window.open('', '_self'); },
    info: function () { window.open('', '_self'); },
    proj: function () { window.open('', '_self'); },
    logIN: function () { window.open('', '_self'); },
    profile: function () { window.open('', '_self'); }
};
function CreateMenu() {
    var div = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(div);
    div.innerHTML = "\n    <div id=\"menu_container\">\n        <li><button class=\"main_button\" onclick=\"main_buttons.indexP()\">\u0413\u043B\u0430\u0432\u043D\u0430\u044F</button></li>\n        <li><button class=\"main_button\" onclick=\"main_buttons.infoP()\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</button></li>\n        <li><button class=\"main_button\" onclick=\"main_buttons.projP()\">\u041F\u0440\u043E\u0435\u043A\u0442\u044B</button></li>\n        <li><button class=\"main_button\" onclick=\"main_buttons.listP()\">\u0421\u043F\u0438\u0441\u043E\u043A</button></li>\n        <li><button class=\"main_button\" onclick=\"main_buttons.registerP()\">Sign UP/Log IN</button></li>\n        <li><button class=\"main_button\" onclick=\"window.open('/profile', '_self')\">Profile</button></li>\n    </div>\n    ";
}
