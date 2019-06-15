let parent = $('.parent-div');
let bitterCounter = 5; 

//music starts once the page is loaded
window.onload = function() {
    document.getElementById("minecraft-audio").play();
}


//pause music button
$('#pause').click(function(){
    document.getElementById("minecraft-audio").pause();

})

//play music button
$('#play').click(function(){
    document.getElementById("minecraft-audio").play();

})

//axe sound effect
$('#axeImg').click(function(){
    document.getElementById("axe-audio").play();

})

//mineaxe sound effect
$('#mineAxe').click(function(){
    document.getElementById("mineAxe-audio").play();

})

//shovel sound effect

$('#shovel').click(function(){
    document.getElementById("shovel-audio").play();

})

// birds sound effect
$('#birds').click(function(){
    document.getElementById("birds-audio").play();

})

//Avi Biteround effect
$('#aviBiter').click(function(){
    document.getElementById("avi-audio").play();

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
        width: '5%',
        height: '50%',
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
            if (myClass === e.target.classList[1]) {
                sendToStock(myClass);
            } else if (myClass2 === e.target.classList[1]) {
                sendToStock(myClass2);
            }
            e.target.classList.remove(myClass, myClass2);
        });
};



plantMode = (plantClass) => {
    $('.game-tile')
        .off('click')
        .on('click', function (e) {
            console.log(e.target.classList)
            bitterCounter--;
            if(plantClass === "biter"){
                if(bitterCounter>=0){
                    e.target.style.backgroundImage = "url('minePic/biterBig.png')";
                    e.target.style.backgroundSize = "cover";
                }else {
                    $('#modal').css("display", "block")
                
                }
            }else if (e.target.classList[1] === "sky") {
                e.target.style.backgroundImage = "url('minePic/birds.gif')";
                e.target.style.backgroundSize = "cover";
            }
          
           
        })
}

// event listeners of the different tooles that we use to harvest our products. 

$('#axeImg').click(() => {
    harvestMode('tree', 'treetop');
    $('.my-options').css('background-color', 'transparent');
    $('#axeImg').css('background-color', 'yellow');
});

$('#shovel').click(() => {
    harvestMode('dirt');
    $('.my-options').css('background-color', 'transparent');
    $('#shovel').css('background-color', 'blue');
});

$('#mineAxe').click(() => {
    harvestMode('smallRock', 'gold');
    $('.my-options').css('background-color', 'transparent');
    $('#mineAxe').css('background-color', 'purple');
});

$('#aviBiter').click(() => {
    plantMode('biter');
})

$('#birds').click(() => {
    $('.my-options').css('background-color', 'transparent');
    $('#birds').css('background-color', 'rgb(241, 119, 241)');
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