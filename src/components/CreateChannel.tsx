import React from "react";
import { UserCircle } from "lucide-react";
import { useUserStore } from "../states/user";
import { Avatar } from "@mui/material";

function CreateChannel() {
  const {
    userInfo: { avatarUrl },
  } = useUserStore();

  // TODO: Fix the width height issue of the avatar part
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 rounded-lg bg-white shadow-lg max-w-md w-full">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <Avatar className="w-44 h-44 text-gray-400" src={avatarUrl} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Become a creator yourself!
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full sm:w-auto">
          Create Channel
        </button>
      </div>
    </div>
  );
}

export default CreateChannel;
