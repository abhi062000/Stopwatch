$(function () {
    // declaring variables
    var mode = 0; // app mode -> means false
    var timeCounter = 0;
    var lapCounter = 0;
    var action;  // for setInterval
    var lapNumber = 0;

    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    hideshowButtons("#startButton", "#lapButton");

    // start button
    $('#startButton').click(function () {
        mode = 1;
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
    });

    // stop button
    $('#stopButton').click(function () {
        hideshowButtons("#resumeButton", "#resetButton");
        clearInterval(action);
    });

    // resume button
    $('#resumeButton').click(function () {
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
    });

    // reset button
    $('#resetButton').click(function () {
        location.reload();  // reloading the page 
    });

    // lap buttton
    $('#lapButton').click(function () {
        //if mode is 1 then
        //    stopaction
        //     reset lap and print lap details
        //     start action
        if (mode) {
            clearInterval(action);
            lapCounter = 0;
            addLap();
            startAction();
        }
    });






    // functions
    function hideshowButtons(x, y) {
        $('.control').hide();
        $(x).show();
        $(y).show();
    }

    function startAction() {
        action = setInterval(function () {

            timeCounter++;
            // limiting the timecounter
            if (timeCounter == 100 * 60 * 100) {
                timeCounter = 0;
            }

            lapCounter++;
            // limiting lap counter
            if (lapCounter == 100 * 60 * 100) {
                lapCounter = 0;
            }

            updateTime();  // function for conversion to min , sec, and centisec
        }, 10); // 1 centisecond = 10 millisecond
    }

    function updateTime() {
        // 1min = 60*100centisec = 6000centisec
        timeMinutes = Math.floor(timeCounter / 6000);
        // 1sec = 100centisec
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiseconds = (timeCounter % 6000) % 100;

        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));

        // 1min = 60*100centisec = 6000centisec
        lapMinutes = Math.floor(lapCounter / 6000);
        // 1sec = 100centisec
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiseconds = (lapCounter % 6000) % 100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }

    function format(number) {
        if (number < 10) {
            return '0' + number;
        }
        else {
            return number;
        }
    }

    function addLap() {
        // printing lap details
        lapNumber++;
        var myLapDetails =
            '<div class="lap"> ' +
            '<div class="laptimetitle">' +
            'Lap ' + lapNumber +
            '</div>' +
            '<div class="laptime">' +
            '<span>' + format(lapMinutes) + ':</span>' + '<span>' + format(lapSeconds) + ':</span>' + '<span>' + format(lapCentiseconds) + '</span>' +
            '</div>' +
            '</div>';

        // $(myLapDetails).appendTo('#laps');
        $(myLapDetails).prependTo('#laps');
    }


});