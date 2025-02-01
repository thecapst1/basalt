import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Leaderboard = () => {
  const data = [
    { rank: 1, name: "Team 1", score: 980 },
    { rank: 2, name: "Team 2", score: 870 },
    { rank: 3, name: "Team 3", score: 760 },
    { rank: 4, name: "Team 4", score: 650 },
    { rank: 5, name: "Team 5", score: 540 },
    { rank: 6, name: "Team 6", score: 540 },
    { rank: 7, name: "Team 6", score: 540 },
    { rank: 8, name: "Team 6", score: 540 },
    { rank: 9, name: "Team 6", score: 540 },

  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-400 text-black";
      case 2:
        return "bg-gray-400 text-black";
      case 3:
        return "bg-orange-400 text-black";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-10 p-6">
      <h2 className="text-3xl font-bold">Leaderboard</h2>

      <div className="flex flex-wrap w-full justify-center gap-4">
        {data.map((player) => (
          <Card
            key={player.rank}
            className="w-[30vw] p-4 shadow-md rounded-xl"
          >
            <CardHeader className="flex flex-col gap-5 items-center justify-center">
              <span className="text-lg font-semibold">{player.name}</span>
              <div className="flex flex-row justify-center items-center gap-2 text-lg font-semibold">
                <span>
                  <b>Rank:</b>
                </span>
                <Badge className={`w-10 h-10 flex justify-center items-center text-lg font-semibold rounded-full ${getRankColor(player.rank)}`}>
                  {player.rank}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <span className="text-lg font-medium">{player.score} pts</span>
            </CardContent>
            <CardFooter>
              <p>Jello</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

};

export default Leaderboard;
