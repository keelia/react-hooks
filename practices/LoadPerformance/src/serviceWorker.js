const serviceWorker = ()=>{
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')//inside public folder
        .then((reg) => {
          // registration worked
          console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch((error) => {
          // registration failed
          console.log('Registration failed with ' + error);
        });
      }
}

export default serviceWorker;