const ButtonsDo = {
    main: ()=>{window.open('' ,'_self')},
    info: ()=>{window.open('' ,'_self')},
    proj: ()=>{window.open('' ,'_self')},
    logIN: ()=>{window.open('' ,'_self')},
    profile: ()=>{window.open('' ,'_self')}
}

function CreateMenu(){
    const div = document.createElement('div')
    document.getElementsByTagName('body')[0].appendChild(div);
    div.innerHTML = `
    <div id="menu_container">
        <title>BoxStd</title>
        <button class="main_button" onclick="main_buttons.indexP()">Главная</button>
        <button class="main_button" onclick="main_buttons.infoP()">Информация</button>
        <button class="main_button" onclick="main_buttons.projP()">Проекты</button>
        <>
    </div>
    ` 
}

/*      <li><button class="main_button" onclick="main_buttons.registerP()">Sign UP/Log IN</button></li>
        <li><button class="main_button" onclick="window.open('/profile', '_self')">Profile</button></li>
        <li><button class="main_button" onclick="main_buttons.listP()">Список</button></li>
*/