var m_b = document.getElementById('112')
var s_b = document.getElementById('111')

const mainf = {
    developer: 'Aztec_bx',
    dev_coutry: 'Russia',
    dev_age: 14,
    dev_city: 'Yaroslavl',
    dev_info: function(){
        console.log(`hi, its developer my name is ${this.developer}, im ${this.dev_age} years old, from ${this.dev_coutry},${this.dev_city}. I hope you like this site :)`)
    }
}

const button_f = {
    first_button: function(){
        console.log('first button has been activated')
    },
    second_button: function(){
        console.log('second button has been activated')
    }
    
}

const main_buttons = {
    indexP: function (){
        window.open('index.html', '_self')
    },
    indexPa: function (){
        window.open('../index.html', '_self')
    },
    infoP: function (){
        window.open('info.html', '_self')
    },
    infoPa: function (){
        window.open('../info.html', '_self')
    },
    projP: function (){
        window.open('proj.html', '_self')
    },
    projPa: function (){
        window.open('../proj.html', '_self')
    }
}

const version = {
    curent_version: '1.0',
    next_version: '1.1',
    version_test: function(){
        alert(`now you use ${this.curent_version}, next is ${this.next_version}`)
    }
}