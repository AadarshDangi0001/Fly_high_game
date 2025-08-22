document.addEventListener("DOMContentLoaded", function() {
    // Track if user has interacted (for audio play policy)
    let userInteracted = false;

    // Mobile Controls
    function isMobile() {
        return window.innerWidth <= 700;
    }

    function triggerKey(keyCode) {
        if (scoreStopped) return;
        var e = { keyCode: keyCode };
        // Simulate the same logic as in document.onkeydown
        if (keyCode == 38) {
            var player = document.querySelector(".player");
            player.classList.add('animateplayer');
            setTimeout(() => {
                player.classList.remove('animateplayer');
            }, 1000);
        }
        if (keyCode == 39) {
            var player = document.querySelector(".player");
            if (!scoreStopped) {
                playx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
                player.style.left = playx + 60 + "px";
            }
        }
        if (keyCode == 37) {
            var player = document.querySelector(".player");
            if (!scoreStopped) {
                playx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
                player.style.left = (playx - 60) + "px";
            }
        }
    }

    function setupMobileControls() {
        const leftBtn = document.getElementById('mobile-left');
        const upBtn = document.getElementById('mobile-up');
        const rightBtn = document.getElementById('mobile-right');
        if (leftBtn && upBtn && rightBtn) {
            leftBtn.addEventListener('touchstart', function(e) { e.preventDefault(); triggerKey(37); });
            upBtn.addEventListener('touchstart', function(e) { e.preventDefault(); triggerKey(38); });
            rightBtn.addEventListener('touchstart', function(e) { e.preventDefault(); triggerKey(39); });
            // Also support click for emulators
            leftBtn.addEventListener('click', function(e) { e.preventDefault(); triggerKey(37); });
            upBtn.addEventListener('click', function(e) { e.preventDefault(); triggerKey(38); });
            rightBtn.addEventListener('click', function(e) { e.preventDefault(); triggerKey(39); });
        }
    }

    if (isMobile()) {
        setupMobileControls();
        document.querySelector('.mobile-controls').style.display = 'flex';
    }
    window.addEventListener('resize', function() {
        if (isMobile()) {
            setupMobileControls();
            document.querySelector('.mobile-controls').style.display = 'flex';
        } else {
            document.querySelector('.mobile-controls').style.display = 'none';
        }
    });
    let level2Activated = false;
    let level3Activated = false;
    var score = 0;
    var level = 1;
    var scoreStopped = false; 
    var gamestart = document.querySelector(".gamestart"); 
    var gameover = document.querySelector(".gameover"); 
    var problem = document.querySelector(".problem");
    var problem1 = document.querySelector(".problem1");
    var start = document.querySelector(".start");
    var restart = document.querySelector(".restart");
    var audioP = new Audio('dead.mp3');
    var audioB = new Audio('background.mp3');
    var background = document.querySelector(".game");


    function handleStartClick() {
        userInteracted = true;
        reset();
        setTimeout(() => {
            audioB.play();
        }, 100);
    }
    function handleRestartClick() {
        userInteracted = true;
        reset();
        setTimeout(() => {
            audioB.play();
        }, 100);
    }

    let startListenerAdded = false;
    let restartListenerAdded = false;

    function gameStart(){
        gamestart.style.visibility = 'visible';
        problem.classList.remove('aniproblem');
        scoreStopped = true; 
        audioB.pause();
        // Only add event listener once
        if (!startListenerAdded) {
            start.addEventListener("click", handleStartClick);
            startListenerAdded = true;
        }
    }
    gameStart();
   

    function reset(){
        var level = 1;
        var levelname = document.querySelector(".levelname h1"); 
        levelname.innerHTML = "LEVEL: " + level;
        problem1.style.visibility = 'hidden';
        background.style.backgroundImage = "url('/images/game_background_21-.jpg')";
        let newDuration = 3;
        problem.style.animationDuration = Math.max(newDuration, 1) + 's';
        level2Activated = false;
        level3Activated = false;
        gamestart.style.visibility = 'hidden';
        score = 0;
        scoreStopped = false;
        gameover.style.visibility = 'hidden';
        updateScore(score);
        // Do not auto-play audio here; play only after user interaction
        problem.classList.add('aniproblem');
    }
    function deadplayer(){
        if (userInteracted) {
            audioP.play();
        }
        audioB.pause(); 
        audioB.currentTime = 0; 
        setTimeout(() => {
            audioP.pause(); 
            audioP.currentTime = 0; 
        }, 1000);
        var player = document.querySelector(".player"); 
        player.classList.add('dead');
        setTimeout(() => {
            player.classList.remove('dead');
            player.style.left =  40 + "px";
        }, 1000);
    }
    function gameEnd(){
        problem1.classList.remove('aniproblem');
        gameover.style.visibility = 'visible';
        problem.classList.remove('aniproblem');
        scoreStopped = true; 
        deadplayer();
        // Only add event listener once
        if (!restartListenerAdded) {
            restart.addEventListener("click", handleRestartClick);
            restartListenerAdded = true;
        }
    }

    function updateScore(scoreValue) {
        var scoreElement = document.querySelector(".scoreCont h1"); 
        scoreElement.innerHTML = "Your score: " + scoreValue;
    };
    
    document.onkeydown = function(e) {
        if (scoreStopped) return; 

        console.log("key code is :", e.keyCode);
        if (e.keyCode == 38) {
            var player = document.querySelector(".player"); 
            player.classList.add('animateplayer');
            setTimeout(() => {
                player.classList.remove('animateplayer');
            }, 1000);
        };
        if (e.keyCode == 39) {
            var player = document.querySelector(".player"); 
            if (!scoreStopped) { 
                playx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
                player.style.left = playx + 60 + "px";
            }
        }
        if (e.keyCode == 37) {
            var player = document.querySelector(".player"); 
            if (!scoreStopped) { 
                playx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
                player.style.left = (playx - 60) + "px";
            }
        }
    }

    setInterval(() => {
        var player = document.querySelector(".player"); 
        
        var screenWidth = window.innerWidth; 
        var screenHeight = window.innerHeight; 

        px = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        py = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));

        ex = parseInt(window.getComputedStyle(problem, null).getPropertyValue('left'));
        ey = parseInt(window.getComputedStyle(problem, null).getPropertyValue('top'));

        ax = parseInt(window.getComputedStyle(problem1, null).getPropertyValue('left'));
        ay = parseInt(window.getComputedStyle(problem1, null).getPropertyValue('top'));
         
        offfSetX = Math.abs(px - ax);
        offfSetY = Math.abs(py - ay);
    
        offSetX = Math.abs(px - ex);
        offSetY = Math.abs(py - ey);

        if ((px < 0 || px > screenWidth || py < 0 || py > screenHeight) || (offSetX < 150 && offSetY < 120) || (offfSetX < 150 && offfSetY < 100)) {
            gameEnd();
        }
        else if (!scoreStopped) { 
            score += 1;
            updateScore(score);
            if (!level2Activated && score > 100) {
                
                var level = 2;
                var levelname = document.querySelector(".levelname h1"); 
                levelname.innerHTML = "LEVEL: " + level;
                background.style.backgroundImage = "url('/images/level2.jpg')";
                let currentDuration = parseFloat(window.getComputedStyle(problem).animationDuration);
                let newDuration = currentDuration - 1;
                problem.style.animationDuration = Math.max(newDuration, 1) + 's';
                
                level2Activated = true; 
            }
            if (!level3Activated && score > 300) {
                var level = 3;
                var levelname = document.querySelector(".levelname h1"); 
                levelname.innerHTML = "LEVEL: " + level;
                problem1.classList.add('aniproblem');
                problem1.style.visibility = 'visible';
                background.style.backgroundImage = "url('/images/level3.jpg')";
                level3Activated = true; 
            }
        }
    }, 100);

});


