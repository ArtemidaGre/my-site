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
    div.innerHTML = `
        <script>
        function toggleProjects() {
            var dropdown = document.getElementById('projects_dropdown');
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
          }
          
          function toggleProfile() {
            var dropdown = document.getElementById('profile_dropdown');
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
          }
        </script>
        <div id="menu_container">
        <h4>BoxStd</h4>
        <div class="dropdown">
        <button class="main_button" onclick="main_buttons.indexP()">главная</button>
        </div>
        <div class="dropdown">
        <button class="main_button" onclick="main_buttons.infoP()">информация</button>
        </div>
        <div class="dropdown">
        <button class="main_button" onclick="toggleProjects()">проекты</button>
        <div class="dropdown-content" id="projects_dropdown">
            <a href="/list">Список проектов</a>
            <a href="/proj">Информация про проекты</a>
        </div>
        </div>
        <div class="dropdown" id="profile">
        <img src="/image/default-icon.png" alt="O" id="icon" onclick="toggleProfile()">
        <div class="dropdown-content" id="profile_dropdown">
            <a href="/login">Логин/регистрация</a>
            <a href="/profile">Профиль</a>
        </div>
        </div>
        </div>
    `
}