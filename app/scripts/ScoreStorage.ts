export interface MaxScore {
    wave: number;
    score: number;
}

export class ScoreStorage {
    static save(wave: number, score: number) {
        const maxScore = this.read();
        
        if (null === maxScore || (maxScore.wave > maxScore.wave || score > maxScore.score)) {
            localStorage.setItem('maxGameScore', JSON.stringify(<MaxScore>{wave: wave, score: score}));
        }
    }

    static read(): MaxScore | null {
        return JSON.parse(localStorage.getItem('maxGameScore'))
    }
}