export interface GolfTableDataObject {
  yardage: number;
  handicap: number;
  par: number;
  hole_num: number;
}

export interface PlayerScore {
  in_score: number;
  out_score: number;
  total: number;
}

export interface Player {
  playerScores: number[][];
  playerNames: string[];
  selectedCourse: any;
  selectedTee: any;
  numberOfPlayers: number;
}
