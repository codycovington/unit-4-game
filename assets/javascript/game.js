// Define global variables

var character = [];

var defender = [];

// Number of enemies defeated
var enemiesDefeated = 0;

// Boolean to indicate whether or not the game is over
gameOver = false;

// Has the user selected their character
var characterSelected = false;

// Has the user selected the defender
var defenderSelected = false;


// Define character objects
// -----------------------------------------
var obiwan = {
    name: "ObiWan",
    hp: 100,
    baseAttack: 20,
    attack: 20
};

var lukeskywalker = {
    name: "Luke Skywalker",
    hp: 100,
    baseAttack: 20,
    attack: 20
};

var hansolo = {
    name: "Han Solo",
    hp: 100,
    baseAttack: 20,
    attack: 20
};

var kyloren = {
    name: "Kylo Ren",
    hp: 100,
    baseAttack: 20,
    attack: 20
};
// -------------------------------------------------------------------------------------------

function initializeCharacter(chosenCharacter) {
    character.name = chosenCharacter.name;
    character.hp = chosenCharacter.hp;
    character.baseAttack = chosenCharacter.baseAttack;
    character.attack = chosenCharacter.attack;
  }
  
  
  function initializeDefender(chosenDefender) {
    defender.name = chosenDefender.name;
    defender.hp = chosenDefender.hp;
    defender.baseAttack = chosenDefender.baseAttack;
    defender.attack = chosenDefender.attack;
  }


// Move remaining characters to enemies area
function moveToEnemies() {
    $(".available-character").removeClass("available-character").addClass("enemy-character");
    $("#enemies_area").append($(".enemy-character"));
  }
//--------------------------------------------------------------------------------------------



// This function will reset the state of the game

function resetGame() {
    // Reset all the hp values to the original
    $("#obiwan_area").children(".hp").html(obiwan.hp);
    $("#luke_area").children(".hp").html(lukeskywalker.hp);
    $("#hansolo_area").children(".hp").html(hansolo.hp);
    $("#kyloren_area").children(".hp").html(kyloren.hp);
  
    $(".charbox").removeClass("chosen-character enemy-character defender-character").addClass("available-character");
    var available = $(".available-character").show();
    $("#characters_start_area").html(available);
  
    $("#game_message").empty();
    $("#restart").hide();
  
    characterSelected = false;
    defenderSelected = false;
    enemiesDefeated = 0;
    gameOver = false;
  
    character = {};
    defender = {};
  }

// Ready javascript after html loaded
$(document).ready(function() {

    // Hide the "Restart" button on document load
    $("#restart").hide();
  
    // Determine which character the user has clicked
    $("#obiwan_area").on("click", function () {
      console.log("Obiwan is selected");
  
      // User is choosing the character
      if(characterSelected == false) {
        $("#game_message").empty();
  
        // Set the user's character
        initializeCharacter(obiwan);
        characterSelected = true;
  
        // Display the chosen character
        $("#obiwan_area").removeClass("available-character").addClass("chosen-character");
        $("#your_character_area").append(this);
  
        // Move the remaining characters to the enemies section
        moveToEnemies();
      } else if ((characterSelected == true) && (defenderSelected == false)) {
        // User is choosing the defender
        if($("#obiwan_area").hasClass("enemy-character")) {
          $("#game_message").empty();
  
          // Set the user's enemy
          initializeDefender(obiwan);
          defenderSelected = true;
  
          // Add the character to the defender section
          $("#obiwan_area").removeClass("enemy-character").addClass("defender-character");
          $("#defender_area").append(this);
        }
      }
    });



$("#luke_area").on("click", function () {
    console.log("Luke Skywalker is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game_message").empty();

      // Set the user's character
      initializeCharacter(lukeskywalker);
      characterSelected = true;

      // Display the chosen character
      $("#luke_area").removeClass("available-character").addClass("chosen-character");
      $("#your_character_area").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#luke_area").hasClass("enemy-character")) {
        $("#game_message").empty();

        // Set the user's enemy
        initializeDefender(lukeskywalker);
        defenderSelected = true;

        // Add the character to the defender section 
        $("#luke_area").removeClass("enemy-character").addClass("defender-character");
        $("#defender_area").append(this);
      }
    }
  });

  $("#hansolo_area").on("click", function () {
    console.log("Han Solo is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game_message").empty();

      // Set the user's character
      initializeCharacter(hansolo);
      characterSelected = true;

      // Display the chosen character
      $("#hansolo_area").removeClass("available-character").addClass("chosen-character");
      $("#your_character_area").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#hansolo_area").hasClass("enemy-character")) {
        $("#game_message").empty();

        // Set the user's enemy
        initializeDefender(hansolo);
        defenderSelected = true;

        // Add the character to the defender section 
        $("#hansolo_area").removeClass("enemy-character").addClass("defender-character");
        $("#defender_area").append(this);
      }
    }
  });

  $("#kyloren_area").on("click", function () {
    console.log("Kylo Ren is selected");

    // User is choosing the character
    if(characterSelected == false) {
      $("#game_message").empty();

      // Set the user's character
      initializeCharacter(kyloren);
      characterSelected = true;

      // Display the chosen character
      $("#kyloren_area").removeClass("available-character").addClass("chosen-character");
      $("#your_character_area").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#kyloren_area").hasClass("enemy-character")) {
        $("#game_message").empty();

        // Set the user's enemy
        initializeDefender(kyloren);
        defenderSelected = true;

        // Add the character to the defender section 
        $("#kyloren_area").removeClass("enemy-character").addClass("defender-character");
        $("#defender_area").append(this);
      }
    }
  });
//---------------------------------------------------------------------------------------------

// Attack and health functions
$("#attack").on("click", function() {

    // User is ready to attack the defender
    if (characterSelected && defenderSelected && !gameOver) {
      // User attacks the defender and decreases the defender's hp points
      defender.hp = defender.hp - character.attack;
      $(".defender-character").children(".hp").html(defender.hp);
      $("#game_message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");

      // User's attack power increases
      character.attack = character.attack + character.baseAttack;

      // If defender is still alive, they counter attack the user
      if (defender.hp > 0) {
        character.hp = character.hp - defender.baseAttack;
        $(".chosen-character").children(".hp").html(character.hp);

        // Check if the user survives the attack
        if (character.hp > 0) {
          $("#game_message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game_message").html("<p>You were defeated... womp womp...</p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
        // Defender is defeated
        enemiesDefeated++;
        defenderSelected = false;
        $("#game_message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender-character").hide();

        // Check if the user has won the game
        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game_message").html("<p>You Win!!!</p><p>Play again?</p>");
          alert("Winner");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game_message").html("<p>You must first select your game character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game_message").html("<p>You must choose an enemy to fight.</p>");
    }

    
  });

  $("#restart").on("click", function() {
    console.log("Restart selected");

    resetGame();
  });

}); // Main routine


