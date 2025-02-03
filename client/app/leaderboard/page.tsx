import React from "react";
import { Card, CardHeader } from "@/components/ui/card";

const getRankColor = (testResults: string[]) => {
  let result = "";
  testResults.forEach(Element => {
    result = Element;
    if (result === "Passed") {
      return "bg-green-500 text-white";
    } else {
      return "bg-red-500 text-white";
    }
  });
  
};

const TeamRank = () => {
  const data = [
    { rank: 1, name: "Team 1", score: 980, tests: ["Passed", "Passed", "Passed", "Passed", "Passed", "Passed", "Passed"] },
    { rank: 2, name: "Team 2", score: 870, tests: ["Passed", "Passed", "Passed", "Passed", "Passed", "Failed", "Passed"] },
    { rank: 3, name: "Team 3", score: 760, tests: ["Passed", "Passed", "Passed", "Passed", "Failed", "Failed", "Failed"] },
    { rank: 4, name: "Team 4", score: 650, tests: ["Passed", "Passed", "Passed", "Failed", "Failed", "Failed", "Failed"] },
    { rank: 5, name: "Team 5", score: 540, tests: ["Passed", "Passed", "Failed", "Failed", "Failed", "Failed", "Failed"] },
    { rank: 6, name: "Team 6", score: 530, tests: ["Passed", "Passed", "Failed", "Failed", "Failed", "Failed", "Failed"] },
    { rank: 7, name: "Team 7", score: 520, tests: ["Passed", "Passed", "Failed", "Failed", "Failed", "Failed", "Failed"] },
    { rank: 8, name: "Team 8", score: 510, tests: ["Passed", "Passed", "Failed", "Failed", "Failed", "Failed", "Failed"] },
    { rank: 9, name: "Team 9", score: 500, tests: ["Passed", "Passed", "Failed", "Failed", "Failed", "Failed", "Failed"] },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-10 p-6">
      <h2 className="text-3xl font-bold">Leaderboard</h2>

      <div className="flex flex-row flex-wrap w-full justify-center gap-4">
        {data.map((player) => (
          <Card
            key={player.rank}
            className="w-[50vw] shadow-md rounded-xl"
          >
            <CardHeader className="flex flex-row w-[full] items-center justify-between">
              <span className="text-lg font-semibold">{player.name}</span>
              <span>
                <b>Rank:</b>
              </span>
              {/* <Badge className={`w-10 h-10 flex justify-center items-center text-lg font-semibold rounded-full ${getRankColor(player.rank)}`}>
                  {player.rank}
                </Badge> */}
              <span className="text-lg font-medium">{player.score} pts</span>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function Leaderboard() {
  return (
    <TeamRank />
  );
}
