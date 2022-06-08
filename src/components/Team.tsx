import { Grid, ActionPanel, Action, Icon } from "@raycast/api";
import { Team } from "../types/standings.types";
import Roster from "../views/roster";

type PropTypes = {
  team: Team;
};

const TeamComponent = ({ team }: PropTypes) => {
  return (
    <Grid.Item
      key={team.id}
      title={team.name}
      content={team.logo}
      subtitle={`W: ${team.wins} • L: ${team.losses}`}
      // accessories={[{ text: `W: ${team.wins}` }, { text: `L: ${team.losses}` }]}
      actions={
        <ActionPanel>
          <Action.Push title="View Roster" icon={Icon.Person} target={<Roster id={team.id} />} />
          <Action.OpenInBrowser title="View Team on ESPN" url={team.link} />
        </ActionPanel>
      }
    />
  );
};

export default TeamComponent;
