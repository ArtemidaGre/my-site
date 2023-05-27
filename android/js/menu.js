function CreateMenu(){
    var Div = document.getElementsByTagName('body')[0]
    var menu = document.createElement('div')
    menu.innerHTML = `M`
    menu.classList.add('side_menu')
    menu.addEventListener('mouseenter', ()=>{
    setTimeout(()=>{
        menu.innerHTML = `
            <li><button class="main_button" onclick="main_buttons.indexP()">Главная</button></li>
            <li><button class="main_button" onclick="main_buttons.infoP()">Информация</button></li>
            <li><button class="main_button" onclick="main_buttons.projP()">Проекты</button></li>
            <li><button class="main_button" onclick="main_buttons.listP()">Список</button></li>
            <li><button class="main_button" onclick="main_buttons.registerP()">Sign UP/Log IN</button></li>
            <li><button class="main_button" onclick="window.open('/profile', '_self')">Profile</button></li>`
        }, 150)
        menu.classList.add('fullmenu')
    })
    menu.addEventListener('mouseleave', ()=>{
        menu.innerHTML = `M`
        menu.classList.remove('fullmenu')
    })
    Div.appendChild(menu)
}