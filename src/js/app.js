import { Board } from "./game_components/board";
import { Tile } from "./game_components/tile";

export var settings = {
  difficulty: "easy",
  playerCharacter: "x",
};

$(document).ready(function () {
  var board = new Board(onWinner);

  handleToggle(
    "difficulty",
    ["#settings-btn-easy", "#settings-btn-hard"],
    ["easy", "hard"]
  );
  handleToggle(
    "playerCharacter",
    ["#settings-btn-x", "#settings-btn-o"],
    ["x", "o"],
    () => board.changePlayerCharacter()
  );


  $("#playAgainBtn").on("click", function() {
    board.restart();
    $('#gameOverModal').modal('hide');
    $("#playAgainBtnCircle").fadeOut();
  })

  $("#playAgainBtnCircle").on("click", function() {
    board.restart();
    $("#playAgainBtnCircle").fadeOut();
  })
});

function handleToggle(settingName, ids, settingVals, callback = undefined) {
  // Toggle buttons and set settingName to the corresponding settingVal
  ids.forEach((id, idx) => {
    var other_ids = [...ids].filter((x) => x !== id);
    $(id).on("click", function () {
      other_ids.forEach((other_id) => {
        $(other_id).removeClass("active");
        $(id).addClass("active");
      });
      settings[settingName] = settingVals[idx];
      if (callback !== undefined) {
        callback();
      }
    });
  });
}


function onWinner(winner) {
  $('#gameOverModal').modal('show');
  $("#playAgainBtnCircle").fadeIn();

  switch (winner) {
    case "player":
      $("#winnerText").html("You Win!");
      break;
    case "computer":
      $("#winnerText").html("You Lost!");
      break;
    case "tie":
      $("#winnerText").html("You Tied!");
  }
}