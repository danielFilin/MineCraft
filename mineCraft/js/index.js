let parent = $('.parent-div');
let bitterCounter = 5;

//music starts once the page is loaded
window.onload = function () {
    document.getElementById("minecraft-audio").play();
}


//pause music button
$('#pause').click(function () {
    document.getElementById("minecraft-audio").pause();

})

//play music button
$('#play').click(function () {
    document.getElementById("minecraft-audio").play();

})



// this function creates a random world;
createWorld = (xAxis) => {
    let randomNumTree = Math.ceil(Math.random() * 6 + 2);
    for (let i = 0; i < xAxis; i++) {
        let randomNumBranches = Math.ceil(Math.random() * 2);
        for (let x = 0; x < 20; x++) {
            let randomNumGold = Math.ceil(Math.random() * 40);
            let randomNumStone = Math.ceil(Math.random() * 4);
            let el = $('<div/>');
            el.addClass('game-tile');
            if (i < (xAxis * 0.7)) {
                el.addClass('sky');
                el.css({
                    width: '5%',
                    height: '5%',
                });
            } else if (i >= (xAxis * 0.7) && randomNumGold % 40 === 0) {
                el.addClass('gold');
                el.css({
                    width: '5%',
                    margin: '0',
                    height: '5%',
                });
            } else if (i >= (xAxis * 0.7) && randomNumStone % 4 === 0) {
                el.addClass('smallRock');
                el.css({
                    width: '5%',
                    margin: '0',
                    height: '5%',
                });
            } else if (i >= (xAxis * 0.7)) {
                el.addClass('dirt');
                el.css({
                    width: '5%',
                    margin: '0',
                    height: '5%',
                });
            }
            if (i >= (xAxis * 0.501) && i <= (xAxis * 0.7)) {
                if (x % randomNumTree === 0) {
                    el.addClass('tree');
                    el.css({
                        width: '5%',
                        margin: '0',
                        height: '5%',
                    });
                } else {
                    el.addClass('sky');
                    el.css({
                        width: '5%',
                        margin: '0',
                        height: '5%',
                    });
                }
            }
            if (i >= (xAxis * 0.301) && i <= (xAxis * 0.5)) {
                if (
                    x % randomNumTree === 0 ||
                    x % randomNumTree === randomNumBranches - 1 ||
                    x % randomNumTree === randomNumTree - randomNumBranches ||
                    x % randomNumTree === randomNumBranches - 2
                ) {
                    el.addClass('treetop');
                    el.css({
                        width: '5%',
                        margin: '0',
                        height: '5%',
                    });
                } else {
                    //el.addClass('sky');
                    el.css({
                        width: '5%',
                        margin: '0',
                        height: '5%',
                    });
                }
            }
            if (i <= (xAxis * 0.3)) {
                el.addClass('sky');
                el.css({
                    width: '5%',
                    margin: '0',
                    height: '5%',
                });
            }

            if (el.hasClass("tree") || el.hasClass("dirt") || el.hasClass("treetop") || el.hasClass("smallRock")) {
                el.removeClass("sky")
            }

            parent.append(el);

        }
    }
}

// sends the harvested element to stock
sendToStock = stock => {
    $('#inventory').empty();
    $('#inventory').text('product');
    let el = $('<div/>');
    el.addClass(stock);

    el.addClass('my-inventory');
    el.css({
        width: '100%',
        height: '100%',
        display: 'inline-block',
    });
    $('#inventory').append(el);
    //this part appends the harvested element back to the game-world; 
    $('.my-inventory').click(() => {
        $('.game-tile')
            .off('click')
            .on('click', function (e) {
                let myTile = e.target;
                myTile.classList.add(stock);
                stock = '';
                $('#inventory').empty();
            });
    });
};


// harvest mode function; also calls the functions that will send the harvested piece to storage. 
harvestMode = (myClass, myClass2) => {
    $('.game-tile')
        .off('click')
        .on('click', function (e) {
            console.log(myClass, myClass2)
            if (e.target.style.backgroundImage === 'url("../minePic/biterBig.png")') {
                $('#modal2').css("display", "block")
            } else {
                if (myClass === e.target.classList[1]) {
                    sendToStock(myClass);
                    if (myClass === "smallRock" || myClass2 === "gold") {
                        document.getElementById("mineAxe-audio").play();
                    } else if (myClass === "tree" || myClass2 === "treetop") {
                        document.getElementById("axe-audio").play();
                    } else if (myClass === "dirt") {
                        document.getElementById("shovel-audio").play();
                    }

                } else if (myClass2 === e.target.classList[1]) {
                    sendToStock(myClass2);
                    if (myClass2 === "gold") {
                        document.getElementById("mineAxe-audio").play();
                    } else if (myClass2 === "treetop") {
                        document.getElementById("axe-audio").play();
                    }
                }
                e.target.classList.remove(myClass, myClass2);
            }
        });

};


plantMode = (plantClass) => {
    $('.game-tile')
        .off('click')
        .on('click', function (e) {
            if (e.target.style.backgroundImage === 'url("../minePic/biterBig.png")') {
                $('#modal2').css("display", "block")
            } else {
                bitterCounter--;
                if (plantClass === "biter") {
                    document.getElementById("avi-audio").play();
                    if (bitterCounter >= 0) {
                        e.target.style.backgroundImage = "url('../minePic/biterBig.png')";
                        e.target.style.backgroundSize = "cover";
                    } else {
                        $('#modal').css("display", "block")

                    }
                } else if (e.target.classList[1] === "sky") {
                    e.target.style.backgroundImage = "url('../minePic/birds.gif')";
                    e.target.style.backgroundSize = "cover";
                }
            }
        })
}

// event listeners of the different tooles that we use to harvest our products. 

$('#axeImg').click(() => {
    harvestMode('tree', 'treetop');
    $('.my-options').css('background-color', 'transparent');
    $('#axeImg').css('background-color', 'yellow');
    document.getElementById("axe-audio").play();

});

$('#shovel').click(() => {
    harvestMode('dirt');
    $('.my-options').css('background-color', 'transparent');
    $('#shovel').css('background-color', 'blue');
    document.getElementById("shovel-audio").play();

});

$('#mineAxe').click(() => {
    harvestMode('smallRock', 'gold');
    $('.my-options').css('background-color', 'transparent');
    $('#mineAxe').css('background-color', 'purple');
    document.getElementById("mineAxe-audio").play();

});

$('#aviBiter').click(() => {
    plantMode('biter');
    document.getElementById("avi-audio").play();

})

$('#birds').click(() => {
    $('.my-options').css('background-color', 'transparent');
    $('#birds').css('background-color', 'rgb(241, 119, 241)');
    document.getElementById("birds-audio").play();
    plantMode('birds');
})


// generates world

$('.world-btn').click(() => {
    let x = $('.x-axis').val();
    parent.empty();
    createWorld(x);
})

// generates a world on page load; 
$(window).load(createWorld(20))