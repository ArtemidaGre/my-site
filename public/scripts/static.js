class MenuCreator {
    constructor(){
        const body = document.getElementsByTagName('body')[0]
        var Div = document.createElement('div')
        Div.id = 'menu_container'
        Div.innerHTML = `
        <div id='upper'>
            <li><button onclick="main_buttons.indexP()">Главная</button></li>
            <li><button onclick="main_buttons.infoP()">Информация</button></li>
            <li><button onclick="main_buttons.projP()">Проекты</button></li>
            <li><button onclick="main_buttons.listP()">Список</button></li>
            <li><button onclick="main_buttons.registerP()">Sign UP/Log IN</button></li>
            <li><button onclick="window.open('/profile', '_self')">Profile</button></li>
        </div>
        <div id='lower'>
            <strong>MONEY<strong>
            <li><button onclick="">Support</button></li>
            <li><button onclick="">Buy course</button></li>
            <li><button onclick="">Vip func</button></li>
        </div>
        `
        body.appendChild(Div)
    }
}

/*var menu = document.createElement('div')
        Div.id = 'menu'
        menu.classList.add('off')
        const full = `
        <li><button class="main_button" onclick="main_buttons.indexP()">Главная</button></li>
        <li><button class="main_button" onclick="main_buttons.infoP()">Информация</button></li>
        <li><button class="main_button" onclick="main_buttons.projP()">Проекты</button></li>
        <li><button class="main_button" onclick="main_buttons.listP()">Список</button></li>
        <li><button class="main_button" onclick="main_buttons.registerP()">Sign UP/Log IN</button></li>
        <li><button class="main_button" onclick="window.open('/profile', '_self')">Profile</button></li>`
        const mini = `MENU`
        Div.style.width = '0px'
        menu.innerHTML = mini
        menu.addEventListener('mouseenter', () =>{
            setTimeout(()=>{menu.innerHTML = full
                menu.classList.add('on')
                menu.classList.remove('off')
                Div.style.width = '95%'}, 150)
        })
        menu.addEventListener('mouseleave', ()=>{
            menu.innerHTML = mini
            menu.classList.add('off')
            menu.classList.remove('on')
            Div.style.width = '0px'
        })
        Div.appendChild(menu)*/