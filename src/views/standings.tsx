import { Grid, Toast, showToast } from "@raycast/api";
import { Team } from "../types/standings.types";
import useStandings from "../hooks/useStandings";
import TeamComponent from "../components/Team";

const Standings = () => {
  const data = useStandings();

  if (data.error) {
    showToast(Toast.Style.Failure, "Failed to get roster");
    data.loading = false;
  }

  return (
    <Grid isLoading={data.loading} itemSize={Grid.ItemSize.Medium} inset={Grid.Inset.Medium}>
      <Grid.Section title="Eastern Conference">
        {data.standings.eastern.map((team: Team) => {
          return <TeamComponent key={team.id} team={team} />;
        })}
      </Grid.Section>
      <Grid.Section title="Western Conference">
        {data.standings.western.map((team: Team) => {
          return <TeamComponent key={team.id} team={team} />;
        })}
      </Grid.Section>
    </Grid>
  );
};

export default Standings;
