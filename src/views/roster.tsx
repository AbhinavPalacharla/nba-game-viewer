import { List, Toast, showToast } from "@raycast/api";
import type { Player } from "../types/roster.types";
import useRoster from "../hooks/useRoster";
import { useState } from "react";
import PlayerComponent from "../components/Player";

type RosterArgs = {
  id: number;
};

const Roster = ({ id: id }: RosterArgs) => {
  const data = useRoster({ id: id });
  const [showingDetail, setIsShowingDetail] = useState<boolean>(false);

  if (data.error) {
    showToast(Toast.Style.Failure, "Failed to get roster");
    data.loading = false;
  }

  return (
    <List isLoading={data.loading} isShowingDetail={showingDetail}>
      {data.roster.map((player: Player) => {
        return <PlayerComponent key={player.id} player={player} setIsShowingDetail={setIsShowingDetail} />;
      })}
    </List>
  );
};

export default Roster;
