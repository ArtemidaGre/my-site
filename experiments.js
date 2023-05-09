function res(){
    console.log('start');
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('promise');
            resolve();
        }, 1000);
    });
    console.log('end');
}

res();
console.log('after')

document.getElementById