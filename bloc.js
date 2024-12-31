(function() {
    let devtoolsOpen = false;
    const element = new Image();
    
    Object.defineProperty(element, 'id', {
        get: function() {
            devtoolsOpen = true;
            alert("La console de développement est ouverte. Veuillez ne pas inspecter le code source.");
        }
    });

    console.log(element);
    setInterval(function() {
        devtoolsOpen = false;
        console.log(element); 
        if (devtoolsOpen) {
            window.location.href = 'index.html'; 
        }
    }, 1000);
})();
