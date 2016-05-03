/*
WARRIORJS SOLUTIONS
translated to mostly-ES6 JavaScript by Joe Maffei
from original Ruby code by Gant
http://www.iconoclastlabs.com/blog/ruby-warrior-walkthrough-part-3

NORMAL MODE ---------------------
Level 1:    0     8     2    S
Level 2:   12    10     4    S
Level 3:   48     9    11    A
Level 4:   55    13    14    A
Level 5:   78    17    19    A
Level 6:   58     0    12    D
Level 7:   31     0     6    C
Level 8:   26    12     8    S
Level 9:   74     3    15    A
TOTAL POINTS: 545

EPIC MODE -----------------------
         Level  Time Clear Level
         Score Bonus Bonus Grade
Level 1:    0     8     2    S
Level 2:   12     9     4    A
Level 3:   48    11    12    S
Level 4:   55    19    15    A
Level 5:   78    21    20    A
Level 6:   38    33     0    D (one Captive left behind!)
Level 7:   31    12     9    S
Level 8:   26    12     8    S
Level 9:   74     3    15    A
TOTAL POINTS: 575
*/

class Player {

  playTurn(w) {
    this.level9(w);
  }

  level1(w) {
    w.walk();
  }

  level2(w) {
    if (w.feel().isEmpty()) {
      w.walk();
    } else {
      w.attack();
    }
  }

  level3(w) {
    let restHealth = 7;
    if (w.feel().isEmpty()) {
      if (w.health() < restHealth) {
        w.rest();
      } else {
        w.walk();
      }
    } else {
      w.attack();
    }
  }

  level4(w) {
    let shouldRest = function(w) {
      let safe = (w.health() >= lastHealth);
      let badHealth = (w.health() < restHealth);
      return (safe && badHealth);
    };

    if (w.feel().isEmpty()) {
      if (shouldRest(w)) {
        w.rest();
      } else {
        w.walk();
      }
    } else {
      w.attack();
    }

    lastHealth = w.health();
  }

  level5(w) {
    let frontSpace = w.feel();

    let shouldRest = function(w) {
      let safe = (w.health() >= lastHealth);
      let badHealth = (w.health() < restHealth);
      return (safe && badHealth);
    };

    if (frontSpace.isEmpty()) {
      if (shouldRest(w)) {
        w.rest();
      } else {
        w.walk();
      }
    } else if (frontSpace.isCaptive()) {
      w.rescue();
    } else {
      w.attack();
    }

    lastHealth = w.health();
  }

  level6(w) {
    let feelSpace = w.feel(direction);

    let safe = function(w) {
      return (w.health() >= lastHealth);
    };

    let shouldRest = function(w) {
      let badHealth = (w.health() < restHealth);
      return (safe(w) && badHealth);
    };

    let shouldFlee = function(w) {
      return (!safe(w) && (w.health() < fleeHealth));
    };

    if (feelSpace.isEmpty()) {
      if (shouldFlee(w)) {
        direction = 'backward';
        w.walk(direction);
      } else if (shouldRest(w)) {
        w.rest();
      } else {
        w.walk(direction);
      }
    } else if (feelSpace.isCaptive()) {
      w.rescue(direction);
    } else if (feelSpace.isWall()) {
      direction = 'forward';
    } else {
      w.attack();
    }

    lastHealth = w.health();
  }

  level7(w) {
    let feelSpace = w.feel(direction);

    let safe = function(w) {
      return (w.health() >= lastHealth);
    };

    let shouldRest = function(w) {
      let badHealth = (w.health() < restHealth);
      return (safe(w) && badHealth);
    };

    let shouldFlee = function(w) {
      return (!safe(w) && (w.health() < fleeHealth));
    };

    if (feelSpace.isEmpty()) {
      if (shouldFlee(w)) {
        direction = 'backward';
        w.walk(direction);
      } else if (shouldRest(w)) {
        w.rest();
      } else {
        w.walk(direction);
      }
    } else if (feelSpace.isCaptive()) {
      w.rescue(direction);
    } else if (feelSpace.isWall()) {
      direction = 'forward';
      w.pivot();
    } else {
      w.attack();
    }
    lastHealth = w.health();
  }

  level8(w) {
    let feelSpace = w.feel(direction);

    let clearShot = function(w) {
      let glance = w.look(direction);
      let distanceToEnemy = function(glance) {
        for (let i in glance) {
          if (glance[i].isEnemy()) {
            return i;
          }
        }
        return maxGlance;
      };
      let distanceToCaptive = function(glance) {
        for (let i in glance) {
          if (glance[i].isCaptive()) {
            return i;
          }
        }
        return maxGlance;
      };
      return (distanceToEnemy(glance) < distanceToCaptive(glance));
    };

    let safe = function(w) {
      return (w.health() >= lastHealth);
    };

    let shouldRest = function(w) {
      var badHealth = (w.health() < restHealth);
      return (safe(w) && badHealth);
    };

    let shouldFlee = function(w) {
      return (!safe(w) && (w.health() < fleeHealth));
    };

    if (clearShot(w)) {
      w.shoot();
    } else if (feelSpace.isEmpty()) {
      if (shouldFlee(w)) {
        direction = 'backward';
        w.walk(direction);
      } else if (shouldRest(w)) {
        w.rest();
      } else {
        w.walk(direction);
      }
    } else if (feelSpace.isCaptive()) {
      w.rescue(direction);
    } else if (feelSpace.isWall()) {
      direction = 'forward';
      w.pivot();
    } else {
      w.attack();
    }
    lastHealth = w.health();
  }

  level9(w) {
    let feelSpace = w.feel(direction);

    let safe = function(w) {
      return (w.health() >= lastHealth);
    };

    let clearShot = function(w) {
      let glance = w.look(direction);
      let distanceToEnemy = function(glance) {
        for (let i in glance) {
          if (glance[i].isEnemy()) {
            return i;
          }
        }
        return maxGlance;
      };
      let distanceToCaptive = function(glance) {
        for (let i in glance) { *
          if (glance[i].isCaptive()) {
            return i;
          }
        }
        return maxGlance;
      };
      return ((safe(w)) && (distanceToEnemy(glance) < distanceToCaptive(glance)));
    };

    let shouldRest = function(w) {
      let badHealth = (w.health() < restHealth);
      return (safe(w) && badHealth);
    };

    let shouldFlee = function(w) {
      return (!safe(w) && (w.health() < fleeHealth));
    };

    if (clearShot(w)) {
      w.shoot();
    } else if (feelSpace.isEmpty()) {
      if (shouldFlee(w)) {
        direction = 'backward';
        w.walk(direction);
      } else if (shouldRest(w)) {
        w.rest();
      } else {
        w.walk(direction);
      }
    } else if (feelSpace.isCaptive()) {
      w.rescue(direction);
    } else if (feelSpace.isWall()) {
      direction = 'forward';
      w.pivot();
    } else {
      w.attack();
    }
    lastHealth = w.health();
  }
}

let restHealth = 15,
    fleeHealth = 7,
    lastHealth = 20,
    maxGlance = 4,
    direction = 'forward';
    
global.Player = Player;
