let changedSelection, clicked, ActiveBox, highscore, mainTimer, time, counter, currentScore = 0;
var optionsarray = ['4x4', '6x6', '3X3'];
let prevval, prevclick;

Start_Timer = () => {
    const startingMinutes = 2;
    time = startingMinutes * 60;

    const countdownEl = document.querySelector("#countdown");

    updateCountdown = () => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds

        countdownEl.innerHTML = `${minutes}:${seconds}`;

        time--;
    }
    mainTimer = setInterval(updateCountdown, 1000);
}


$(document).ready(() => {
    if (localStorage.getItem('heighestscore') != undefined) {
        highscore = localStorage.getItem('heighestscore')
        $('.highest').find('span').text(highscore);
    } else {
        highscore = 0;
    }

    changedSelection = (ele) => {

        if ($(ele).find(":selected").val() == 'none') {
            return;
        }
        createDiv($(ele).find(":selected").val());
        beginGame($(ele).find(":selected").val());
        counter = setInterval(() => {
            $('.cell').removeClass('active');
            beginGame($(ele).find(":selected").val());
            prevclick = '';
            if (time <= 1) {
                $('.countdown').text('00:00');
                clearInterval(counter);
                clearInterval(mainTimer);
                alert("Game Over. Your score is " + currentScore + " !!!");
                window.location.reload();
            }
        }, 1000);
        $('.wrapper').css("display", 'block');
        Start_Timer();

        document.getElementsByTagName('select').modes.disabled = true;
        $('.restart').show();
    }

    createDiv = (i) => {
        let htm = '';
        for (var x = 1; x <= i; x++) {
            let innerht = '';
            for (var y = 1; y <= i; y++) {
                innerht += "<div class='cell col-sm-2 col-2 col-md-2' id='" + x + y + "'  onClick='clicked(this)'></div> "

            }
            htm += "<div class='row'>" + innerht + "</div>";
        }
        $('.cellholder').html(htm);
    }

    clicked = (item) => {
        if ($(item).attr('id') == ActiveBox) {
            if ($(item).attr('id') == prevclick) {
                prevclick = $(item).attr('id');
                return
            }
            currentScore++;
        } else {
            if (currentScore > 0) {
                currentScore--;
            }

        }
        if (currentScore > highscore) {

            highscore = currentScore;

            $('.highest').find('span').text(highscore);
            localStorage.setItem('heighestscore', currentScore);

        }
        $('.currentscore').find('span').text(currentScore);
        prevclick = $(item).attr('id');

    }

    beginGame = (maximun) => {
        let min = 1;
        let max = maximun;
        ActiveBox = Math.floor(Math.random() * (max - min + 1) + min) + "" + Math.floor(Math.random() * (max - min + 1) + min);
        if (prevval == ActiveBox) {
            beginGame(max);
        }

        $('#' + ActiveBox).addClass('active');
        prevval = ActiveBox;


    };
});