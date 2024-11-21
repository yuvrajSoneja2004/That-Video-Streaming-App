import React from "react";
import { useMutation, useQuery } from "react-query";
import {
  fetchVideoSuggestions,
  saveToGlobalSuggestions,
  saveToSuggestionsHistory,
} from "../helpers/fetchVideoSuggestions";
import { fetchSuggestionsHistory } from "../helpers/fetchSuggestionsHistory";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { THEME } from "../constants/theme";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function VideoSuggestionsBox({ query }: { query: string }) {
  const [user] = useAuthState(auth);
  const { data, isLoading, error, isError, refetch } = useQuery(
    ["searchQuery", query],
    () => {
      if (query.trim() === "") {
        return fetchSuggestionsHistory(user?.uid);
      } else {
        return fetchVideoSuggestions(query);
      }
    }
  );

  const { mutate } = useMutation(
    (suggestionQuery: string) =>
      saveToSuggestionsHistory(user?.uid, suggestionQuery),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const searchMutation = useMutation(() => saveToGlobalSuggestions(query));

  if (isError) {
    return (
      <div className="w-full min-h-[400px] bg-white absolute top-12 left-0 rounded-lg flex items-center justify-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const handleSaveToHistory = async (suggestionId: string) => {
    mutate(suggestionId);
  };

  return (
    <div
      className="w-full  absolute top-0 left-0 rounded-lg "
      style={{ background: THEME.dark.backgroundSecondary }}
    >
      {data?.map((item: any) => (
        <div
          key={item?.id}
          className={`p-4 hover:bg-gray-800 cursor-pointer rounded-tl-lg rounded-tr-lg`}
        >
          <div onClick={() => handleSaveToHistory(item.query)}>
            {query === "" ? <RestoreOutlinedIcon /> : <SearchOutlinedIcon />}
            <span className="ml-2 font-bold">{item.query}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoSuggestionsBox;
