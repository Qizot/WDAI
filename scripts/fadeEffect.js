function fadeOutEffect(fadeTarget, time, callback) {
    let interval = time / 100;

    let fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.01;
        } else {
            clearInterval(fadeEffect);
            fadeTarget.style.display = "none";
            if (callback)
                callback();
        }
    }, interval);
}

function fadeInEffect(fadeTarget, time, callback) {
    let interval = time / 100;
    let currentOpacity = 0;
    fadeTarget.style.display = "inline-block";
    let fadeEffect = setInterval(function () {
        fadeTarget.style.opacity = currentOpacity;
        if (currentOpacity < 1.0) {
            currentOpacity += 0.01;
            fadeTarget.style.opacity = currentOpacity;
        } else {
            clearInterval(fadeEffect);
            if (callback)
                callback();
        }
    }, interval);

}