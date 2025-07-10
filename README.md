# Battleships Game

## Instructions

### Received technical assignment

*"*
*The challenge is to program a simple version of the game Battleships. Create
an application to allow a single human player to play a one-sided game of
Battleships against ships placed by the computer.*

*The program should create a 10x10 grid, and place a number of ships on the grid at random with the following sizes: <br>
• 1x Battleship (5 squares)<br>
• 2x Destroyers (4 squares)*

*The player enters coordinates of the form “A5”, where "A" is the column and
"5" is the row, to specify a square to target. Shots result in hits, misses or
sinks. The game ends when all ships are sunk.*
*"*

### To play
The game has not been hosted, so you will need to clone the repository, install the dependencies and run the code on your chosen environment.

## Execution

### Stack

* Programming language: Javascript / Typescript
* Framework: React
* JS Bundler: Vite
* Style: inline CSS

### Time management

* Planning (full understanding of the game, structuring the project): 1h
* Functionality (game grid creation, boats positioning, form validation and submission, resetting game, testing): 5h
* Style: 1h
* Quality and documentation (files structuring, typing, naming, commenting for readability): 1h30

Total: 8h30

### Declaration of AI Use

#### Choice of IDE:
I chose not to use Cursor and develop the code on VsCode so as to demonstrate my skills without over relying on AI. <br>
I did benefit from a few autocomplete suggestions from Github CoPilot, which accelerated the syntax production but did not create any reasoning in my stead.

#### Tasks that benefitted from IA help:
* writing the regex to validate the user input
* prompting the generateBattleshipConfiguration function before manually checking and improving it

### To go further

The task was supposed to be completed in about 6 hours. My goal was to not overpass too much that expectation.
Here is a list of improvements I would have implemented, had I dedicated more time to perfect the game:

#### Code quality and performance
* Unit tests for generateBattleshipConfiguration function
* Memoizations using either useMemo + useCallback or React Compiler to automatize them
* Implementation of tailwind and React styled components

#### UX / UI
* Animations to make the user experience more fluid and fun (eg: miss/hit/sink feedbacks, squares coloration, end of the game and resetting flow)
* Improve input error messages and positioning
* Make the grid clickable so the user can select the visual coordinate instead of having to enter it as a text input
* Make settings available to the user: decision over the grid size and the ships in presence in order to variate difficulty
* Deploy the code and host it on a domain name so anyone can play
