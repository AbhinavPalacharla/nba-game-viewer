import { Grid, List, ActionPanel, Action, Icon, popToRoot } from "@raycast/api";
import { Team } from "../types/standings.types";
import Roster from "../views/roster";

type PropTypes = {
  team: Team;
  viewType: "list" | "grid";
};

const GridTeamComponent = ({ team }: { team: Team }) => {
  return (
    <Grid.Item
      key={team.id}
      title={team.name}
      content={team.logo}
      subtitle={`W: ${team.wins} • L: ${team.losses}`}
      actions={
        <ActionPanel>
          <Action.Push title="View Roster" icon={Icon.Person} target={<Roster id={team.id} />} />
          <Action.OpenInBrowser title="View Team on ESPN" url={team.link} />
          <Action title="Back" />
        </ActionPanel>
      }
    />
  );
};

const ListTeamComponent = ({ team }: { team: Team }) => {
  return (
    <List.Item
      key={team.id}
      title={team.name}
      icon={team.logo}
      accessories={[{ text: `W: ${team.wins}` }, { text: `L: ${team.losses}` }]}
      actions={
        <ActionPanel>
          <Action.Push title="View Roster" icon={Icon.Person} target={<Roster id={team.id} />} />
          <Action.OpenInBrowser title="View Team on ESPN" url={team.link} />
        </ActionPanel>
      }
    />
  );
};

const TeamComponent = ({ team, viewType }: PropTypes) => {
  if (viewType === "list") {
    return <ListTeamComponent team={team} />;
  } else {
    return <GridTeamComponent team={team} />;
  }
};

export default TeamComponent;
