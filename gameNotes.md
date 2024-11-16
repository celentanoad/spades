Spades AKA "Penny Pitch"
Rules:
- 2 player variant
- players take turns capturing cards from the table
- must have one card in hand to take cards, for ex: 7 can pick up a 3 and a 4

Players are each dealt 7 cards
6 cards go to the center face up
Players take turn capturing cards
As far as played cards (not for scoring but for capturing):
  - Ace = 1
  - King = 13
  - Queen = 12
  - Jack = 11
Captured cards go in a scoring pile for the player
Once a card is captured, a new card from the deck replaces it
When a player is out of cards, they draw 7 more cards (or whatever is left in the draw pile)
If both players pass (and cannot capture), the round ends and the players score piles are counted up

Game will continue for a set amount of rounds?
Scoring: 
- 3 points for most spades
- 2 points for most cards
- 1 point for each ace
- 1 point for 10 of diamonds
- 1 point for 2 of spades


Steps:

Initial set up
- ~~Set up Node.js backend w/ socket.io~~
- ~~Initialize project~~
- ~~Create server file~~
- ~~Run server on 3001~~
- ~~Set up React frontend~~
- ~~Set up a file w/ basic websocket connection~~
- ~~“Create game” and “join game” buttons~~
- ~~Test out create and join and see how players are added to a list~~

Actual Game development:
- Implement Game logic
  - Define game state and data structures
  - Implement core mechanics
  - Write unit tests
  - Integrate with web sockets
- Handle edge cases (disconnections, invalid moves)
- Expand game events
- Multiple rounds
- Maybe custom rules/scoring logic


Game State (components)
  - Opponent's cards (7)
  - Player's cards (7)
  - Draw pile
  - Game board
    - 6 cards face up
  - Opponent score pile
  - Player score pile
  - Text to display Turn order, current score (if playing multiple rounds), and round number
  - Pass button (turns play to opponent if no moves are possible- disabled if it's opponent's turn)
  - Leave game button (never disabled- if player clicks, show a pop up "are you sure?" to confirm)

Game mechanics (basically, the steps involved for each player's turn)
  - On new game/round start, set up initial game state
  - Random turn order is determined, and player 1 starts
  - On player turn, a 'capture' button appears, initially it is disabled
  - Player 1 can select any card in their hand, when clicking the card it gains a highlighted border
    - Player can only select 1 card at a time
  - Player then selects 1 or more cards from the board to capture
    - Cards on the board are highlighted when selected
    - Player can select any cards they want
    - If a valid combination is selected (player highlighted card value === board's highlighted card(s) value) then the capture button is enabled
    - When the player clicks the capture button
      - The card from their hand and all selected cards on the board go to the player's score pile
      - New cards are taken from the draw pile and added to the empty spaces on the board
      - Player 1's cards/buttons are disabled
      - Player 2 gains control
    - If the player has no valid moves, they can choose to pass instead of capture
    - When Pass button is clicked
      - game will check what the previous player did (score or pass)
      - If previous player scored, then game continues as normal
      - If previous player passed, then round will end
  - When the round/game ends
    - Cards is score pile are added up
    - Player with the most points wins (unless there are multiple rounds, then next round begins and score persists to next round)