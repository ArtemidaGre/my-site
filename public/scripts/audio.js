class AudioControl{
    constructor(DivID){
        this.div = document.getElementById(DivID);
        this.audio = this.div.getElementsByTagName('audio')[0];
        //alert(this.audio.duration);
        this.audio.volume = 0.5;
        this.audio.loop = true;
        const Menu = document.createElement('div');
        const PlayButton = document.createElement('button');
        const PauseButton = document.createElement('button');
        const Name = document.createElement('span'); Name.innerText = "Verrcut";
        const timeline = document.createElement('input'); timeline.value = 0;
        const volume = document.createElement('input'); volume.value = this.audio.volume;
        volume.type = 'range';
        volume.min = 0; 
        volume.max = 1; 
        volume.step = 0.001;
        volume.style.width = '40%'
        timeline.type = 'range';
        timeline.step = 0.001;
        timeline.min = 0; timeline.max = 1;
        timeline.style.width = '98%'
        this.div.appendChild(Menu);
        Menu.classList.add('audMenu');
        PlayButton.innerHTML = "play"
        PauseButton.style.display = 'none';
        PauseButton.innerHTML = "pause"
        volume.onchange = ()=>{this.audio.volume = volume.value;};
        PlayButton.onclick = () => {this.audio.play(); PlayButton.style.display = 'none'; PauseButton.style.display = 'flex';}
        PauseButton.onclick = () => {this.audio.pause(); PauseButton.style.display = 'none'; PlayButton.style.display = 'flex';}
        Menu.append(PlayButton, PauseButton, volume, Name, timeline);
        this.audio.addEventListener('timeupdate', ()=>{timeline.value = (this.audio.currentTime/this.audio.duration)})
    }
}