(function() {
    // Create the connector object
    let myConnector = tableau.makeConnector();
    let myProxy = "https://cors-anywhere.herokuapp.com/";
  
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
      // Schema for players
      var playercols = [
        {
          id: "id",
          alias: "player_id",
          dataType: tableau.dataTypeEnum.int,
          columnRole: tableau.columnRoleEnum.dimension
        },{
          id: "code",
          alias: "code",
          dataType: tableau.dataTypeEnum.int,
          columnRole: tableau.columnRoleEnum.dimension
         },{
          id: "full_name",
          alias: "Full Name",
          dataType: tableau.dataTypeEnum.string,
          columnRole: tableau.columnRoleEnum.dimension
        }
      ];
  
      // Current Season Information
      var currentcols = [
        {
          id: "element",
          alias: "element",
          dataType: tableau.dataTypeEnum.int,
          columnRole: tableau.columnRoleEnum.dimension
        },
        {
          id: "fixture",
          alias: "fixture",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "opponent_team",
          alias: "opponent_team",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "total_points",
          alias: "total_points",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "was_home",
          alias: "was_home",
          dataType: tableau.dataTypeEnum.bool
        },
        {
          id: "kickoff_time",
          alias: "kickoff_time",
          dataType: tableau.dataTypeEnum.datetime
        },
        {
          id: "team_h_score",
          alias: "team_h_score",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "team_a_score",
          alias: "team_a_score",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "round",
          alias: "round",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "minutes",
          alias: "minutes",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "goals_scored",
          alias: "goals_scored",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "assists",
          alias: "assists",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "clean_sheets",
          alias: "clean_sheets",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "goals_conceded",
          alias: "goals_conceded",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "own_goals",
          alias: "own_goals",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "penalties_saved",
          alias: "penalties_saved",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "penalties_missed",
          alias: "penalties_missed",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "yellow_cards",
          alias: "yellow_cards",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "red_cards",
          alias: "red_cards",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "saves",
          alias: "saves",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "bonus",
          alias: "bonus",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "bps",
          alias: "bps",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "influence",
          alias: "influence",
          dataType: tableau.dataTypeEnum.float
        },
        {
          id: "creativity",
          alias: "creativity",
          dataType: tableau.dataTypeEnum.float
        },
        {
          id: "threat",
          alias: "threat",
          dataType: tableau.dataTypeEnum.float
        },
        {
          id: "ict_index",
          alias: "ict_index",
          dataType: tableau.dataTypeEnum.float
        },
        {
          id: "value",
          alias: "value",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "transfers_balance",
          alias: "transfers_balance",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "selected",
          alias: "selected",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "transfers_in",
          alias: "transfers_in",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "transfers_out",
          alias: "transfers_out",
          dataType: tableau.dataTypeEnum.int
        }
      ];
  
      // Table Information
      var playerTableInfo = {
        id: "playerinfo",
        alias: "player information",
        columns: playercols
      };
      var currentTableInfo = {
        id: "historyinfo",
        alias: "current season information",
        columns: currentcols
      };
  
      schemaCallback([playerTableInfo, currentTableInfo]);
    };
  
    //helper function to get player history for current season
    function getHistory(table, doneCallback) {
      let promises = [];
      let noPlayers = parseInt(tableau.connectionData); 
    //   let noPlayers = 700; // Modified for testing since I kept getting hit with "too many requests" errors

      for (let i = 1; i <= noPlayers; i++) {
        let apiCall =
          myProxy +
          "https://fantasy.premierleague.com/api/element-summary/" +
          i +
          "/";
        promises.push(
          $.getJSON(apiCall).catch(() => {
            return { error: true };
          })
        );
      }
  
      $.when.apply($, promises).done(function() {
        let tableData = [];
        for (let r = 0, rlen = arguments.length; r < rlen; r++) {
          let resp = arguments[r][0];
          if (resp && resp.history.length > 0) {
            for (let i = 0, len = resp.history.length; i < len; i++) {
              tableData.push({
                element: resp.history[i].element,
                fixture: resp.history[i].fixture,
                opponent_team: resp.history[i].opponent_team,
                total_points: resp.history[i].total_points,
                was_home: resp.history[i].was_home,
                kickoff_time: resp.history[i].kickoff_time,
                team_h_score: resp.history[i].team_h_score,
                team_a_score: resp.history[i].team_a_score,
                round: resp.history[i].round,
                minutes: resp.history[i].minutes,
                goals_scored: resp.history[i].goals_scored,
                assists: resp.history[i].assists,
                clean_sheets: resp.history[i].clean_sheets,
                goals_conceded: resp.history[i].goals_conceded,
                own_goals: resp.history[i].own_goals,
                penalties_saved: resp.history[i].penalties_saved,
                penalties_missed: resp.history[i].penalties_missed,
                yellow_cards: resp.history[i].yellow_cards,
                red_cards: resp.history[i].red_cards,
                saves: resp.history[i].saves,
                bonus: resp.history[i].bonus,
                bps: resp.history[i].bps,
                influence: resp.history[i].influence,
                creativity: resp.history[i].creativity,
                threat: resp.history[i].threat,
                ict_index: resp.history[i].ict_index,
                value: resp.history[i].value,
                transfers_balance: resp.history[i].transfers_balance,
                selected: resp.history[i].selected,
                transfers_in: resp.history[i].transfers_in,
                transfers_out: resp.history[i].transfers_out,
                player_id: i+1
              });
            }
          }
        }
        table.appendRows(tableData);
        doneCallback();
      });
    }
  
    // Download the data
    myConnector.getData = function(table, doneCallback) {
      let tableData = [];
  
      // get player information data
      if (table.tableInfo.id === "playerinfo") {
        $.getJSON(
          myProxy + "https://fantasy.premierleague.com/api/bootstrap-static/",
          function(resp) {
            for (var i = 0, len = resp.elements.length; i < len; i++) {
              tableData.push({
                id: resp.elements[i].id,
                code: resp.elements[i].code,
                full_name:
                  resp.elements[i].first_name + " " + resp.elements[i].second_name
              });
            }
            table.appendRows(tableData);
            doneCallback();
          }
        );
      }
  
      //get current season information
      if (table.tableInfo.id == "historyinfo") {
        getHistory(table, doneCallback);
      }
    };
  
    tableau.registerConnector(myConnector);
    
    // Create event listeners for when the user submits the form
    $(document).ready(function() {
      $("#submitButton").click(function() {
        tableau.connectionName = "FPL 2019-20 Current Season Stats"; // This will be the data source name in Tableau
        $.getJSON(
          myProxy + "https://fantasy.premierleague.com/api/bootstrap-static/",
          function(resp) {
            //resp.toJSON();
            tableau.connectionData = resp.elements.length.toString();
            tableau.submit(); // This sends the connector object to Tableau
          }
        );
      });
    });
  })();