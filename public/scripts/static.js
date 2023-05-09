class MenuCreator {
    constructor(Div){
        Div.innerHTML = `
        <div class="side_menu">
            <li><button class="main_button" onclick="main_buttons.indexP()">Главная</button></li>
            <li><button class="main_button" onclick="main_buttons.infoP()">Информация</button></li>
            <li><button class="main_button" onclick="main_buttons.projP()">Проекты</button></li>
            <li><button class="main_button" onclick="main_buttons.listP()">Список</button></li>
            <li><button class="main_button" onclick="main_buttons.registerP()">Sign UP/Log IN</button></li>
            <li><button class="main_button" onclick="window.open('/profile', '_self')">Profile</button></li>
        </div>
        `
    }
}