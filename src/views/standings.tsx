import { Grid, List, Toast, showToast, useNavigation } from "@raycast/api";
import { Team } from "../types/standings.types";
import useStandings from "../hooks/useStandings";
import TeamComponent from "../components/Team";

const Standings = () => {
  const data = useStandings();

  const { push } = useNavigation();
  const { pop } = useNavigation();

  if (data.error) {
    showToast(Toast.Style.Failure, "Failed to get roster");
    data.loading = false;
  }

  const ListView = () => {
    return (
      <List
        isLoading={data.loading}
        searchBarAccessory={
          <List.Dropdown
            tooltip="View Type"
            storeValue={false}
            onChange={(view) => {
              if (view === "grid") {
                push(<GridView />);
              }
            }}
          >
            <List.Dropdown.Item key="list" title="List" value="list" />
            <List.Dropdown.Item key="grid" title="Grid" value="grid" />
          </List.Dropdown>
        }
      >
        <List.Section title="Eastern Conference">
          {data.standings.eastern.map((team: Team) => {
            return <TeamComponent key={team.id} team={team} viewType="list" />;
          })}
        </List.Section>
        <List.Section title="Western Conference">
          {data.standings.western.map((team: Team) => {
            return <TeamComponent key={team.id} team={team} viewType="list" />;
          })}
        </List.Section>
      </List>
    );
  };

  const GridView = () => {
    return (
      <Grid
        isLoading={data.loading}
        itemSize={Grid.ItemSize.Medium}
        inset={Grid.Inset.Medium}
        searchBarAccessory={
          <Grid.Dropdown
            tooltip="View Type"
            storeValue={false}
            defaultValue="grid"
            onChange={(view) => {
              if (view === "list") {
                push(<ListView />);
              }
            }}
          >
            <Grid.Dropdown.Item key="grid" title="Grid" value="grid" />
            <Grid.Dropdown.Item key="list" title="List" value="list" />
          </Grid.Dropdown>
        }
      >
        <Grid.Section title="Eastern Conference">
          {data.standings.eastern.map((team: Team) => {
            return <TeamComponent key={team.id} team={team} viewType="grid" />;
          })}
        </Grid.Section>
        <Grid.Section title="Western Conference">
          {data.standings.western.map((team: Team) => {
            return <TeamComponent key={team.id} team={team} viewType="grid" />;
          })}
        </Grid.Section>
      </Grid>
    );
  };

  return <GridView />;
};

export default Standings;
