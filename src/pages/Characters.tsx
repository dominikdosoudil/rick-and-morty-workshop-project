import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { apiResponse } from "../parsers/apiResponse.ts";
import { characterParser } from "../parsers/character.ts";
import { z } from "zod";

interface CharactersProps {}

const Characters = ({}: CharactersProps) => {
  const characters = useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const json = await ky
        .get("https://rickandmortyapi.com/api/character/?page=1")
        .json();
      return apiResponse(z.array(characterParser)).parse(json);
    },
    retry: false,
  });

  if (characters.isLoading) {
    return "loading";
  }

  if (characters.isError) {
    return "error";
  }

  if (!characters.isSuccess) {
    return "unknown error";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".4em" }}>
      {characters.data.results.map((character) => (
        <div>{character.name}</div>
      ))}
    </div>
  );
};

export default Characters;
