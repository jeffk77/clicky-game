import React, {Component} from "react";
import "./Grid.css";
import teamBlocks from "../../sportsteams.json";
import Card from "../Card";
import Header from "../Header/Header";


class Grid extends Component {
    state = {
        teams: teamBlocks,
        score: 0
    }

    resetGame = () => {
        this.setState({
            score: 0,
            teams: teamBlocks
        })      
    }

    handleCorrect = newteams => {
        this.setState({
            teams: this.shuffleArray(newteams), 
            score: this.state.score +1,
        });
        
        if (this.state.score === 11) {
            this.resetGame();
            console.log("You won!");
        }

    };

    handleWrong = () => {
        this.resetGame();
    };

    handleClick = name => {
        let guessedCorrect = false;
        const newteams = this.state.teams.map(team => {
           const newPic = {...team};
           if (newPic.name === name) {
               if(!newPic.clicked){
                   console.log("Already guessed------------");
                   newPic.clicked = true;
                   guessedCorrect = true;
               }
               
           }
           return newPic;
       })       
       console.log("GUESSED CORRECT: ", guessedCorrect)
       guessedCorrect ? this.handleCorrect(newteams) : this.handleWrong(newteams)
    };

    shuffleArray = teams => {
        for (let i = teams.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [teams[i], teams[j]] = [teams[j], teams[i]];
        }
        return (teams);
    };

    render() {
        return(
            <div>
                <Header score={this.state.score}/>
                <div className="gridWrapper">
                    <div className="grid">
                    {this.state.teams.map(team => {
                            return (<Card 
                            name={team.name}
                            key={team.name} 
                            handleClick={this.handleClick}
                            src={team.image} 
                            alt={team.name}  
                        />)
                        })}
                    </div>
                </div>
            </div> 
        );
    }
};

export default Grid;
    