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
  
      // Past Season Information
      var pastcols = [
        {
          id: "season_name",
          alias: "season_name",
          dataType: tableau.dataTypeEnum.string
        },
        {
          id: "element_code",
          alias: "element_code",
          dataType: tableau.dataTypeEnum.int,
          columnRole: tableau.columnRoleEnum.dimension
        },
        {
          id: "start_cost",
          alias: "start_cost",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "end_cost",
          alias: "end_cost",
          dataType: tableau.dataTypeEnum.int
        },
        {
          id: "total_points",
          alias: "total_points",
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
        }
      ];
  
      // Table Information
      var playerTableInfo = {
        id: "playerinfo",
        alias: "player information",
        columns: playercols
      };
      var pastTableInfo = {
        id: "historypastinfo",
        alias: "past season information",
        columns: pastcols
      };
  
      schemaCallback([playerTableInfo, pastTableInfo]);
    };

  
    //helper function to get player history past
    function getHistoryPast(table, doneCallback) {
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
          if (resp && resp.history_past.length > 0) {
            for (let i = 0, len = resp.history_past.length; i < len; i++) {
              tableData.push({
                season_name: resp.history_past[i].season_name,
                element_code: resp.history_past[i].element_code,
                start_cost: resp.history_past[i].start_cost,
                end_cost: resp.history_past[i].end_cost,
                total_points: resp.history_past[i].total_points,
                minutes: resp.history_past[i].minutes,
                goals_scored: resp.history_past[i].goals_scored,
                assists: resp.history_past[i].assists,
                clean_sheets: resp.history_past[i].clean_sheets,
                goals_conceded: resp.history_past[i].goals_conceded,
                own_goals: resp.history_past[i].own_goals,
                penalties_saved: resp.history_past[i].penalties_saved,
                penalties_missed: resp.history_past[i].penalties_missed,
                yellow_cards: resp.history_past[i].yellow_cards,
                red_cards: resp.history_past[i].red_cards,
                saves: resp.history_past[i].saves,
                bonus: resp.history_past[i].bonus,
                bps: resp.history_past[i].bps,
                influence: resp.history_past[i].influence,
                creativity: resp.history_past[i].creativity,
                threat: resp.history_past[i].threat,
                ict_index: resp.history_past[i].ict_index,
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
  
      //get past season information
      if (table.tableInfo.id == "historypastinfo") {
        getHistoryPast(table, doneCallback);
      }
    };
  
    tableau.registerConnector(myConnector);
    
    // Create event listeners for when the user submits the form
    $(document).ready(function() {
      $("#submitButton").click(function() {
        tableau.connectionName = "FPL 2019-20 Past Season Stats"; // This will be the data source name in Tableau
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