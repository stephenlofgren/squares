var playerName = "S";
var canvasHeight = 900;
var canvasWidth = 900;
var pieceLength = 90;
var pieceWidth = 15;
var textSize = Math.floor(pieceLength / 3);
var textOffset = Math.floor(pieceLength / 3);
var rowCount = Math.floor(canvasHeight / (pieceLength + pieceWidth));
var columnCount = Math.floor(canvasWidth / (pieceLength + pieceWidth));

//alert("rowCount " + rowCount);
//alert("columnCount " + columnCount);
var components = [];

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function startGame() {
    //var rowCount = canvasHeight - canvasHeight % 

    var row = 0;

    var s = null;
    while(row < rowCount){
        var col = 0;
        components[row] = [];
        while(col < columnCount){
            var leftSquare = null;
            var topSquare = null;
            if(row > 0){
                topSquare = components[row-1][col];
            }
            if(col > 0){
                leftSquare = components[row][col-1];
            }

            s = new square(col * (pieceWidth + pieceLength)
                , row * (pieceWidth + pieceLength)
                , leftSquare,null
                , topSquare,null);
            components[row][col] = s;
            col++;
        }
        row++;
    }
    myGameArea.start();
    
    $("canvas").click( function(e) {
        var rowClicked = Math.floor(e.offsetY / (pieceLength + pieceWidth));
        var colClicked = Math.floor(e.offsetX / (pieceLength + pieceWidth));
        //handle the extreme rows and columns
        if(rowClicked == components.length){
            rowClicked --;
        }
        if(colClicked == components[0].length){
            colClicked --;
        }

        var clickedSquare = components[rowClicked][colClicked];
        console.log("clicked " + e.offsetX + " " + e.offsetY);
        console.log("clicked " + colClicked + " " + rowClicked);
        clickedSquare.clicked(e);
    })
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        updateGameArea();
        //this.interval = setInterval(checkForComplete, 60);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function square(x,y, leftSquare=null, rightSquare=null, topSquare=null, bottomSquare=null){
    this.leftSquare = leftSquare;
    this.rightSquare = rightSquare;
    this.topSquare = topSquare;
    this.bottomSquare = bottomSquare;

    if(this.leftSquare == null){
        this.leftSide = new component(pieceWidth,pieceLength,"black", x, y+pieceWidth);
    } else {
        this.leftSide = leftSquare.rightSide;
    }
    if(this.rightSquare == null){
        this.rightSide = new component(pieceWidth,pieceLength,"black", x+pieceLength+pieceWidth, y+pieceWidth);
    } else {
        this.rightSide = rightSquare.leftSide;
    }
    if(this.topSquare == null){
        this.topSide = new component(pieceLength,pieceWidth,"black", x+pieceWidth, y);
    } else {
        this.topSide = topSquare.bottomSide;
    }
    if(this.bottomSquare == null){
        this.bottomSide = new component(pieceLength,pieceWidth,"black", x+pieceWidth, y+pieceLength+pieceWidth);
    } else {
        this.topSide = topSquare.bottomSide;
    }
    this.center = new textComponent(30, 30, 30, "Consolas", "black", this.leftSide.right, this.topSide.bottom);

    this.update = function(){
        this.leftSide.update();
        this.rightSide.update();
        this.topSide.update();
        this.bottomSide.update();
        this.center.update();
    }
    this.clicked = function(e){
        if(this.leftSide.isHit(e)){
            this.leftSide.handleClick();
            if(this.leftSquare != null){
                this.leftSquare.rightSide.handleClick();
                if(leftSquare.isClosed()){
                        this.leftSquare.center.text = playerName;
                    this.leftSquare.center.handleClick();
                }
            }
        }
        else if(this.rightSide.isHit(e)){
            this.rightSide.handleClick();
        }
        else if(this.topSide.isHit(e)){
            this.topSide.handleClick();
            if(this.topSquare != null){
                this.topSquare.bottomSide.handleClick();
                if(this.topSquare.isClosed()){
                    this.topSquare.center.text = playerName;
                    this.topSquare.center.handleClick();
                }
            }
        }   
        else if(this.bottomSide.isHit(e)){
            this.bottomSide.handleClick();
        }
        if(this.isClosed()){
            this.center.text = playerName;
            this.center.handleClick();
        }
    }
    this.isClosed = function(){
        if(this.leftSide.has_changed){
            if(this.rightSide.has_changed
                && this.topSide.has_changed
                && this.bottomSide.has_changed){
                    console.log("square closed");
                    return true;
            }
            else {
                return false;
            }
        }
    } 
}

function component(width, height, color, x, y, text="") {
    this.owner = "";
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.right = x + width;
    this.bottom = y + height;
    this.color = color;
    this.has_changed = false;
    this.text = text;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.isHit = function(e) {
        if(!this.has_changed 
            && e.offsetX > this.x 
            && e.offsetX < (this.x + this.width)
            && e.offsetY > this.y 
            && e.offsetY < (this.y + this.height)){
            return true;
        }
        return false;
    }
    this.handleClick = function() {
            this.color = "blue";
            this.has_changed = true;
            this.update();
            postMove(JSON.stringify(this));                
    }
}

function textComponent(width, height, fontSize, font, color, x, y, text="") {
        this.owner = "";
    this.width = width;
    this.fontSize = fontSize;
    this.font = font;
    this.height = height;
    this.x = x;
    this.y = y;
    this.right = x + width;
    this.bottom = y + height;
    this.color = color;
    this.has_changed = false;
    this.text = text;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.font = this.fontSize + "px " + this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y + fontSize);
    }
    this.handleClick = function() {
            this.color = "blue";
            this.has_changed = true;
            this.update();   
    }
}

function postMove(component) {
    var csrftoken = getCookie('csrftoken');
    var serviceUrl = "/game/1/post_move";
    $.ajax({
        url: serviceUrl,
        headers: {
            "X-CSRFToken": csrftoken,
            "content-type": "application/json"
        },
        data: component,
        type: 'POST',
        success: function(result) {
            console.log('success');
        },
        error: function(result) {
            console.log('error');
        }
    });
}

function updateGameArea() {
    myGameArea.clear();
    cLen = components.length;
    for (i = 0; i < cLen; i++) {
        var row = components[i];
        rlen = row.length;
        for(j = 0; j < rlen; j++){
            row[j].update();
        }
    }
}

function checkForComplete() {
    cLen = components.length;
    for (i = 0; i < cLen; i++) {
        var row = components[i];
        rlen = row.length;
        for(j = 0; j < rlen; j++){
            s = row[j];
            if(s.isClosed()){
                s.center.text = "S";
                s.center.handleClick();
            }
        }
    }
}
