$(document).ready(initializeApp);
var game;
var cardList;

function initializeApp() {
  cardList = [
    [
      9,
      [
        {
          type: "plants",
          effects: {
            resources: {
              currentValue: 0,
              rate: 1
            }
          }
        }
      ],
      null,
      false
    ],
    [
      11,
      [
        {
          type: "energy",
          effects: {
            resources: {
              currentValue: 0,
              rate: 2
            }
          }
        }
      ],
      null,
      false
    ],
    [
      4,
      [
        {
          type: "energy",
          effects: {
            resources: {
              currentValue: 0,
              rate: 1
            }
          }
        }
      ],
      null,
      false
    ],
    [
      3,
      [
        {
          type: "heat",
          effects: {
            resources: {
              currentValue: 0,
              rate: 1
            }
          }
        }
      ],
      null,
      false
    ],
    [
      11,
      [
        {
          type: "energy",
          effects: {
            resources: {
              currentValue: 0,
              rate: 1
            }
          }
        }
      ],
      null,
      false
    ],
    [
      21,
      [
        {
          type: "money",
          effects: {
            resources: {
              currentValue: 0,
              rate: 5
            }
          }
        }
      ],
      null,
      false
    ],
    [
      35,
      [
        {
          type: "heat",
          effects: {
            resources: {
              currentValue: 0,
              rate: 7
            }
          }
        }
      ],
      null,
      false
    ],
    [
      9,
      [
        {
          type: "heat",
          effects: {
            resources: {
              currentValue: 0,
              rate: 2
            }
          }
        }
      ],
      null,
      false
    ],
    [
      17,
      [
        {
          type: "energy",
          effects: {
            resources: {
              currentValue: 0,
              rate: 3
            }
          }
        }
      ],
      null,
      false
    ],
    [
      14,
      [
        {
          type: "energy",
          effects: {
            resources: {
              currentValue: 0,
              rate: 3
            }
          }
        }
      ],
      null,
      false
    ],
    [
      7,
      [
        {
          type: "heat",
          effects: {
            resources: {
              currentValue: 0,
              rate: 1
            }
          }
        }
      ],
      null,
      false
    ]
  ];

  cardList = cardList
    .concat(cardList)
    .concat(cardList)
    .concat(cardList)
    .concat(cardList)
    .concat(cardList);
  game = new Game(cardList);
  game.newGame();
}
