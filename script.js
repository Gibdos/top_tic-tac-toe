const game = {
	gameBoard: ["", "", "", "", "", "", "", "", ""],
	gameStart() {
		playerOne.isRound = true;
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
			console.log("PLAYER ONE WINS");
			playerOne.score++;
			displayController.showScore();
			displayController.showWinner(playerOne);
			displayController.reset();
		} else if (hState1 === "OOO" || hState2 === "OOO" || hState3 === "OOO" || vState1 === "OOO" || vState2 === "OOO" || vState3 === "OOO" || dState1 === "OOO" || dState2 === "OOO") {
			console.log("PLAYER TWO WINS");
			playerTwo.score++;
			displayController.showScore();
			displayController.showWinner(playerTwo);
			displayController.reset();
		} else if (this.gameBoard.includes("")) {
			displayController.showPlayer();
		} else {
			console.log("THAT IS A TIE!");
			const noOne = {
				name: "No one",
			};
			displayController.showScore();
			displayController.showWinner(noOne);
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

const displayController = {
	reset() {
		const gameFieldBlocks = document.querySelectorAll(".field-block");
		gameFieldBlocks.forEach((element) => {
			element.innerHTML = "";
		});
		document.body.outerHTML = document.body.outerHTML;
		game.reset();
	},

	createHTML(clickedField) {
		if (playerOne.isRound) {
			const Block = document.createElement("div");
			Block.classList.add("X");
			this.addHTML(clickedField, Block);
		} else {
			const Block = document.createElement("div");
			Block.classList.add("O");
			this.addHTML(clickedField, Block);
		}
	},
	addHTML(clickedField, block) {
		const fieldInner = clickedField.target;
		console.log(fieldInner);
		const setPiece = clickedField.target.classList[0] - 1;
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
};

// Initialize Game
const playerOne = new playerCreator("PlayerOne", "X");
const playerTwo = new playerCreator("PlayerTwo", "O");
game.gameStart();
