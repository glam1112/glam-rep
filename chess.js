'use-strict'

function chessBoard() {
	var txt = '',
        letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        black_chesses = ['\u265C', '\u265E', '\u265D', '\u265B', '\u265A', '\u265D', '\u265E', '\u265C'],
        white_chesses = ['\u2656', '\u2658', '\u2657', '\u2655', '\u2654', '\u2657', '\u2658', '\u2656'],
        black_pawn = '\u265F',
        white_pawn = '\u2659';

    txt += '<div id="chessBoardLetters1"></div>';
    txt += '<div id="chessBoardNumbers1"></div>';
    txt += '<div id="mainChessBoard"></div>';
    txt += '<div id="chessBoardNumbers"></div>';
    txt += '<div id="chessBoardLetters"></div>';
   
   	//Генерируем доску

    document.getElementById("board").innerHTML = txt;
    for (var i = 0; i < 64; i++) {
        var element = {};
        element = document.getElementById('mainChessBoard');
        element.appendChild(document.createElement('div'));
        element.childNodes[i].setAttribute('class', parseInt((i / 8) + i) % 2 == 0 ? 'first-color' : 'second-color');
    }

    //Идем по ячейкам доски и проставляем поля с цифрами и буквами

    for (var i = 0, j = 8; i < 8; i++, j--) {
        var element = {};
        element = document.getElementById('mainChessBoard');
        element.childNodes[i].appendChild(document.createElement('p')).innerHTML = black_chesses[i];
        element.childNodes[i + 8].appendChild(document.createElement('p')).textContent = black_pawn;
        element.childNodes[i + 48].appendChild(document.createElement('p')).textContent = white_pawn;
        element.childNodes[i + 56].appendChild(document.createElement('p')).textContent = white_chesses[i];
        element = document.getElementById('chessBoardLetters1');
        element.appendChild(document.createElement('div')).textContent = letters[i];
        element = document.getElementById('chessBoardNumbers1');
        element.appendChild(document.createElement('div')).textContent = j;
        element = document.getElementById('chessBoardLetters');
        element.appendChild(document.createElement('div')).textContent = letters[i];
        element = document.getElementById('chessBoardNumbers');
        element.appendChild(document.createElement('div')).textContent = j;
    }

    //Выделяем ячейку при клике, делаем инъекцию её адреса в div и удаляем фигуры по клику

    for (let i = 0; i < 64; i++) {
		var element = {};
		var reserve_up = {};
		var reserve_down = {};
		var active=0;
		var black_reserve = '';
		var white_reserve = '';
		reserve_up = document.getElementById('black');
		reserve_up.appendChild(document.createElement('div'));
		reserve_down = document.getElementById('white');
		reserve_down.appendChild(document.createElement('div'));
		element = document.getElementById('mainChessBoard');
		element.childNodes[i].onclick = function() {
		element.childNodes[active].classList.remove("click-coll");
		active = i;
		element.childNodes[i].classList.add("click-coll");
		var inner = document.getElementById('status');
		inner.innerHTML = element.childNodes[i].id;
		if (i >=0&&i<=15) {
		black_reserve = element.childNodes[i].textContent;
		element.childNodes[i].textContent = '';
		var black = document.getElementById('black');
		reserve_up.childNodes[i].innerHTML += black_reserve;
		reserve_up.childNodes[i].id = element.childNodes[i].id;
		}else if (i>=48&&i<=63){
		white_reserve = element.childNodes[i].textContent;
		element.childNodes[i].textContent = '';
		var white = document.getElementById('white');
		reserve_down.childNodes[i].innerHTML += white_reserve;
		reserve_down.childNodes[i].id = element.childNodes[i].id;	
		}
		}
	}

	//Восстанавливаем фигуры по клику

	for (let i = 0; i < 64; i++) {
	var reserve_up = {};
	var reserve_down = {};
	var element = {};
	reserve_up = document.getElementById('black');
	reserve_up.childNodes[i].onclick = function() {
		element = document.getElementById('mainChessBoard');
		var z = i;
		element.childNodes[z].innerHTML = reserve_up.childNodes[i].textContent;
		reserve_up.childNodes[i].textContent = '';
	}
	reserve_down = document.getElementById('white');
	reserve_down.childNodes[i].onclick = function() {
		element = document.getElementById('mainChessBoard');
		var z = i;
		element.childNodes[z].innerHTML = reserve_down.childNodes[i].textContent;
		reserve_down.childNodes[i].textContent = '';
	}
	}

	//Узнаем ID выбранной ячейки

	for (var i = 0; i < 8; i++) {
		var element = {};
		element = document.getElementById('mainChessBoard');
		element.childNodes[i].id = letters[i]+8;
		element.childNodes[i+8].id = letters[i]+7;
		element.childNodes[i+16].id = letters[i]+6;
		element.childNodes[i+24].id = letters[i]+5;
		element.childNodes[i+32].id = letters[i]+4;
		element.childNodes[i+40].id = letters[i]+3;
		element.childNodes[i+48].id = letters[i]+2;
		element.childNodes[i+56].id = letters[i]+1;
	}

	//Управляем перемещением по доске с клавиатуры

	var i = 0;
	var element = {};
	element = document.getElementById('mainChessBoard');
	var coll = element.childNodes[i];
	var previosColl = 0
	//Добавляем событие
	addEventListener("keydown", function(event) {
	//Стрелка вверх
    if (event.keyCode == 38){
    	element.childNodes[active].classList.remove("click-coll");
      if(i>=0&&i<=7){
  	  	previosColl = i;
  	  	i+=56;
  	  	element.childNodes[i].classList.add("click-coll");
  	  }else{
  	  	previosColl = i;
  	    i-=8;
        element.childNodes[i].classList.add("click-coll");	
  	  }
  	  var inner = document.getElementById('status');
	  inner.innerHTML = element.childNodes[i].id;
	//Стрелка вниз
  	}else if (event.keyCode == 40) {
  		element.childNodes[active].classList.remove("click-coll");
  	  if(i>=56&&i<=63){
  	  	previosColl = i;
  	    i-=56;
        element.childNodes[i].classList.add("click-coll");
      }else{
  	  	previosColl = i;
  	  	i+=8;
  	  	element.childNodes[i].classList.add("click-coll");
  	  }
      var inner = document.getElementById('status');
	  inner.innerHTML = element.childNodes[i].id;
	//Стрелка вправо
  	}else if (event.keyCode == 39) {
  	  element.childNodes[active].classList.remove("click-coll");
  	  if (i>=63){
  	  	previosColl = i;
  	  	i-=7;
  	  	element.childNodes[i].classList.add("click-coll");
  	  }else{
  	  	previosColl = i;
  	  	i++;
  	  	element.childNodes[i].classList.add("click-coll");
  	  }
      var inner = document.getElementById('status');
	  inner.innerHTML = element.childNodes[i].id;
	//Стрелка влево
	}else if (event.keyCode == 37) {
		element.childNodes[active].classList.remove("click-coll");
      if (i<=0) {
      	previosColl += i;
      	i+=7;
      	element.childNodes[i].classList.add("click-coll");
      }else{
      	previosColl = i;
      	i--;
  	    element.childNodes[i].classList.add("click-coll");
  	  }
  	  var inner = document.getElementById('status');
	  inner.innerHTML = element.childNodes[i].id;
	}
  	});
    addEventListener("keyup", function(event) {
    if (event.keyCode == 38){
      element.childNodes[previosColl].classList.remove("click-coll");
    }else if (event.keyCode == 40) {
  	  element.childNodes[previosColl].classList.remove("click-coll");
  	}else if (event.keyCode == 39) {
  	  element.childNodes[previosColl].classList.remove("click-coll");
  	}else if (event.keyCode == 37) {
  	  element.childNodes[previosColl].classList.remove("click-coll");
  	}
    });
}

window.onload = chessBoard;