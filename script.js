const game = {
	gameBoard: ["", "", "", "", "", "", "", "", ""],
	gameStart() {
		document.querySelector("#start-button").setAttribute("disabled", "1");
		playerOne.isRound = true;
		displayController.createBoard();
		this.addListener();
		displayController.showPlayer();
	},
	switchPlayer() {
		playerOne.isRound = !playerOne.isRound;
		playerTwo.isRound = !playerTwo.isRound;
	},
	checkRound() {
		let hState1 = this.gameBoard[0] + game.gameBoard[1] + game.gameBoard[2];
		let hState2 = this.gameBoard[3] + game.gameBoard[4] + game.gameBoard[5];
		let hState3 = this.gameBoard[6] + game.gameBoard[7] + game.gameBoard[8];
		let vState1 = this.gameBoard[0] + game.gameBoard[3] + game.gameBoard[6];
		let vState2 = this.gameBoard[1] + game.gameBoard[4] + game.gameBoard[7];
		let vState3 = this.gameBoard[2] + game.gameBoard[5] + game.gameBoard[8];
		let dState1 = this.gameBoard[0] + game.gameBoard[4] + game.gameBoard[8];
		let dState2 = this.gameBoard[2] + game.gameBoard[4] + game.gameBoard[6];
		if (hState1 === "XXX" || hState2 === "XXX" || hState3 === "XXX" || vState1 === "XXX" || vState2 === "XXX" || vState3 === "XXX" || dState1 === "XXX" || dState2 === "XXX") {
			playerOne.score++;
			displayController.showScore();
			displayController.showWinner(playerOne);
			displayController.reset();
		} else if (hState1 === "OOO" || hState2 === "OOO" || hState3 === "OOO" || vState1 === "OOO" || vState2 === "OOO" || vState3 === "OOO" || dState1 === "OOO" || dState2 === "OOO") {
			playerTwo.score++;
			displayController.showScore();
			displayController.showWinner(playerTwo);
			displayController.reset();
		} else if (this.gameBoard.includes("")) {
			displayController.showPlayer();
		} else {
			const noWinner = {
				name: "No one",
			};
			displayController.showScore();
			displayController.showWinner(noWinner);
			displayController.reset();
		}
	},
	reset() {
		this.gameBoard = ["", "", "", "", "", "", "", "", ""];
		this.addListener();
		displayController.showPlayer();
	},
	addListener() {
		const eventHandler = document.querySelectorAll(".field-block");
		eventHandler.forEach((element) => {
			element.addEventListener(
				"click",
				(e) => {
					displayController.createHTML(e);
				},
				{ once: true }
			);
		});
	},
};

function playerCreator(name, marker) {
	(this.name = name), (this.marker = marker), (this.score = 0), (this.isRound = false);
}

function setPName() {
	const p1Name = document.querySelector("#p1name").value;
	const p2Name = document.querySelector("#p2name").value;
	if (p1Name === "" || p2Name === "") {
		displayController.showPlayerName();
		game.gameStart();
	} else {
		playerOne.name = p1Name;
		playerTwo.name = p2Name;
		displayController.showPlayerName();
		game.gameStart();
	}
}

const displayController = {
	reset() {
		const gameFieldBlocks = document.querySelectorAll(".field-block");
		gameFieldBlocks.forEach((element) => {
			const fadeOut = element.classList.add("clear");
			// element.innerHTML = "";
		});
		document.body.outerHTML = document.body.outerHTML;
		setTimeout(() => {
			const fadeIn = document.querySelectorAll(".clear");
			fadeIn.forEach((e) => {
				e.classList.remove("clear");
				e.innerHTML = "";
			});
			game.reset();
		}, 500);
	},

	createHTML(clickedField) {
		if (playerOne.isRound) {
			const Block = document.createElement("div");
			Block.classList.add("X", "placed-block");
			this.addHTML(clickedField, Block);
		} else {
			const Block = document.createElement("div");
			Block.classList.add("O", "placed-block");
			this.addHTML(clickedField, Block);
		}
	},

	addHTML(clickedField, block) {
		const fieldInner = clickedField.target;
		const setPiece = clickedField.target.classList[0];
		const marker = block.classList[0];
		clickedField.target.appendChild(block);
		game.gameBoard[setPiece] = marker;
		game.switchPlayer();
		game.checkRound();
	},

	showScore() {
		const p1Score = document.querySelector(".score1");
		const p2Score = document.querySelector(".score2");
		p1Score.innerText = playerOne.score;
		p2Score.innerText = playerTwo.score;
	},

	showPlayer() {
		const p1 = document.querySelector(".p1");
		const p2 = document.querySelector(".p2");
		if (playerOne.isRound) {
			p1.classList.add("is-round");
			p2.classList.remove("is-round");
		} else {
			p2.classList.add("is-round");
			p1.classList.remove("is-round");
		}
	},

	showWinner(player) {
		const h3Winner = document.querySelector(".winner");
		h3Winner.innerText = `${player.name} wins!`;
	},
	createBoard() {
		game.gameBoard.forEach((e, i) => {
			const playField = document.querySelector("#game-board");
			const divField = document.createElement("div");
			divField.classList.add(i, "field-block");
			playField.appendChild(divField);
		});
	},

	showPlayerName() {
		const h2P1Name = document.querySelector("#player-1-name");
		const h2P2Name = document.querySelector("#player-2-name");
		h2P1Name.textContent = playerOne.name;
		h2P2Name.textContent = playerTwo.name;
		this.showGame();
		this.hidePlayer();
	},

	showGame() {
		const showField = document.querySelectorAll(".hidden");
		showField.forEach((e) => {
			e.classList.remove("hidden");
		});
	},

	hidePlayer() {
		const hidePlayerName = document.querySelector(".setUp");
		hidePlayerName.classList.add("hidden");
	},
	restartGame() {
		window.location.reload();
	},
};

// Initialize Game
// displayController.createBoard();
const playerOne = new playerCreator("Player One", "X");
const playerTwo = new playerCreator("Player Two", "O");
// game.gameStart();
